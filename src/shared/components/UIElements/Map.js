// import React, { useRef, useEffect } from 'react';
// import 'ol/ol.css';
// import * as ol from 'ol';

 
// import './Map.css';
 
// const Map = props => {
//   const mapRef = useRef();
  
//   const { center, zoom } = props;
 
//   useEffect(() => {
//     new ol.Map({
//       target: mapRef.current.id,
//       layers: [
//         new ol.layer.Tile({
//           source: new ol.source.OSM()
//         })
//       ],
//       view: new ol.View({
//         center: ol.proj.fromLonLat([center.lng, center.lat]),
//         zoom: zoom
//       })
//     });
//   }, [center, zoom]);
 
//   return (
//     <div
//       ref={mapRef}
//       className={`map ${props.className}`}
//       style={props.style}
//       id="map"
//     ></div>
//   );
// };
 
// export default Map;