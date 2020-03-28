// import React from "react";
// import Highcharts from "highcharts/highcharts.src.js";
// import HighchartsReact from "highcharts-react-official";
// import highchartsMap from "highcharts/modules/map";
// import proj4 from "proj4";
// import mapDataIE from "@highcharts/map-collection/countries/pk/pk-all.geo.json";
// import darkUnica from "highcharts/themes/dark-unica";
// import HighchartsExporting from "highcharts/modules/exporting";

// if (typeof Highcharts === "object") {
//   HighchartsExporting(Highcharts);
// }

// darkUnica(Highcharts);
// highchartsMap(Highcharts);

// if (typeof window !== "undefined") {
//   window.proj4 = window.proj4 || proj4;
// }

// var theme = {
//   chart: {
//     backgroundColor: "#141d28"
//   }
// };

// Highcharts.setOptions(theme);

// function Map(props) {
//   const { areas } = props;
//   console.log({ areas });
//   const mapOptions = {
//     chart: {
//       map: "countries/pk/pk-all.geo.json"
//     },
//     title: {
//       text: "Map Demo"
//     },
//     credits: {
//       enabled: false
//     },
//     mapNavigation: {
//       enabled: true
//     },
//     tooltip: {
//       headerFormat: "",
//       pointFormat:
//         "<b>{point.freq}</b><br><b>{point.keyword}</b>                      <br>lat: {point.lat}, lon: {point.lon}"
//     },
//     series: [
//       {
//         // Use the gb-all map with no data as a basemap
//         name: "Basemap",
//         mapData: mapDataIE,
//         borderColor: "#A0A0A0",
//         nullColor: "rgba(200, 200, 200, 0.3)",
//         showInLegend: true
//       },
//       {
//         // Specify points using lat/lon
//         type: "mapbubble",
//         name: "Cities",
//         color: "#4169E1",
//         data: [
//           {
//             z: 25,
//             keyword: "Islamabad Capital Territory",
//             lat: 33.657,
//             lon: 73.077
//           }
//         ],
//         cursor: "pointer",
//         point: {
//           events: {
//             click: function() {
//               console.log(this.keyword);
//             }
//           }
//         }
//       }
//     ]
//   };

//   return (
//     <div>
//       <HighchartsReact
//         constructorType={"mapChart"}
//         highcharts={Highcharts}
//         options={mapOptions}
//       />
//     </div>
//   );
// }

// export default Map;
