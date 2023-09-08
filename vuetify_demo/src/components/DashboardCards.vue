<template>
    <div class="dashboard" pos>
      <br />
      <v-row>
        <v-col>
          <v-row class="cards">
            <v-col v-for="(item, index) in activityLog" :key="index">
              <v-card elevation="2" class="rounded-lg card-text">
                <v-card-text class="card-text">
                  <div>
                    <strong>{{ item.title }}</strong> <br />
                    <span class="text-caption">As of {{ date }}</span>
                  </div>
                  <v-chip
                    size="40"
                    :color="item.color"
                    style="border: 3px solid #444"
                  >
                    <span style="color: white">{{ item.amount }}</span>
                  </v-chip>
                </v-card-text>
                <!-- <v-card-actions class="d-flex justify-space-between">
    
    
                              </v-card-actions> -->
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <!-- <v-col cols="12" lg="3" class="mr-2">
                  <v-card  max-width="374">
                      <v-card-title>Gate Activities</v-card-title>
                      <v-card-subtitle>Vehicle In Particuler Gate</v-card-subtitle>
                      <v-card-text class="">
                          <v-timeline align-top dense>
                              <v-timeline-item color="indigo" small>
                                  <strong>Gate - 1</strong>
                                  <div class="text-caption">
                                     Number Of Vehicle : {{ gateCounts.Gate1 }}
                                  </div>
                              </v-timeline-item>
                              <v-timeline-item color="green" small class="text-left">
                                  <strong>Gate  -2 </strong>
                                  <div class="text-caption ">
                                      Number Of Vehicle : {{ gateCounts.Gate2 }}
                                  </div>
                              </v-timeline-item>
    
                              <v-timeline-item color="indigo" small>
                                  <strong>Gate - 3</strong>
                                  <div class="text-caption">
                                      Number Of Vehicle : {{ gateCounts.Gate3 }}
                                  </div>
                              </v-timeline-item>
                          </v-timeline>
                      </v-card-text>
                  </v-card>
              </v-col>  -->
      </v-row>
    </div>
  </template>
  
  <script>
  import { masterdata } from "../service";
  import moment from "moment";
  
  export default {
    name: "DashboardCards",
    data() {
      return {
        activityLog: [
          {
            title: "Total Vehicle",
            amount: "",
            icon: "mdi-account",
            color: "cyan lighten-3",
          },
          {
            title: "Total Vendors",
            amount: "",
            icon: "mdi-account-group-outline",
            color: "green darken-2",
          },
          {
            title: "Total Users",
            amount: "",
            icon: "mdi-account-group-outline",
            color: "blue lighten-3",
          },
          {
            title: "Vehicle Delivered",
            amount: "",
            icon: "mdi-account-group-outline",
            color: "blue-grey darken-1",
          },
        ],
        date: moment().format("ll"),
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
  
        const documentCount =
          await masterdata.getcountInspectionReportDocuments();
        console.log("Number of documents in inspection report:", documentCount);
  
        const documentCountDelivered =
          await masterdata.getcountInspectionReportDocuments();
        console.log(
          "Number of documents in documentCountDelivered report:",
          documentCountDelivered
        );
  
        const documentCountVendor = await masterdata.getcountvendortDocuments();
        console.log(
          "Number of documents in inspection report:",
          documentCountVendor
        );
  
        const documentCountUser = await masterdata.getcountusertDocuments();
        console.log(
          "Number of documents in inspection report:",
          documentCountUser
        );
  
        //   total vehicle
        const totalDocumentsItem = this.activityLog.find(
          (item) => item.title === "Total Vehicle"
        );
        if (totalDocumentsItem) {
          totalDocumentsItem.amount = documentCount;
        }
        console.log("Number of documents in inspection report:", documentCount);
  
        //   total vendor
        const totalVendorItem = this.activityLog.find(
          (item) => item.title === "Total Vendors"
        );
        if (totalVendorItem) {
          totalVendorItem.amount = documentCountVendor;
        }
        console.log(
          "Number of documents in inspection report:",
          documentCountVendor
        );
  
        //   total CountDelivered
        const totalVehicleDeliveredItem = this.activityLog.find(
          (item) => item.title === "Vehicle Delivered"
        );
        if (totalVehicleDeliveredItem) {
          totalVehicleDeliveredItem.amount = documentCountDelivered;
        }
        console.log(
          "Number of documents in inspection report:",
          documentCountDelivered
        );
  
        //   total CountUser
        const totalCountUserItem = this.activityLog.find(
          (item) => item.title === "Total Users"
        );
        if (totalCountUserItem) {
          totalCountUserItem.amount = documentCountUser;
        }
        console.log(
          "Number of documents in inspection report:",
          documentCountUser
        );
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
  .card-text {
    display: flex;
    justify-content: space-between;
  }
  
  @media (max-width: 454px) {
  }
  </style>
  