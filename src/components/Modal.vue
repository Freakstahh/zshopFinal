<template>
  <div>
    <!-- Success Modal -->
    <div
      class="modal fade"
      :class="{ show: showSuccessModal }"
      tabindex="-1"
      aria-labelledby="successModalLabel"
      aria-hidden="true"
      ref="successModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">Success</h5>
            <button
              type="button"
              class="btn-close"
              @click.prevent="closeSuccessModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>{{ successMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeSuccessModal">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Registration Modal -->
    <div
      class="modal fade"
      :class="{ show: showModal }"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              @click.prevent="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <img
            id="logo"
            src="../assets/zshop_transparent_colored.svg"
            width="100%"
            height="80px"
          />
          <div class="modal-body">
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>

            <div data-mdb-input-init class="form-outline mb-4">
              <h5 class="text-center">Create New Account</h5>
  
            </div>

            <!-- Email input -->
            <div data-mdb-input-init class="form-outline mb-4">
              <label class="form-label" for="registerEmail">Email</label>
              <input
                placeholder="Enter Email"
                id="registerEmail"
                v-model="email"
                class="form-control"
              />
            </div>

            <!-- Password input -->
            <div data-mdb-input-init class="form-outline mb-4">
              <label class="form-label" for="registerPassword">Password</label>
              <input
                placeholder="Password"
                id="registerPassword"
                type="password"
                v-model="password"
                class="form-control"
              />
            </div>
            <div class="d-grid gap-5 col-12 mx-auto">
              <button
                class="btn btn-primary"
                type="button"
                data-mdb-ripple-init
                @click="register"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <div class="d-grid gap-5 col-12 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../firebase.js';
const email = ref('');
const password = ref('');

export default {
  name: 'Modal',
  props: {
    msg: String,
  },
  data() {
    return {
      showModal: false,
      showSuccessModal: false,
      modalInstance: null,
      successModalInstance: null,
      email: null,
      password: null,
      errorMessage: null,
      successMessage: null,
    };
  },
  mounted() {
    this.modalInstance = new Modal(this.$refs.modal);
    this.successModalInstance = new Modal(this.$refs.successModal);
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
    openSuccessModal(message) {
      this.successMessage = message;
      this.showSuccessModal = true;
      this.successModalInstance.show();
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.successModalInstance.hide();
    },
    register() {
      const auth = getAuth(firebaseApp);
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const successMessage = `User created successfully: ${user.email}`;
          this.$router.replace('home');
          // Clear the input fields after successful registration
          this.email = null;
          this.password = null;
          // Emit an event to handle the successful registration in the parent component
          this.$emit('registrationSuccessful');
          // Open the success modal
          this.openSuccessModal(successMessage);
          // Close the registration modal after a 5-second delay
          this.closeModal();
        })
        .catch((error) => {
          const errorMessage = error.message;
          this.errorMessage = `Error creating user: ${errorMessage}`;
        });
    },
  },
};
</script>