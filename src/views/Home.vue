<template>
  <div class="home">
   <Navbar></Navbar>
   <Hero></Hero>
   <ProductList></ProductList> 
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import ProductList from '@/sections/ProductList.vue';

// @ is an alias to /src

export default {
  name: "Home",
  components: {
    Navbar,
    ProductList,
    Hero
  },
};
</script>

<style lang="scss">

</style>