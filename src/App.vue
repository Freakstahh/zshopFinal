<template>
  <Navbar/>
  
  <Modal/>

</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/Modal.vue'


export default {
  name: 'HomeView',
  components: {
    Navbar,
    Modal
  },
  
};
</script>

<style lang="scss">

</style>