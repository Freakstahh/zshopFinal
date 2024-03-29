<template>
  <div class="products">
      
    <!-- Intro Section -->
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3><strong>Products Page</strong></h3>
            <p>Add | Edit | Delete Your products here.</p>
          </div>
          <div class="col-md-6">
            <img src="../assets/products_bckgrnd.svg" alt="" class="img-fluid">
          </div>
        </div>
      </div>
    </div>

    <hr>

    <!-- Product Form -->
    <div class="product-test">
      
      <div class="form-group">
        <input type="text" placeholder="Product Name" mb="2rem" v-model="product.name" class="form-control">
      </div>
      <div class="form-group">
        <input type="text" placeholder="Product Price" v-model="product.price" class="form-control">
      </div>

      <!-- Button and Success Message -->
      <div class="row">
        <div class="col-md-6">
          <button @click="addItem" class="btn btn-primary float-right ">Add Product</button>
        </div>
        <div class="col-md-6 text-right">
          <div v-if="isSuccess" class="text-success">Product added successfully!</div>
        </div>
      </div>

      <h3 class="d-inline-block">Products list</h3>
      <!-- Product Table -->
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Modify</th>
            </tr>
          </thead>
          <!-- Table Body -->
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>
                <button @click="editProduct(product)" class="btn btn-warning" data-mdb-ripple-init data-mdb-modal-init data-mdb-target="#edit">Edit</button>
                <button @click="removeProduct( product)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
          <!-- Populate table rows with product data -->
        </table>
      </div>
    </div>
    <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="editLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editLabel">Edit Product</h5>
          <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input type="text" placeholder="Product Name" mb="2rem" v-model="product.name" class="form-control">
          </div>
          <div class="form-group">
            <input type="text" placeholder="Product Price" v-model="product.price" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal" @click="closeModal">Close</button>
          <button type="button" class="btn btn-primary" @click="saveChanges">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import { db } from '@/firebase.js'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
const querySnapshot = await getDocs(collection(db, "products"));

export default {
  name: "Products",
  props: {
    msg: String
  },
  data() {
    return {
      products: [], // array to store all the
      product: {
        name: null,
        price: null
      },
      editModal:null,
      isSuccess: false, // Track success state
      editingDocId: null
    };
  },
  methods: {
    async readData() {
      try {
      const querySnapshot = await getDocs(collection(db, "products"));
      this.products = []; // Clear the products array before populating it
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        docData.id = doc.id; // Add the document ID to the data object
        this.products.push(docData);
      });
      } catch (error) {
      console.error("Error fetching products: ", error);
  }
    },
    async removeProduct(product) {
  if (!product) {
    console.error("Invalid product object");
    return;
  }

  if (confirm('Are you sure?')) {
    try {
      const docRef = doc(db, "products", product.id);
      await deleteDoc(docRef);
      // Remove the product from the local products array
      this.products = this.products.filter(p => p.id !== product.id);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  }
},

    addItem() {
      addDoc(collection(db, "products"), this.product)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.readData();
          this.isSuccess = true; // Set success state to true
          // Reset the product object after successful addition
          this.product = { name: null, price: null };
          // Hide success message after a few seconds
          setTimeout(() => {
            this.isSuccess = false;
          }, 3000);
        })
        .catch((error) => {
          console.error("Error adding product: ", error);

        });
    },
    editProduct(product) {
      // Set the product data in the modal
      this.product.name = product.name;
      this.product.price = product.price;
      this.editingDocId = product.id;

      // Show the modal
      this.editModal.show();
    },
    async saveChanges() {
    if (!this.editingDocId) {
      console.error("No document ID provided for editing");
      return;
    }

    try {
      const docRef = doc(db, "products", this.editingDocId);
      await updateDoc(docRef, this.product);

      // Update the local products array
      const index = this.products.findIndex(p => p.id === this.editingDocId);
      if (index !== -1) {
        this.products.splice(index, 1, { ...this.product, id: this.editingDocId });
      }

      // Reset the product data and editingDocId
      this.product = { name: null, price: null };
      this.editingDocId = null;

      // Close the modal
      this.editModal.hide();
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  },
    closeModal() {
      // Reset the product data in the modal
      this.product.name = null;
      this.product.price = null;

      // Close the modal
      this.editModal.hide();
    },
  },
  mounted() {
    this.editModal = new Modal(document.getElementById('edit'));
  
  },
  created(){
    this.readData();
  }
}
</script>

  
<style scoped lang="scss">
.form-group{
  padding-bottom: 1rem;
}
// .btn-primary{
//   margin-bottom: 1rem;
// }
.btn-danger, .btn-warning{
  margin-right: 1rem;
}
</style>