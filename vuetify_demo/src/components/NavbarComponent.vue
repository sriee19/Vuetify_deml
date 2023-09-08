<template>
    <v-main>
      <!-- Wrap the entire navigation bar in a container -->
      <div
        class="navbar-container"
        @mouseover="increaseNavbarHeight"
        @mouseout="resetNavbarHeight"
      >
        <v-navigation-drawer
          v-model="localDrawer"
          permanent
          expand-on-hover
          mini-variant
          app
          color="blue lighten-3"
          class="navbar"
        >
          <v-img
    class="navbar-image"
    src="../assets/lorry1.png"
    :style="{ height: navbarHeight }" 
    ref="navbarImage"
  ></v-img>
  
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="([icon, text]) in links"
              :key="icon"
              link
              class="navbar-item"
            >
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
    <DashboardComponent/>

    </v-main>
    <!-- <topbar/> -->
  </template>
  

  <script>
  import DashboardComponent from "../components/DashboardComponent.vue";

    // import topbar from "../components/topBar.vue";
  export default {
    
    name: "NavbarComponent",
    components: {DashboardComponent,},
    props: ["drawer"],
    data() {
      return {
        localDrawer: this.drawer,
        // Define a data property to track navbar height
        navbarHeight: "70px", // Initial height
        links: [
          ["mdi-microsoft-windows", "Dashboard"],
          ["mdi-badge-account", "User Management"],
          ["mdi-clipboard-list-outline", "Vendor Management"],
          ["mdi-file-document-arrow-right-outline", "Product Management"],
          ["mdi-file-star-outline", " Area Management"],
          ["mdi-checkbox-multiple-marked-outline ", "CheckPoint List"],
          ["mdi-card-account-details-outline", " Inspection Report"],
          ["mdi-logout", "Sign-Out"],
        ],
      };
    },
    methods: {
    increaseNavbarHeight() {
      // Change the navbar height when hovering
      this.navbarHeight = "160px"; // Adjust the desired height
      this.$refs.navbarImage.$el.style.height = "auto"; // Set image height to auto
    },
    resetNavbarHeight() {
      // Reset the navbar height when the mouse leaves
      this.navbarHeight = "60px"; // Back to the original height
      this.$refs.navbarImage.$el.style.height = "60px"; // Set image height to its original height
    },
  },
  
  };
  </script>
  
  <style>
  /* Add styling for the navbar and image */
  .navbar-image {
    height: auto; /* Set a specific height for the image */
    transition: height 0.3s ease; /* Add a smooth transition effect */
  }
  
  .navbar-container:hover .navbar-image {
    height: auto; /* Set height to auto to expand to the full image height on hover */
  }
  
  /* Add any additional styling you need here */
  </style>