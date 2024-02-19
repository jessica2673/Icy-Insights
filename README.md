### Icy Insights

## Inspiration
We were inspired by our commute to ElleHacks. During the winter, the last thing you want to be is a car deep in fresh snow! We aim to provide drivers with live information on the safest route they should take to avoid accidents and arrive safely to their destination.

## What it does
Icy Insights takes a user's origin and destination for their commute and displays the safest route for their winter commute -- the route where the most snow has been plowed and avoiding the most high-risk intersections in Toronto. This helps drivers stay informed about their commute conditions during Winter.

## How we built it
We built Icy Insights using the MERN stack, along with the MUI Component Library for the frontend to create a dynamic and responsive user interface. For mapping functionality, we integrated the Google Maps API to display maps and routes. The core feature of our application, identifying the safest routes, was developed by leveraging live snow plow data to assess road conditions and plow coverage. We processed this data using algorithms designed to evaluate route safety based on data such as snow clearance levels and high-risk intersections to recommend the most suitable path for commuting during winter conditions.

## Challenges we ran into
Throughout the development of Icy Insights, we deepened our understanding of geospatial data processing and the complexities involved in working with real-time data. As a team, we enhanced our skills in using the Google Maps API, not only for basic mapping features but also for implementing route evaluation from external data resources.

## Accomplishments that we're proud of
We are particularly proud of creating an application that can address a real-world problem. The ability to integrate multiple APIs into our lengthy algorithm of commputations and present users with actionable insights is an achievement we're super proud of. Additionally, overcoming the technical challenges and learning to work effectively as a team under the pressure of a hackathon deadline has been incredibly rewarding.

## What we learned
We learned that calculating the distance between two points on the globe is difficult and requires a lot of math. Furthermore, we learned how to use of Google Maps APIs, through our various application use cases. We also were not very familiar with React component libraries on the frontend side, and one of us learned git throughout the 3 days

## What's next for Icy Insights
We currently only display the best route for the user, and we plan to display the live plow coverage of all possible routes in the future.
