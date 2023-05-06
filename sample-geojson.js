var airQuality = [
//     {
//         "type": "Feature",
//         "properties": {
//             "popupContent": "PM2.5",
//             "location": "Denver",
//             "pollutant": "PM2.5",
//             "value": 90,
//             "unit": "µg/m³",
//             "text": "90",
//             "radius": 20
//         },
//         "geometry": {
//             "type": "Point",
//             "coordinates": [106.3798, 20.1902]
//         }
//     },
//     {
//         "type": "Feature",
//         "geometry": {
//             "type": "Point",
//             "coordinates": [107.0834, 20.9333]
//         },
//         "properties": {
//             "popupContent": "PM2.5",
//             "location": "Denver",
//             "pollutant": "PM2.5",
//             "value": 40,
//             "unit": "µg/m³",
//             "text": "40",
//             "radius": 20,
//         }
//     },
//     {
//       "type": "Feature",
//       "geometry": {
//           "type": "Point",
//           "coordinates": [106.1834, 20.9333]
//       },
//       "properties": {
//           "popupContent": "PM2.5",
//           "location": "Denver",
//           "pollutant": "PM2.5",
//           "value": 60,
//           "unit": "µg/m³",
//           "text": "60",
//           "radius": 20,
//       }
//   }
];

const labels = ['January', 'February', 'March', 'April', 'May', 'June']

const data12 = {
  labels: labels,
  datasets: [
    {
      label: 'Chỉ số AQI',
      backgroundColor: 'blue',
      borderColor: 'blue',
      data: [10, 27, 56, 34, 24, 53],
      tension: 0.4,
    },
  ],
}

const data2 = {
  labels: labels,
  datasets: [
    {
      label: 'Nhiệt độ',
      backgroundColor: 'red',
      borderColor: 'red',
      data: [0, 34, 32, 23, 2, 82],
      tension: 0.4,
    },
  ],
}

const data3 = {
  labels: labels,
  datasets: [
    {
      label: 'Độ ẩm',
      backgroundColor: 'rgb(75,192,192)',
      borderColor: 'rgb(75,192,192)',
      data: [0, 2, 6, 3, 2, 0],
      tension: 0.4,
    },
  ],
}
const config1 = {
  type: 'line',
  data: data12,
}

const config2 = {
  type: 'line',
  data: data2,
}
const config3 = {
  type: 'line',
  data: data3,
}

const canvas1 = document.getElementById('AQIChart')
const chart1 = new Chart(canvas1, config1)

const canvas2 = document.getElementById('TempChart')
const chart2 = new Chart(canvas2, config2)

const canvas3 = document.getElementById('HumChart')
const chart3 = new Chart(canvas3, config3)