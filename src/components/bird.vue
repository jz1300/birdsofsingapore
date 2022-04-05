<template>

    
    <div class="bird-popup" @click.self="$emit('hide')">
        <div class="bird-popup-container" >
            <img :src="bird.image" alt="">
            <div class="bird-content">
                <p>{{bird.scientific_name}}</p>
                <h1>{{bird.common_name}}</h1>
                <p>
                    <i class="fa-solid fa-tree"></i>
                    {{bird.habitat_desc}}</p>
                <p>
                <i class="fa-solid fa-utensils"></i>
                    {{bird.diet}}
                </p>
                <p>{{bird.description}}</p>

            </div>
        </div>
    </div>
  
</template>

<script>

export default {
    props:{
        bird:Object
    }
}
</script>

<style scoped>
    .bird-popup{
        position:absolute;
        top:0;
        left:0;
        height: 100vh;
        width:100vw;
        background-color: rgba(0, 0, 0, 0.418);
        z-index: 99;
    }
    .bird-popup-container{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        background-color:white;
        padding-left: 2rem;
        height: 600px;
        display:flex;
    }

    img{
        height: 100%;
        aspect-ratio: 3/4;
        object-fit: cover;
    }

    .bird-content *{
        text-align: left;
    }
    h1{
        white-space: nowrap;
    }
    .bird-content{
        display:flex;
        flex-direction: column;
        justify-content: center;
        width:fit-content;
     
        padding:4rem;
    }



</style>