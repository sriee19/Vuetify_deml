<template>
    <div>
      <router-link :to="{ name: 'pdf-preview' }">
        <button>Preview PDF</button>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "PdfPreviewButton",
  };
  </script>
  