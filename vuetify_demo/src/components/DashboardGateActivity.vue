<template>
    <div class="dashboard" >
      <br />
  
      <v-col class="ml-2">
        <v-card max-width="374">
          <v-card-title>Gate Activities</v-card-title>
          <v-card-subtitle>No of Vehicle In Particuler Gate</v-card-subtitle>
          <v-card-text class="">
            <v-timeline align-top dense>
              <v-timeline-item color="indigo" small>
                <strong>Gate - 1</strong>
                <div class="text-caption">
                  Number Of Vehicle : {{ gateCounts.Gate1 }}
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small class="text-left">
                <strong>Gate -2 </strong>
                <div class="text-caption">
                  Number Of Vehicle : {{ gateCounts.Gate2 }}
                </div>
              </v-timeline-item>
  
              <v-timeline-item color="cyan lighten-3" small>
                <strong>Gate - 3</strong>
                <div class="text-caption">
                  Number Of Vehicle : {{ gateCounts.Gate3 }}
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
       
      </v-col>
      <charts/>
    </div>
  </template>
  
  <script>
  import { masterdata } from "../service";
  import charts from "../components/charts.vue"
  export default {
    name: "Dashboard",
    components:{
      charts,
    },
    data() {
      return {
        gateCounts: { Gate1: 0, Gate2: 0, Gate3: 0 },
        documentCount: 0, // Initialize documentCount
        documentCountVendor: 0,
        documentCountDelivered: 0,
      };
    },
  
    async created() {
      // Call the function to get gate location counts and update the data property
      try {
        const counts = await masterdata.getCountGateLocation();
        this.gateCounts = counts;
        console.log(counts);
      } catch (error) {
        console.error("Error getting gate counts:", error);
      }
    },
    methods: {
      onButtonClick(item) {
        console.log("click on " + item.no);
      },
    },
  };
  </script>
  
  <style scoped>
  .overlap-icon {
    position: absolute;
    top: -33px;
    text-align: center;
    padding-top: 12px;
  }
  .dashboard{
    /* display: flex; */
  }
  .card-text {
    display: flex;
    justify-content: space-between;
  }
  
  @media (max-width: 700px) {
    .v-card {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
  }
  </style>
  