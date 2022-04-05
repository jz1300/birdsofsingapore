<template>
    <div class="loading"></div>
    <transition name="fade">
        <popup v-if="isBirdSelected" :bird="selectedBird" @hide="hidePopup"></popup>

    </transition>
    <div class="toolbar">
        <h1>{{birds.length}} results</h1>
        <input type="text" @keyup="refresh(family)" v-model="search">
       {{search}}
    </div>
  <main>
    <taxa :birds="birds" :birds_o="birds_o" @family="refresh" :key="componentKey"></taxa>
    <transition-group tag="div" name="fade" appear="" class="bird-grid" :key="componentKey">
            
            <birdcard :bird="b" :key="b.id" v-for="b in birds"  @click="selectedBird=b;isBirdSelected=true"></birdcard>


    </transition-group>
      
  </main>
</template>

<script>
import axios from 'axios'
import birdCard from '../components/birdCard.vue'
import birdTaxa from '../components/taxa.vue'
import popup from '../components/bird.vue'
//import gsap from 'gsap'

export default {

    components:{
        birdcard:birdCard,
        taxa:birdTaxa,
        popup:popup,
    },

    data(){
        return {
            birds_o:[],
            birds:[],
            habitats:[],
            componentKey:0,
            family:'',
            search:'',
            selectedBird:{},
            isBirdSelected:false,
        }
    },
    mounted(){
        const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQY1kLTCzgMuKiMFa5WzK_XcQfu6cqzxT3qR3BhqkFjrZ1zAbyCdmWpcQ4dh8pLP9h1usLcoNjWwxUc/pub?output=tsv'
    
        let habitats = []
        const birds = []
        axios.get(url)
        .then(response=>{
            
            let data = response.data.split('\r\n')
            for(let i =1; i<data.length;i++){
                data[i] = data[i].split('\t')
          
                birds.push({
                    index:data[i][0],
                    common_name:data[i][1],
                    scientific_name:data[i][2],
                    family:data[i][3],
                    habitat_desc:data[i][4],
                    abundance: data[i][5],
                    status:data[i][6],
                    description:data[i][7],
                    diet:data[i][8],
                    image:data[i][9],
                    order:data[i][10],
                    habitat:data[i][11].split(',')
                })
            }
            let s = new Set;
            for(let i = 0; i<birds.length;i++){
                
                birds[i].habitat.forEach(h=>{
                    s.add(h)
                })
    
            }
            habitats = Array.from(s)
            console.log(birds);
           
            this.habitats = habitats
            this.birds = birds
            this.birds_o = birds
            this.key++
            this.componentKey++
            this.$forceUpdate();

        });
    },
    methods:{
        hidePopup(){
            this.selectedBird = {}
            this.isBirdSelected = false
            
        },
        refresh(event){
            this.family = event
            console.log(event);

            this.birds = this.birds_o.filter(b=>{
                    if(this.family == ''){
                        return true
                    }
                    else{
                        if(b.family==event){
                                return true;
                        }
                        else{
                            return false
                        }

                    }
                   
            })
            this.birds = this.birds.filter(b=>{
               return b.common_name.toLowerCase().includes(this.search)||b.scientific_name.toLowerCase().includes(this.search)
            })
        }
    }
}
</script>

<style>
.toolbar{
    height: 10vh;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding:0 4rem;
}
main{
    display:flex;
    height: 90vh;
}
.bird-grid{
    padding:1rem;
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));
    gap:1.2rem;
    overflow: auto;
    width: 80%;

}
.bird-card{
    border:1px solid black;
    height: fit-content;
    transition:all 0.3s;
    cursor: pointer;
    height: 100%;
    max-height: 320px;
}
.bird-card:hover{
    transform: scale(1.05);
}


.fade-enter-to{
    opacity: 1;
}
  .fade-leave-from{
      opacity: 1;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity 0.2s ease;
  }
  .fade-enter-from, .fade-leave-to{
    opacity: 0;
  }

</style>