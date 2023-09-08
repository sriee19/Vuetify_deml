<template>
    <div>
      <v-card max-width="500" class="charts ma-12">
        <canvas id="myChart"></canvas>
      </v-card>
    </div>
  </template>
  
  <script>
  import { Chart } from "chart.js";
  
  export default {
    name: "ChartComponent",
    mounted() {
      // Get the canvas element and create a chart
      const ctx = document.getElementById("myChart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar", // Change the chart type as needed (bar, line, pie, etc.)
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "My First Dataset",
              data: [12, 19, 3, 5, 2, 3], // Replace with your data
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      console.log(myChart);
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  