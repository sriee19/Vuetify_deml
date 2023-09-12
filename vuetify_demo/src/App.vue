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

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
