# Blue

Blue is an informational experience meant to give users an introduction to the amazing world of oceanography.

Oceanography is a complex, interdisciplinary topic, dealing with geology, chemistry, biology, and physical sciences. There are so many factors that contribute to the state of our oceans, and an abudance of data.

Blue's goal is to give user's who are unfamiliar with the topic a 3D space to view this data.

Taking an Oceanography course in college has taught me so much more about the world I live on, and I hope to instill that awe in others.

# Table of Contents

- [Data Sources](#data-sources)

# Implementation

Blue uses [Vue.js](https://vuejs.org/) framework, along with [Three.js](https://threejs.org/), a javascript 3D library, to create a 3D interactive experience.

Music and sound effects were provided through a subscription to [Epidemic Sound](https://www.epidemicsound.com/music/featured/).

# Data Sources

- World Shores and Borders
  - [A Global Self-consistent, Hierarchical, High-resolution Geography Database](http://www.soest.hawaii.edu/pwessel/gshhg/index.html)
    - Maintained by Paul Wessel, SOEST, University of Hawai'i, Honolulu, HI. Walter H. F. Smith, NOAA Geosciences Lab, National Ocean Service, Silver Spring, MD.


- Three.js
  - [PolyhedronGeometry](https://threejs.org/docs/#api/en/geometries/PolyhedronGeometry)
  - [BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry.drawRange)
  - [PolarGridHelper](https://threejs.org/docs/#api/en/helpers/PolarGridHelper)
- netCDF
  - [What is netCDF data?](https://pro.arcgis.com/en/pro-app/latest/help/data/multidimensional/what-is-netcdf-data.htm)
  - [georaster](https://www.npmjs.com/package/georaster)

[Ice Surface Elevation](https://www.gebco.net/data_and_products/gridded_bathymetry_data/)
[Sub-Ice Topo/Bathy](https://www.gebco.net/data_and_products/gridded_bathymetry_data/)
[TID Grid](https://www.gebco.net/data_and_products/gridded_bathymetry_data/)
[Borders](http://www.soest.hawaii.edu/pwessel/gshhg/index.html)
[Cloud Optimized GeoTIFF](https://www.cogeo.org/)
[Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog)
[Sea Surface Temerature Contour Charts](https://www.ospo.noaa.gov/Products/ocean/sst/contour/index.html)
[Physical Oceanography Distributed Active Archive Center](https://podaac.jpl.nasa.gov/)
[Bathymetry & Global Relief Data](https://www.ngdc.noaa.gov/mgg/bathymetry/relief.html)
[GMRT](https://www.gmrt.org/services/index.php)