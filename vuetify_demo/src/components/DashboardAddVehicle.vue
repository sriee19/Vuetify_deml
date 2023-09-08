<template>
    <!-- <main> -->
  
    <v-card class="addshipment">
      <div class="text">
        <h3>Add a new Vehicle</h3>
        <p>Fill out the quick form for Quality Check</p>
      </div>
      <router-link to="/inspectionreport">
        <img src="../assets/plusBtn1.svg" alt="" />
      </router-link>
    </v-card>
  
    <!-- </main> -->
  </template>
  
  <script>
  export default {
    name: "DashboardAddVehicle",
  };
  </script>
  
  <style lang="scss" scoped>
  a {
    text-decoration: none;
  }
  .addshipment {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 280px;
    width: 100%;
    margin: 40px 20px;
    width: 280px;
    border-radius: 20px;
    background: url("../assets/addship.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-color: #ffffff !important;
  }
  
  .text {
    display: flex;
    flex-direction: column;
    margin-top: 48%;
    width: 65%;
  }
  @media (max-width: 768px) {
    .addshipment {
      background-position: cover;
      background-size: 90% 90%;
      width: 230px;
      height: 230px;
      margin: 0;
    }
  }
  </style>
  