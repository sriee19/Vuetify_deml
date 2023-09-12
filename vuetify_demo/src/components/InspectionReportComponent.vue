<template>
    <v-main>
      <navbar />
      <v-data-table
        :headers="headers"
        :items="inspectionitem"
        sort-by="sno"
        class="elevation-5 ma-2"
      >
        <template v-slot:item.gateLocation="{ item }">
          <v-chip
            :color="getColor(item.gateLocation)"
            dark
            @click="handleButtonClick(item.gateLocation)"
            small
          >
            {{ item.gateLocation }}
          </v-chip>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="text-subtitle-2"
              >Inspection Report</v-toolbar-title
            >
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2 blue lighten-1 white--text" v-bind="attrs" v-on="on">
                  Add Vehicle
                </v-btn>
              </template>
              <v-card ref="form">
                <v-card-title>Add Vehicle</v-card-title>
                <v-card-text>
                  <v-text-field
                    label="Doc No*"
                    filled
                    dense
                    v-model="editedItem.docNo"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Issue No "
                    filled
                    dense
                    v-model="editedItem.issueNo"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Rev No *"
                    filled
                    dense
                    v-model="editedItem.revNo"
                    required
                  ></v-text-field>
                  <v-autocomplete
                    v-model="editedItem.vendorCode"
                    :items="combinedVendor"
                    dense
                    filled
                    label="Vendor Code / Name *"
                    required
                  ></v-autocomplete>
  
                  <!-- <v-autocomplete
                    v-model="editedItem.vendorName"
                    :items="vendornameitem"
                    dense
                    filled
                    label="Vendor Name *"
                    required
                  ></v-autocomplete> -->
                  <!-- <v-autocomplete
                    v-model="editedItem.bodyPartNo"
                    :items="bodypartnumberitem"
                    dense
                    filled
                    label="Body Part No *"
                    required
                  ></v-autocomplete> -->
                  <v-autocomplete
                  v-model="editedItem.bodyPartNo"
                  :items="combinedPartNumberAndModel"
                  dense
                  filled
                  label="Body Part No / Model *"
                  required
                ></v-autocomplete>
  
                  <v-text-field
                    label="Serial No *"
                    filled
                    dense
                    v-model="editedItem.serialNo"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Mfg Date *"
                    filled
                    dense
                    v-model="editedItem.mfgDate"
                    required
                    type="date"
                  ></v-text-field>
                  <!-- <v-autocomplete
                v-model="gatestatus"
                :items="qgateitem"
                dense
                filled
                label="Quality Gate Number *"
                required
            ></v-autocomplete> -->
  
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" depressed @click="close"> Cancel </v-btn>
                    <v-btn depressed class="blue lighten-1 white--text" @click="addVehicle">
                      {{ formButton }}
                    </v-btn>
                  </v-card-actions>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue lighten-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue lighten-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:item.reportPdf="{ item }">
          <v-btn small @click="viewReport(item)">
            <v-icon class="mr-1" right dark> mdi-cloud-upload </v-icon> PDF</v-btn
          >
        </template>
      </v-data-table>
    </v-main>
  </template>
  <script>
  import navbar from "../components/navAll.vue";
  import { masterdata } from "../service";
  import moment from "moment";
  import { db } from "../firebase";
  import firebase from "firebase/app"; // Import Firebase
  import "firebase/firestore"; // Import Firestore
  
  const firestoreTimestamp = firebase.firestore.FieldValue.serverTimestamp();
  console.log(firestoreTimestamp);
  const report_id1 = Array.from({ length: 20 }, () =>
    Math.random().toString(36).charAt(2)
  ).join("");
  console.log(report_id1);
  
  export default {
    components: {
      navbar,
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      userData: {},
      checkpointactivestatus1: ["Yes", "No"],
      checkpointtitle: ["Yes", "No"],
      vendornameitem: [],
      vendorcodeitem:[],
      bodypartnumberitem: [],
      headers: [
        { text: "SNO", align: "start", sortable: false, value: "sno" },
        // { text: "Vendor Code", value: "vendorCode" },
        { text: "Vendor Name", value: "vendorName" },
        { text: "Body Part No", value: "bodyPartNo" },
        { text: "Model", value: "model" },
        { text: "Serial No ", value: "serialNo" },
        { text: "Mfg Date ", value: "mfgDate" },
        { text: "Location ", value: "gateLocation" },
        { text: "Report ", value: "reportPdf" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      inspectionitem: [],
      areaitem: [],
      modelitem: [],
      editedIndex: -1,
      editedItem: {
        vendorName: "",
        bodyPartNo: "",
        model: "",
        serialNo: "",
        mfgDate: "",
      },
      defaultItem: {
        vendorName: "",
        bodyPartNo: "",
        model: "",
        serialNo: "",
        mfgDate: "",
      },
    }),
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? "Add Vehicle" : "Edit Vehicle";
      },
      formButton() {
        return this.editedIndex === -1 ? "Add Vehicle" : "Update Vehicle";
      },
      combinedPartNumberAndModel() {
      return this.bodypartnumberitem.map((partNumber, index) => ({
        text: `${partNumber} / ${this.modelitem[index]}`,
        value: partNumber, // You can set the value to whatever you need
      }));
    },
       combinedVendor() {
      return this.vendorcodeitem.map((item, index) => ({
        text: `${item} / ${this.vendornameitem[index]}`,
        value: item, // You can set the value to whatever you need
      }));
    
    },
    
  
    },
  
    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
    },
    created() {
      this.initialize();
      const user = firebase.auth().currentUser;
  
      // Fetch user data using user's UID from Firestore
      db.collection("user_master")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // doc.data() contains the user data
            this.userData = doc.data();
          } else {
            console.log("User document not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
  
    methods: {
      async initialize() {
        this.inspectionitem = await masterdata.getInspectionReport();
        console.log(this.inspectionitem);
        // this.vendornameitem = await masterdata.fetchVendor();
        // console.log(this.vendornameitem);
        
        const { fetchVendor, fetchVendorCode } = await masterdata.fetchVendor();
          this.vendornameitem = fetchVendor;
          this.vendorcodeitem = fetchVendorCode;
  
        const { bodypartnumberitem, modelitem } = await masterdata.fetchProduct();
        this.bodypartnumberitem = bodypartnumberitem;
        this.modelitem = modelitem;
      },
      getDate(timeStamp) {
        const testTime = new Date(timeStamp.toDate());
        return moment(testTime).format("MMMM Do YYYY, h:mm:ss a");
      },  
      editItem(item) {
        console.log("Selected Item:", item);
        this.editedIndex = this.inspectionitem.indexOf(item);
        console.log("Edited Index:", this.editedIndex);
        this.editedItem = Object.assign({}, item);
        console.log("Edited Item:", this.editedItem);
        this.dialog = true;
      },
      deleteItem(item) {
        this.editedIndex = this.inspectionitem.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },
      deleteItemConfirm() {
    const itemToDelete = this.inspectionitem[this.editedIndex];
    db.collection("inspection_report")
      .doc(itemToDelete.reportID)
      .update({
        // activeStatus: "No",
        deletedTime: firestoreTimestamp,
      })
      .then(() => {
        console.log("Document's activeStatus updated in Firestore!");
        // Optionally, you can remove the item from the local array if needed
        // this.inspectionitem.splice(this.editedIndex, 1);
        this.closeDelete();
      })
      .catch((error) => {
        console.error("Error updating activeStatus in Firestore:", error);
      });
  },
  
  
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
  
      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      getColor(gateLocation) {
        if (gateLocation == "Gate-1") return "green";
        else if (gateLocation == "Gate-2") return "orange";
        else if (gateLocation == "Gate-3") return "blue";
        else return "";
      },
  
      handleButtonClick(gateLocation) {
        if (gateLocation === "Gate-1") {
          // this.$router.push('/checklistreport');
        } else if (gateLocation === "Gate-2") {
          // this.$router.push('/checklistreport');
        } else if (gateLocation === "Gate-3") {
          // this.$router.push('/checklistreport');
        }
      },
      //    Report Pdf
      //   viewReport(item) {
      //   console.log('View Report clicked for item:', item);
      //   // Implement logic to open and display the report
      // },
  
      async viewReport(item) {
        console.log("View Report clicked for item:", item);
  
        const { PDFDocument, rgb } = require("pdf-lib");
  
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 700]);
        const { height } = page.getSize();
        console.log(height);
  
        // Define a text font and size
        const fontSize = 15;
  
        // Draw the header text "RV INDUSTRIES"
        page.drawText("RV INDUSTRIES", {
          x: 50,
          y: height - 50,
          size: fontSize + 10, // Larger font size for the header
          color: rgb(0, 0, 0), // Black color
        });
  
        // Draw sub-header lines
        const subHeader =
          `Sona College Of Technology\n` + `Salem Junction Road\n` + `Salem`;
  
        page.drawText(subHeader, {
          x: 50,
          y: height - 75, // Adjust the y position as needed
          size: fontSize,
          color: rgb(0, 0, 0), // Black color
        });
  
        // Add data from the 'item' to the PDF in a table format
        const dataTable = [
          ["vendorName", "gateLocation", "mfgDate"],
          [item.vendorName, item.gateLocation, item.mfgDate], // Replace with actual user data
          // Add more data rows as needed
        ];
  
        // Set the table's position and row heights
        const x = 50;
        const y = height - 200; // Adjust the y position as needed
        const rowHeight = 20;
  
        // Draw the table
        for (let i = 0; i < dataTable.length; i++) {
          for (let j = 0; j < dataTable[i].length; j++) {
            const cellText = dataTable[i][j];
            page.drawText(cellText, {
              x: x + j * 150, // Adjust the cell positions and widths as needed
              y: y - i * rowHeight,
              size: fontSize,
              color: rgb(0, 0, 0), // Black color
            });
          }
        }
  
        // Draw a line below the table
        page.drawLine({
          start: { x: x, y: y - dataTable.length * rowHeight - 10 },
          end: { x: x + 450, y: y - dataTable.length * rowHeight - 10 },
          thickness: 1, // Adjust line thickness as needed
          color: rgb(0, 0, 0), // Black color
        });
  
        // Add "Inspection Signature" at the bottom of the page
        page.drawText("Inspector Signature", {
          x: 50,
          y: 50, // Adjust the y position as needed
          size: fontSize,
          color: rgb(0, 0, 0), // Black color
        });
  
        // Serialize the PDF document to bytes
        const pdfBytes = await pdfDoc.save();
  
        // Create a Blob from the PDF data
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  
        // Create a data URL from the Blob
        const pdfData = URL.createObjectURL(pdfBlob);
  
        // Now you can use pdfData to display or download the generated PDF
  
        // For example, you can open the PDF in a new tab:
        window.open(pdfData, "_blank");
      },
  
  //     async addVehicle() {
  //   if (!this.isFormValid()) {
  //     // Display a generic validation message
  //     alert("Please fill in all fields.");
  //     return;
  //   }
  
  //   // Check if the form is in "Add" mode (editedIndex is -1)
  //   if (this.editedIndex == -1) {
  //     // Create a new inspection report object
  
  //     // Reference to the Firestore collection
  //     const collectionRef = db.collection("checkpoint_master");
  
  //     // Create a new document with an automatically generated ID
  //     const docRef = collectionRef.doc();
  
  //     // Get the generated document ID
  //     const report_id = docRef.id;
  //     console.log(report_id);
  //     console.log("inspection report adding");
  
  //     // Get the logged-in username
  //     const createdBy = this.userData.userName;
  
  //     const report = {
  //       reportID: report_id,
  //       docNo: this.editedItem.docNo,
  //       issueNo: this.editedItem.issueNo,
  //       revNo: this.editedItem.revNo,
  //       vendorCode:this.editedItem.vendorCode,
  //       vendorName: this.editedItem.vendorName,
  //       bodyPartNo: this.editedItem.bodyPartNo,
  //       model: this.editedItem.model,
  //       serialNo: parseInt(this.editedItem.serialNo),
  //       mfgDate: this.editedItem.mfgDate,
  //       gateLocation: "Gate-1",
  //       date: moment().format("DD/MM/YYYY"),
  //       time: moment().format("LTS"),
  //       createdTime: firestoreTimestamp,
  //           updatedTime: firestoreTimestamp,
  //           deletedTime: firestoreTimestamp,
  //           createdBy: createdBy,
  //           updatedBy: createdBy,
  //           deletedBy:createdBy,
  //     };
  //     console.log("inspection report added", report);
  //     // Add the new inspection report to Firestore and local array
  //     await masterdata
  //       .inspectionreport(report, report_id)
  //       .then(() => {
  //         console.log("inspection report added to Firestore");
  //         this.inspectionitem.push(report);
  //         this.close();
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Error adding inspection report to Firestore:",
  //           error
  //         );
  //       });
  //     // Reset the editedItem and close the form
  //     this.editedItem = Object.assign({}, this.defaultItem);
  //     this.close();
  //     this.initialize();
  //   } else {
  //     this.updateInspectionReport();
  //   }
  //   this.initialize();
  // },
  
  
  async addVehicle() {
    if (!this.isFormValid()) {
      // Display a generic validation message
      alert("Please fill in all fields.");
      return;
    }
  
    // Check if the form is in "Add" mode (editedIndex is -1)
    if (this.editedIndex == -1) {
      // Create a new inspection report object
  
      // Reference to the Firestore collection
      const collectionRef = db.collection("checkpoint_master");
  
      // Create a new document with an automatically generated ID
      const docRef = collectionRef.doc();
  
      // Get the generated document ID
      const report_id = docRef.id;
      console.log(report_id);
      console.log("inspection report adding");
  
      // Get the logged-in username
      const createdBy = this.userData.userName;
  
      // Fetch the vendor data based on the entered vendorCode
      const vendorCode = this.editedItem.vendorCode; // Get the entered vendorCode
      const vendorData = await this.fetchVendorByCode(vendorCode);
  
      if (!vendorData) {
        // Vendor data not found, handle this case as needed
        alert("Vendor data not found for the entered vendorCode.");
        return;
      }
  
      const report = {
        reportID: report_id,
        docNo: this.editedItem.docNo,
        issueNo: this.editedItem.issueNo,
        revNo: this.editedItem.revNo,
        vendorCode: this.editedItem.vendorCode,
        vendorName: this.editedItem.vendorName, // Use the fetched vendorName
        vendorID:vendorData.vendorID,
        bodyPartNo: this.editedItem.bodyPartNo,
        model: this.editedItem.model,
        serialNo: parseInt(this.editedItem.serialNo),
        mfgDate: this.editedItem.mfgDate,
        gateLocation: "Gate-1",
        date: moment().format("DD/MM/YYYY"),
        time: moment().format("LTS"),
        createdTime: firestoreTimestamp,
        updatedTime: firestoreTimestamp,
        deletedTime: firestoreTimestamp,
        createdBy: createdBy,
        updatedBy: createdBy,
        deletedBy: createdBy,
      };
      console.log("inspection report added", report);
  
      // Add the new inspection report to Firestore and local array
      await masterdata
        .inspectionreport(report, report_id)
        .then(() => {
          console.log("inspection report added to Firestore");
          this.inspectionitem.push(report);
          this.close();
        })
        .catch((error) => {
          console.error(
            "Error adding inspection report to Firestore:",
            error
          );
        });
      // Reset the editedItem and close the form
      this.editedItem = Object.assign({}, this.defaultItem);
      this.close();
      this.initialize();
    } else {
      this.updateInspectionReport();
    }
    this.initialize();
  },
  
  async fetchVendorByCode(vendorCode) {
    try {
      const querySnapshot = await db
        .collection("vendor_master")
        .where("vendorCode", "==", vendorCode)
        .limit(1)
        .get();
  
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const vendorData = doc.data();
        return vendorData;
      } else {
        console.error("Vendor document not found for vendorCode:", vendorCode);
        return null;
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error);
      return null;
    }
  },
  
  isFormValid() {
    // Check if all required fields are filled
    return (
      this.editedItem.docNo &&
      this.editedItem.issueNo &&
      this.editedItem.revNo &&
      this.editedItem.vendorName &&
      this.editedItem.bodyPartNo &&
      this.editedItem.model &&
      this.editedItem.serialNo &&
      this.editedItem.mfgDate &&
      this.editedItem.vendorCode
  
      // Add more conditions for other fields if needed
    );
  },
  
  async updateInspectionReport() {
    // Similar logic as before to update the checkpoint in Firestore and local array
    if (this.editedIndex > -1) {
      Object.assign(this.inspectionitem[this.editedIndex], this.editedItem);
  
      // Get the logged-in username
      const updatedBy = this.userData.userName;
  
      db.collection("inspection_report")
        .doc(this.editedItem.reportID)
        .update({
          vendorCode:this.editedItem.vendorCode,
          vendorName: this.editedItem.vendorName,
          bodyPartNo: this.editedItem.bodyPartNo,
          model: this.editedItem.model,
          serialNo: parseInt(this.editedItem.serialNo),
          mfgDate: this.editedItem.mfgDate,
          updatedTime: firestoreTimestamp,
          updatedBy: updatedBy, 
          deletedBy:this.userData.userName,
          // Set updatedBy to the user's login name
          // Update other fields similarly
        })
        .then(() => {
          console.log("Document successfully updated in Firestore!");
          this.close();
        })
        .catch((error) => {
          console.error("Error updating document in Firestore:", error);
        });
    }
    // Reset the editedItem and close the form
    this.editedItem = Object.assign({}, this.defaultItem);
    this.close();
  }
  
    },
  };
  </script>