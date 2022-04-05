<template>
  
     <div class="bird-card"  >
      <img :src="bird.image" alt="">
      <div class="bird-card-content">
        <p>{{bird.scientific_name}}</p>
        <h2>{{bird.common_name}}</h2>
      
     </div>
     </div>
  
</template>

<script>
export default {
    props:{
        bird: Object,
    }
}
</script>

<style scoped>
  img{
    width:100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
  .bird-card-content{
    padding:1.4rem;
  }
  .bird-card-content h2{
    font-size: 1.2rem;
  }
  .bird-card-content p{
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
  }
  
</style>