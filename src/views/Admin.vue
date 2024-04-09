<template>
    <div class="Admin">
        
        <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
            <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
                <i class="fas fa-bars"></i>
            </a>
            
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <img class="img-responsive img-rounded" width="50px" height="50px" src="../assets/zshop_transparent_white.svg" mr="10px" alt="User picture">
                    <a href="#" ml="10px">Zshop</a>
                    <div id="close-sidebar" @click="closeMenu">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header">
                    <div class="user-pic">
                        <img class="img-responsive img-rounded" src="../assets/unknown.png" alt="User picture">
                    </div>
                    <div class="user-info">
                        <span class="user-name">
                            <strong>Admin</strong>
                        </span>
                        <span class="user-role"> {{email}} </span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>

                        <li>
                            <router-link to="/admin/products">
                                <i class="fab fa-amazon"></i>
                                <span>Products</span>
                            </router-link>
                        </li>

                        <li>
                            <a href="#" @click="logout()">
                                <i class="fa fa-power-off"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
       
        </nav>
        <!-- sidebar-content  -->
        <main class="page-content">
            <router-view/>
        </main>
        
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->




  </div>
</template>
  
  <script>

  import {auth} from  '../firebase'
  // @ is an alias to /src
  
  
  export default {
    name: "Admin",
    components: {

    },
    methods:{
      closeMenu(){
        $(".page-wrapper").toggleClass("toggled");
      },
      logout(){
          auth.signOut()
          .then(() => {
              this.$router.replace('/');
          })
          .catch((err) =>{
              console.log(err);
          });
      }
  }
}
  </script>
  
  <style lang="scss">
  
  </style>