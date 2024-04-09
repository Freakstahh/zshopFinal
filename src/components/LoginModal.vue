<template>
  <div class="modal fade" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
        </div>
        <img id="logo" src="../assets/zshop_transparent_colored.svg" width="100%" height="80px" />
        <h5 class="text-center">Login To Your Account</h5>
        <div class="modal-body">
          <div class="tab-content">
  <div
    class="tab-pane fade show active"
    id="pills-login"
    role="tabpanel"
    aria-labelledby="tab-login"
  >
    <form @submit.prevent="Login">
      
      <!-- Email input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <label class="form-label" for="loginName">Email</label>
        <input placeholder="Email" type="email" id="loginName" class="form-control" v-model="email" />
        
      </div>

      <!-- Password input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <label class="form-label" for="loginPassword">Password</label>
        <input placeholder="Password" type="password" id="loginPassword" class="form-control" v-model="password" />
        
      </div>
      <div class="d-grid gap-5 col-12 mx-auto">
            <button class="btn btn-primary"  type="button" data-mdb-ripple-init @click="login">Login</button>
          </div>

      <!-- 2 column grid layout -->
      <div class="row mb-4">
        <div class="col-md-6 d-flex justify-content-center">
          <!-- Checkbox -->
          
        </div>

       
      </div>



      <!-- Register buttons -->
      <div class="text-center">
        <p>Not a member? Register</p>
      </div>
    </form>
  </div>
  <div
    class="tab-pane fade"
    id="pills-register"
    role="tabpanel"
    aria-labelledby="tab-register"
  >
    
  </div>
</div>
<!-- Pills content -->
        </div>
        <div class="modal-footer">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase.js'
// import firebaseApp from '@/firebase.js';
import { useRouter } from 'vue-router';

const ADMIN_EMAIL = 'admin@email.com';

export default {
  name: 'LoginModal',
  data() {
    return {
      showModal: false,
      modalInstance: null,
      email: null,
      password: null,
    };
  },
  mounted() {
    this.modalInstance = Modal.getOrCreateInstance(this.$refs.modal);
  },
  methods: {
    openModal() {
      this.showModal = true;
      this.modalInstance.show();
    },
    closeModal() {
      this.showModal = false;
      this.modalInstance.hide();
    },
    login() {
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        this.closeModal();

        // Check if the logged-in user is the admin
        if (user.email === ADMIN_EMAIL) {
          // Redirect to the admin page
          this.$router.replace('admin/products');
        } else {
          // Redirect to the regular user page
          this.$router.replace('home');
        }

        Toast.fire({
          icon: "success",
          title: "Login successful!"
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Authentication error:', errorMessage);
      });
  }
  },
};
</script>

<style>
.logo {
  width: 100px !important;
  height: 150px !important;
}
.modal-header,
.modal-footer {
  border: none !important;
}
</style>