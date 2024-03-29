<template>
    <div class="userProducts">
        <Navbar/>
        <h1>User Products Page</h1>
      
      
    </div>
  </template>

  <script>
  import Navbar from '@/components/Navbar.vue';
  export default {
  name: "UserProducts",
  components: {
    'Navbar': Navbar,
  },
  props: {
    msg: String
  }
};
</script>
  