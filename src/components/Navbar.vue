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
            <li v-if="isAuthenticated" class="nav-item">
              <router-link class="nav-link active" to="/home">Home</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <router-link class="nav-link" to="/userProducts">Products</router-link>
            </li>
            
          </ul>
          
          <div class="d-flex align-items-center">
            <h5 v-if="isAuthenticated" class="text-white font-weight-bold me-4 mt-2">Welcome, {{ name }}</h5>
            
            <div v-if="isAuthenticated" class="mr-5">
              <button
                data-mdb-ripple-init
                type="button"
                @click="logout"
                class="btn btn-logout px-2 btn-lg"
              >
                Logout
              </button>
            </div>
            <div class="d-flex align-items-center">
              <button
                data-mdb-ripple-init
                data-mdb-modal-init
                @click="showSignupModal"
                class="btn btn-signup me-3 btn-lg"
                v-if="!isAuthenticated"
              >
                Sign up
              </button>
              <button
                data-mdb-ripple-init
                type="button"
                @click="showLoginModal"
                class="btn btn-login px-5 me-5 btn-lg"
                v-if="!isAuthenticated"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <LoginModal ref="loginModal" />
  <Modal ref="signupModal" />
</template>


<script>
import Modal from '@/components/Modal.vue'
import LoginModal from '@/components/LoginModal.vue'
import { auth } from '@/firebase.js'; 
import { ref, onBeforeMount } from 'vue';

export default {
  name: "Navbar",
  components: {
    Modal,
    LoginModal,
  },
  data() {
    return {
      isAuthenticated: false
    };
  },
  methods: {
    showSignupModal() {
      this.$refs.signupModal.openModal();
    },
    showLoginModal() {
      this.$refs.loginModal.openModal();
      this.$emit('show-login-modal'); // Emit the custom event
    },
    logout() {
      auth.signOut()
        .then(() => {
          this.$router.replace('/');
          Toast.fire({
            icon: "success",
            title: "Logged out!"
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  created() {
    // Update isAuthenticated based on authentication state
    auth.onAuthStateChanged(user => {
      this.isAuthenticated = !!user;
    });
  },
  setup() {
    const name = ref("");
    
    onBeforeMount(() => {
      const user = auth.currentUser;
      if (user) {
        const username = user.email.split('@')[0];
        name.value = capitalizeFirstLetter(username);
      }
    });
    return {
      name
    }
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
}
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
.btn-signup:hover {
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
.btn-logout {
    background-color: #1fa3a3 !important;
    color: #fff !important;
    text-align: center;
    text-decoration-color: #fff;
    padding-left: 10px !important;
}
.btn-logout:hover {
    background-color: #1b7878 !important;
    color: #fff;
    text-align: center;
}
.navbar-brand {
    padding-left: 50px;
    overflow: visible;
    padding-top: 0;
    padding-bottom: 0;
}
.nav-link {
    color: #fff !important;
    font-weight: bold !important;
    font-size: large !important;
    padding-left: 5rem !important;
}
.nav-link:hover {
    color:#c7ddef !important;
    outline-color: #c7ddef !important;
}
.text-white {
    color: #fff !important;
}
.font-weight-bold {
    font-weight: bold !important;
}

</style>


