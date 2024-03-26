<template>
  <div class="landingPage">
   <Navbar></Navbar>
   <Hero></Hero>
   <Products></Products> 
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import Products from '@/sections/Products.vue';

// @ is an alias to /src

export default {
  name: "LandingPage",
  components: {
    Navbar,
    Products,
    Hero
  },
};
</script>

<style lang="scss">

</style>