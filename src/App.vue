<template>
  <div id="app">
    <router-view />

  </div>

</template>

<script>
// @ is an alias to /src
// import { onBeforeMount } from 'vue';
// import { useRouter,useRoute } from 'vue-router';
// import firebaseApp from './firebase.js';

// export default {
//   setup(){
//     const router = useRouter();
//     const route = useRoute();
//     onBeforeMount(() =>{

//       firebaseApp.auth().onAuthStateChanged((user)=>{
//         if(!user){
//           this.router.replace('home');
//         }else if(route.path == "home" || route.path == "/"){
//           router.replace('/');
//         }
//       })
//     })
//   }
  
// };
</script>

<style lang="scss">

</style>