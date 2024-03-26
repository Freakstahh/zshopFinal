<template>
 <!-- Name input -->
 <div v-if="successMessage" class="alert alert-success" role="alert">
    {{ successMessage }}
  </div>
  <div v-if="errorMessage" class="alert alert-danger" role="alert">
    {{ errorMessage }}
  </div>
 <div data-mdb-input-init class="form-outline mb-4">
        <h5 class="text-center">Create New Account</h5>
        <label class="form-label" for="registerName">Name</label>
        <input placeholder="Enter Name" id="registerName" v-model="name" class="form-control" />
      </div>

      <!-- Email input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <label class="form-label" for="registerEmail">Email</label>
        <input placeholder="Enter Email" id="registerEmail" v-model="email" class="form-control" />
      </div>

      <!-- Password input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <label class="form-label" for="registerPassword">Password</label>
        <input placeholder="Password" id="registerPassword" type="password" v-model="password" class="form-control" />
      </div>
      <div class="d-grid gap-5 col-12 mx-auto">
        <button class="btn btn-primary" type="button" data-mdb-ripple-init @click="register">Sign Up</button>
      </div>

     
      
</template>

<script>
import {ref} from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
const email  = ref("");
const password = ref("")
export default {
  name: "Registration",
  props: {
    msg: String,
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      successMessage: null,
      errorMessage: null,
    };
  },
  methods: {
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.successMessage = `User created successfully: ${user.email}`;
          this.errorMessage = null; // Clear any previous error message
          // Clear the input fields after successful registration
          this.name = null;
          this.email = null;
          this.password = null;
          // Emit an event to close the modal or handle the successful registration in the parent component
          this.$emit("registrationSuccessful");
        })
        .catch((error) => {
          const errorMessage = error.message;
          this.errorMessage = `Error creating user: ${errorMessage}`;
          this.successMessage = null; // Clear any previous success message
        });
    },
  },
};
</script>

<style lang="scss">

</style>

//delete this component