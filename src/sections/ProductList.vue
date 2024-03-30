<template>
  <div class="products" id="products">
    <div class="container">
      <h1 class="text-center p-5">Our Products List</h1>
      <div class="row">
        <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <!-- Render Slides Dynamically -->
            <div
              class="carousel-item"
              v-for="(productChunk, index) in productChunks"
              :key="index"
              :class="{ active: index === 0 }"
            >
              <div class="row">
                <!-- Card -->
                <div class="col-md-4" v-for="(product, i) in productChunk" :key="i">
                  <div class="card product-item">
                    <img :src="product.images" class="card-img-top" alt="..." width="100px" />
                    <div class="card-body">
                      <h5 class="card-title">{{ product.name }}</h5>
                      <h7 class="card-title"><strong>{{ "₱ " +product.price }}</strong></h7>
                      <p class="card-text">{{ product.description }}</p>
                      <a href="#" class="btn btn-primary">Add to Cart</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Carousel navigation buttons -->
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, fetchDocs } from '@/firebase.js';

export default {
  name: 'ProductsList',
  data() {
    return {
      products: [], // Initialize an empty array for products
    };
  },
  computed: {
    productChunks() {
      // Divide the products into chunks of 3
      return this.products.reduce((chunks, product, index) => {
        const chunkIndex = Math.floor(index / 3);
        if (!chunks[chunkIndex]) {
          chunks[chunkIndex] = [];
        }
        chunks[chunkIndex].push(product);
        return chunks;
      }, []);
    },
  },
  async mounted() {
    // Fetch data from Firestore when the component is mounted
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const docsSnap = await fetchDocs(); // Fetch documents from Firestore
        docsSnap.forEach(doc => {
          // Push each document's data to the products array
          this.products.push(doc.data());
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  }
}
</script>





  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
      products {
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}

.card.product-item {
  height: 100%;
  display: flex;
  flex-direction: column;
  //justify-content: space-between; // Add this line
  margin-bottom: 1rem; // Add this line

  .card-body {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .card-text {
    flex-grow: 1;
  }
  .products{
        // margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: auto;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  background-color: #1b7878 !important;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 1;
}

.carousel-control-prev {
  left: -60px;
}

.carousel-control-next {
  right: -60px;
}
  </style>