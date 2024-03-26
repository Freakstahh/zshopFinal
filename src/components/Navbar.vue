<!-- Navbar.vue -->
<template>
  <div class="nav-container fixed top-0 w-full">
    <nav class="navbar navbar-expand-lg" style="background-color: #2d3748;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            src="../assets/zshop_transparent_white.svg"
            alt="Bootstrap"
            width="100%"
            height="80px"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active"  href="home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="userProducts">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="about">About</a>
            </li>
          </ul>
          <div class="align-items-center">
            <button
              data-mdb-ripple-init
              data-mdb-modal-init
              @click="showSignupModal"
              class="btn btn-signup me-3 btn-lg"
            >
            Sign up
            </button>
            <button
            data-mdb-ripple-init
            type="button"
            @click="showLoginModal"
            class="btn btn-login px-5 me-3 btn-lg"
            >
            Login
            </button>
          </div>
        </div>
      </div>
      
    </nav>
    <!-- <Modal ref="modal" /> -->
  </div>
  <LoginModal ref="loginModal" />
      <Modal ref="signupModal" />
</template>

<script>
import Modal from '@/components/Modal.vue'
import LoginModal from '@/components/LoginModal.vue'


export default {
  name: "Navbar",
  components: {
    Modal,
    LoginModal,
  },
  methods: {
  showSignupModal() {
    this.$refs.signupModal.openModal();
  },
  showLoginModal() {
    this.$refs.loginModal.openModal();
    this.$emit('show-login-modal'); // Emit the custom event
  },
},
}
</script>

<style>
.nav-container {
  position: sticky;
  top: 0;
  z-index: 1020; /* Ensure the navbar is on top of other elements */
}
.btn-signup {
    color: #1fa3a3 !important;
}
.btn-signup:hover{
    color: #204db0 !important;
}
.btn-login {
    background-color: #1fa3a3 !important;
    color: #fff !important;
    text-align: center;
    text-decoration-color: #fff;
}
.btn-login:hover {
    background-color: #1b7878 !important;
    color: #fff;
    text-align: center;
}
.navbar-brand{
    padding-left: 50px;
    overflow: visible;
    padding-top: 0;
    padding-bottom: 0;
}
.nav-link{
    color: #fff !important;
    font-weight: bold !important;
    font-size: large !important;
    padding-left: 5rem !important;
}
.nav-link:hover{
    color:#c7ddef !important;
    outline-color: #c7ddef !important;
    }
</style>