<!-- dashboard -->

<!-- <template>
  <v-app id="inspire">
    <NavbarComponent :drawer="drawer" />
    <TopbarComponent @drawerEvent="drawer = !drawer" />
    
  </v-app>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import TopbarComponent from "./components/TopbarComponent.vue";


export default {
  name: "App",
  components: { NavbarComponent, TopbarComponent },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
  }),
  methods: {},
};
</script> -->

<!-- <template>
  <div>
    <pdf-viewer :pdf-url="pdfUrl" />
  </div>
</template>

<script>
import PdfViewer from "../src/components/PdfComponent.vue";
export default {
  components: {
    PdfViewer,
  },
  data() {
    return {
      pdfUrl: "",
    };
  },
};
</script> -->




<!-- pdfpreview -->

<!-- <template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script> -->



<!-- register page -->

<template>
  <div id="Login" class="register-page">
    <register />
    <!-- <dashboard /> -->
  </div>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div> -->
</template>

<script>
import register from "../components/register.vue"
// @ is an alias to /src
// export default {
//   components: {
//   },
// };

export default {
  name: "App",
  components: {register,},
};
</script>
<style>
#Login {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  position: relative;
}
.register-page {
  position: relative;
  background-image: url(../assets/lorrybg2.png); /* Replace with the actual path to your image */
  background-size: contain; /* Adjust the background sizing as needed */
  background-position: center; /* Adjust the background position as needed */
  background-color: rgba(255, 255, 255, 1);
}

/*.register-page::before{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/path/to/your/image.jpg'); /* Replace with the actual path to your image */
/*filter: blur(10px); /* Apply blur effect */
</style>