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
        
      <!-- Button and Success Message -->
      
                <div class="row">
              <div class="col-md-2">
                <h3 class="d-inline-block" >Products list</h3>
              </div>
              <div class="col-md-6 ">
                <button id="addBtn" @click="addNew" class="btn btn-primary">Add Product</button>
              </div>
            </div>

         
          
      <!-- Product Table -->
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Modify</th>
            </tr>
          </thead>
          <!-- Table Body -->
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{  "₱" + product.price  }}</td>
              <td>{{ product.description }}</td>
              <td>
                <div class="button-wrapper">
                  <button @click="editProduct(product)" class="btn btn-warning ">
                    <img src="@/assets/edit.png" class="image">
                  </button>
                  <button @click="removeProduct(product)" class="btn btn-danger">
                    <img src="@/assets/delete.png" alt="" class="image">
                  </button>
                </div>
              </td>


            </tr>
          </tbody>
          <!-- Populate table rows with product data -->
        </table>
      </div>
    </div>
    <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="editLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editLabel">Edit Product</h5>
          <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <div class="form-group">
                    <textarea placeholder="Description here..." v-model="product.description" class="form-control"></textarea>
                  </div>

                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>


                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1"  v-for="(image,index) in product.images">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>

                  </div>
                </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary text-center" data-mdb-dismiss="modal" @click="closeModal">Close</button>
          <button v-if="isEditMode" type="button" class="btn btn-primary" @click="saveChanges">Save changes</button>
          <button v-else id="addBtn" @click="addItem" class="btn btn-primary">Add Product</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import { db , app} from '@/firebase.js'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
const querySnapshot = await getDocs(collection(db, "products"));
import { getStorage, ref, uploadBytes , getDownloadURL, deleteObject} from "firebase/storage";


export default {
  name: "Products",
  props: {
    msg: String
  },
  data() {
    return {
      products: [], // array to store all the
      product: {
        name:null,
        price:null,
        description:null,
        images:[]
      },
      editModal:null,
      editingDocId: null,
      isEditMode: false
      
    };
  },
  methods: {

    deleteImage(imageUrl, index) {
  // Remove the image from the product.images array
  this.product.images.splice(index, 1);

  try {
    // Create a reference to the image file in Firebase Storage
    const storage = getStorage();
    const imageRef = ref(storage, `${decodeURIComponent(imageUrl.split('?')[0].split('/').pop())}`);

    // Delete the image from Firebase Storage
    deleteObject(imageRef)
      .then(() => {
        console.log('Image deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting image: ', error);
      });
  } catch (error) {
    console.error('Error deleting image: ', error);
  }
},


uploadImage(event) {
  if (event.target.files[0]) {
    try {
      const file = event.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, 'products/' + file.name);

      // Upload file
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          // Get the download URL
          getDownloadURL(storageRef)
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              console.log('Before push:', this.product.images); // Log the array before pushing
              this.product.images.push(downloadURL);
              console.log('After push:', this.product.images); // Log the array after pushing
            })
            .catch((error) => {
              console.error('Error getting download URL: ', error);
            });
        })
        .catch((error) => {
          console.error('Error uploading file: ', error);
        });
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  }
},


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

      Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const docRef = doc(db, "products", product.id);
       deleteDoc(docRef);
      // Remove the product from the local products array
      this.products = this.products.filter(p => p.id !== product.id);
        Toast.fire({
            icon: "success",
            title: "Deleted successfully"
          });
        }
    });
},

addItem() {
  // Check if the name and price fields are empty
  if (!this.product.name || !this.product.price || !this.product.description) {
    Toast.fire({
  icon: "warning",
  title: "Fill Out All Fields"
});
    return; // Exit the function early
  }

  // If fields are not empty, proceed with adding the product
  addDoc(collection(db, "products"), this.product)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      this.readData();

      // Reset the product object after successful addition
      this.closeModal();
        Toast.fire({
        icon: "success",
        title: "New product added!"
      });
    })
    .catch((error) => {
      console.error("Error adding product: ", error);
    });
},

    reset(){
      this.product = {
          name:null,
          description:null,
          price:null,
          images:[]
      }
    },

  addNew(){
    // this.editModal = 'new'
      this.isEditMode = false;
      this.editModal.show();
  },

    editProduct(product) {
      this.isEditMode = true;
      // Set the product data in the modal
      this.product.name = product.name;
      this.product.price = product.price;
      this.product.description = product.description;
      this.product.images = product.images;
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
      this.reset();
      this.editingDocId = null;

      // Close the modal
      this.editModal.hide();
      Toast.fire({
        icon: "success",
        title: "Changes saved!"
      });
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  },
    closeModal() {
      // Reset the product data in the modal
      this.reset();

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
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-group {
  padding-bottom: 1rem;
}
.btn-danger,
.btn-warning {
  height: fit-content;
  width: fit-content;
}
.btn-danger,
.btn-warning {
  margin-right: 1rem;
}
.form-group input {
  width: 100%;
  max-width: 300px; /* Adjust the value as needed */
}

.image {
  width: 20px !important; /* Adjust the width as needed */
  height: 20px !important; /* Adjust the height as needed */
  object-fit: contain !important; /* Maintain aspect ratio */
}
.button-wrapper {
  display: flex;
}

.button-wrapper:not(:last-child) {
  margin-right: 5px; /* Adjust spacing between buttons */
}

textarea {
  width: 100%;
  height: 300px !important; /* Adjust height as needed */
  resize: vertical; /* Allow vertical resizing only */
}

</style>