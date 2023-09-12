<template>
    <div>
      <pdf
        :src="pdfUrl"
        :page="currentPage"
        :rotation="pdfRotation"
        @num-pages="updateNumPages"
      ></pdf>
      <div>
        <button @click="prevPage">Previous Page</button>
        <button @click="nextPage">Next Page</button>
        <span>Page {{ currentPage }} of {{ numPages }}</span>
      </div>
    </div>
  </template>
  <script>
import { pdf } from "vue-pdf";

export default {
  components: {
    pdf,
  },
  data() {
    return {
      pdfUrl: "",        // Initialize with the URL to your PDF in Firebase Storage
      numPages: 0,       // Initialize the number of pages in the PDF
      currentPage: 1,    // Initialize the current page
      pdfRotation: 0,    // Initialize the PDF rotation
    };
  },
  methods: {
    updateNumPages(numPages) {
      this.numPages = numPages;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.numPages) {
        this.currentPage += 1;
      }
    },
  },
  mounted() {
    // Fetch the PDF URL from Firebase Firestore
    // You should replace this with your Firebase Firestore code to fetch the PDF URL
    // Example:
    // db.collection("pdfs")
    //   .doc("your_document_id")
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       this.pdfUrl = doc.data().pdfUrl;
    //     } else {
    //       console.error("PDF document not found.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching PDF document:", error);
    //   });
  },
};
</script>
