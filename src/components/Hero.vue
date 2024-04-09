<template>
  <div class="hero">
    <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-md-5">
          <div class="hero-content">
            <h1 class="hero-title">Your One Stop Tech Shop!</h1>
            <p>
              Welcome to ZShop! We got the best deals for all kinds of laptops in the market. Gaming, productivity, business, brand new and refurbished we got it all for you. What are you waiting for? Shop now!
            </p>
            <div class="hero-btn mt-5">
              <button @click="explore" id="scrollBtn" class="btn custom-btn btn-info me-3">Explore</button>
              
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="graphic">
            <img id="mainPage" src="../assets/mainpage.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    msg: String,
  },
  methods:{
    explore(){
      document.getElementById('scrollBtn').addEventListener('click', function() {
  window.scrollBy(0, 600);
});
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/fonts/skranji.scss';

.hero {
  width: 100%;
  height: 600px; // Adjust the height as needed
  text-align: left;
  background-color: #2d3748;
  color: white;
}

h1.hero-title {
  font-family: 'Skranji', sans-serif !important; /* Set font family to 'Skranji' */
}

.hero-content p {
  font-family: 'Skranji', sans-serif !important; /* Set font family to 'Skranji' */
  margin-bottom: 5rem;
}

.hero-btn mt-5 {
  padding: 2rem;
}

.graphic {
  width: 25rem;
  height: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15rem;
}

.graphic img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>