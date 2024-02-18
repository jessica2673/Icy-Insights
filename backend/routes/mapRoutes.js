const express = require('express');
const router = express.Router();
const { Client } = require("@googlemaps/google-maps-services-js");
const keys = require('../config/keys');
const multer = require('multer');
const upload = multer();
const polyline = require('@mapbox/polyline');
const turf = require('@turf/turf');
const Intersection = require('../models/intersectionModel');
const { route } = require('./snowRoutes');

const client = new Client({});

// Just to get the intersection coordinates from MongoDB
async function getIntersections() {
    const foundIntersections = await Intersection.find();

    if (!foundIntersections) {
        console.log('No intersections found. Check your code.');
    }

    let intersectionCoords = [];
    foundIntersections.forEach((intersection) => {
        intersectionCoords.push(intersection.coords);
    })
    // console.log(intersectionCoords);
    return intersectionCoords;
}

async function getGoogleRoutes(start, end) {
    try {
        const response = await client.directions({
            params: {
                origin: start,
                destination: end,
                alternatives: true,
                key: keys.maps.mapsAPI
            },
            timeout: 10000
        })
        return response.data.routes;
    } catch (e) {
        console.log('Error: ' + e);
    }
}

async function getPlowedData(points) {
    const api = `${keys.snowPlotData.url}`;
    let geoJsonResponse = await fetch(api);
    if (!geoJsonResponse.ok) {
        console.log(geoJsonResponse.error);
        return;
    }
    geoJsonResponse = await geoJsonResponse.json();

    const isWithinBounds = (coordinate) => {
        return (
            coordinate[0] >= points.lngMin && coordinate[0] <= points.lngMax &&
            coordinate[1] >= points.latMin && coordinate[1] <= points.latMax
        );
    };

    const filteredFeatures = geoJsonResponse.features.filter(feature => {
        // always linestring for To data
        if (feature.geometry.type === "LineString") {
            return feature.geometry.coordinates.some(coords => {
                if (feature.geometry.type === "Polygon") {
                    return coords.some(ring => ring.some(isWithinBounds));
                }
                return isWithinBounds(coords);
            });
        }
        return false;
    });
    
    return filteredFeatures;
}

router.get('/temp', async (req, res) => {
    const {start, end} = req.query;
    const bbPoints = await boundingBox(start, end);
    const plowedPaths = await getPlowedData(bbPoints);
    const routes = await getGoogleRoutes(start, end);
    
    // Assuming each route includes total distance in meters provided by Google Maps API
    const decodedRoutes = routes.map(route => {
        const encodedPath = route.overview_polyline.points;
        const decodedPath = polyline.decode(encodedPath);
        // Convert distance from meters to kilometers
        const totalDistanceKm = route.legs.reduce((total, leg) => total + leg.distance.value / 1000, 0);
        return {
            path: decodedPath,
            totalDistanceKm
        };
    });

    const geoJsonRoutes = convertRoutesToGeoJSON(decodedRoutes.map(r => r.path));
    let highestCoverage = {
        percentage: 0.0,
        routeIndex: 0
    }
    let coverage = 0.0;
    const riskList = [];
    const intersectionCoords = await getIntersections();

    decodedRoutes.forEach(async (decodedRoute, index) => {
        coverage = calculateCoverage(decodedRoute, plowedPaths, decodedRoute.totalDistanceKm, threshold);
        const risk = calculateRisk(intersectionCoords, decodedRoute.path);
        riskList.push(risk);

        // console.log(highestCoverage.percentage);
        if (coverage > highestCoverage.percentage) {
            highestCoverage = { 
                percentage: coverage, 
                routeIndex: index
            };
        }
    });

    console.log(riskList);

    const bestRoute = {
        coverage: highestCoverage.percentage,
        route: decodedRoutes[highestCoverage.routeIndex]
    }

    let resultRoutes = [];
    await resultRoutes.push(bestRoute); // Best route is pushed first.
    for (let i = 0; i < decodedRoutes.length; ++i) { // Other routes are stored after
        if (i !== await highestCoverage.routeIndex) {
            await resultRoutes.push(decodedRoutes[i]);
        }
    }

    // console.log(resultRoutes);
    res.status(200).json(resultRoutes);
});

// distance between points on globe
function haversine(lng1, lat1, lng2, lat2) {
    const R = 6371; // earth radius
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lng2 - lng1) * Math.PI / 180; 
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
}

function calculateRisk(intersectionCoords, route) {
    let riskFound = false;
    intersectionCoords.forEach(intersection => {
        route.forEach(point => {
            const distance = haversine(intersection[0], intersection[1], point[0], point[1]);
            if (distance <= 5) {
                riskFound = true;
            }
        });
    });
    console.log(`Is there risk?: ${riskFound}`);
    return riskFound;
}

function minDistanceToPlowPath(point, plowedPaths) {
    let min = Infinity;
    plowedPaths.forEach(path => {
        const allCoords = path.geometry.coordinates;
        allCoords.forEach((coord) => {
            const distance = haversine(coord[0], coord[1], point[1], point[0]);
            min = Math.min(min, distance);
        })
    });
    return min;
}

const threshold = 5;

function calculateCoverage(route, plowedPaths, totalPathKm, threshold) {
    let coveredPoints = 0;
    let totalPoints = 0;

    route.path.forEach(point => {
        totalPoints++;
        const distance = minDistanceToPlowPath(point, plowedPaths);
        if (distance <= threshold) {
            coveredPoints++; 
        }
    });

    const coveragePercentage = (coveredPoints / totalPoints) * 100;
    console.log(`Coverage percentage: ${coveragePercentage.toFixed(2)}%`);
    return coveragePercentage.toFixed(2);
}

function convertRoutesToGeoJSON(decodedRoutes) {
  return decodedRoutes.map(route => {
    const coordinates = route.map(point => [point.lng, point.lat]);
    return turf.lineString(coordinates);
  });
}

// box for filtering
async function boundingBox(start, end) {
    maxLat = Math.max(start.lat, end.lat);
    minLat = Math.min(start.lat, end.lat);
    maxLng = Math.max(start.lng, end.lng);
    minLng = Math.min(start.lng, end.lng);

    // latitude + longitude conversion to 1km leeway
    const expandLat = 0.009;
    maxLat += expandLat;
    minLat -= expandLat;

    // latitude based on location
    const avgLat = (maxLat + minLat) / 2;
    const expandLng = 1 / (111.32 * Math.cos(avgLat * (Math.PI / 180))); 
    maxLng += expandLng; 
    minLng -= expandLng; 

    const points = {
        'latMin' : minLat, 
        'latMax' : maxLat, 
        'lngMin' : minLng, 
        'lngMax' : maxLng
    };

    return points;
}

module.exports = router;
