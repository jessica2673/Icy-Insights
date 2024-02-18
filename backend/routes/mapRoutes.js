const express = require('express');
const router = express.Router();
const { Client } = require("@googlemaps/google-maps-services-js");
const keys = require('../config/keys');
const multer = require('multer');
const upload = multer();
const polyline = require('@mapbox/polyline');
const turf = require('@turf/turf');

const client = new Client({});

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
    const decodedRoutes = routes.map(route => {
        const encodedPath = route.overview_polyline.points;
        const decodedPath = polyline.decode(encodedPath);
        return decodedPath;
    });

    const geoJsonRoutes = convertRoutesToGeoJSON(decodedRoutes);
    console.log(geoJsonRoutes);

    const coverage = calculateCoverage(geoJsonRoutes, plowedPaths);

    res.status(200).json(plowedPaths.length);
})

function calculateCoverage(geoJsonRoutes, filteredFeatures) {
    geoJsonRoutes.forEach(route => {
        let totalCoverage = 0;
        let totalPath = turf.length(route, {units: 'kilometers'});
    
        filteredFeatures.forEach(feature => {
            const intersection = turf.lineIntersect(route, feature);
            if (intersection.features.length > 0) {
            intersection.features.forEach(segment => {
                totalCoverage += turf.length(segment, {units: 'kilometers'});
            });
            }
        });
    
    console.log(`Total coverage: ${totalCoverage}, Total path length: ${totalPath}`);
    console.log(`Total coverage for route: ${totalCoverage / totalPath * 100} %`);
    });
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
