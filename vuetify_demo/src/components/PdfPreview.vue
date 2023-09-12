<template>
    <div class="pdf-preview">
      <img class="logo" src="../assets/lorry1.png" alt="Logo" />
      <pdf
        :src="pdfUrl" 
      ></pdf>
    </div>
  </template>
  
  <script>
  import { pdf } from "vue-pdf";
  
  export default {
    name: "PdfPreview",
    components: {
      pdf,
    },
    data() {
      return {
        pdfUrl: "https://mywebsite.com/pdfs/my-document.pdf"

      };
    },
  };
  </script>
  
  <style scoped>
  .pdf-preview {
    position: relative;
  }
  
  .logo {
    position: absolute;
    top: 20px; /* Adjust the top position as needed */
    right: 20px; /* Adjust the right position as needed */
    width: 100px; /* Set the width of your logo */
    height: auto; /* Maintain aspect ratio */
    z-index: 999; /* Ensure the logo appears on top of the PDF */
  }
  </style>
  