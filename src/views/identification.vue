<template>
  <h1>Bird ID</h1>
  <div class="field colour-field">
      <h3>Colours</h3>
      <div class="field-content">

      <label for="red">
        <input type="checkbox" v-model="colours" name="" id="red" value="red">
        <div data-colour="red" class="colour-label">
            <i class="fa-solid fa-check"></i>
        </div>
      </label>
      <label for="orange">
        <input type="checkbox" v-model="colours" name="" id="orange" value="orange">
        <div data-colour="orange" class="colour-label">
            <i class="fa-solid fa-check" style="color:black"></i>
        </div>
      </label>
      <label for="green">
        <input type="checkbox" v-model="colours" name="" id="green" value="green">
        <div data-colour="green" class="colour-label">
            <i class="fa-solid fa-check"></i>
        </div>
      </label>
      <label for="blue">
        <input type="checkbox" v-model="colours" name="" id="blue" value="blue">
        <div data-colour="blue" class="colour-label">
            <i class="fa-solid fa-check"></i>
        </div>
      </label>
      <label for="yellow">
        <input type="checkbox" v-model="colours" name="" id="yellow" value="yellow">
        <div data-colour="yellow" class="colour-label">
            <i class="fa-solid fa-check"></i>
        </div>
      </label>
      <label for="brown">
        <input type="checkbox" v-model="colours" name="" id="brown" value="brown">
        <div data-colour="brown" class="colour-label">
            <i class="fa-solid fa-check"></i>
        </div>
      </label>
      <label for="grey">
        <input type="checkbox" v-model="colours" name="" id="grey" value="grey">
        <div data-colour="grey" class="colour-label">
            <i class="fa-solid fa-check"></i>
        </div>
      </label>
      <label for="black">
        <input type="checkbox" v-model="colours" name="" id="black" value="black">
        <div data-colour="black" class="colour-label">
            <i class="fa-solid fa-check"></i>
        </div>
      </label>
      <label for="white">
        <input type="checkbox" v-model="colours" name="" id="white" value="white">
        <div data-colour="white" class="colour-label">
            <i class="fa-solid fa-check" style="color:black"></i>
        </div>
      </label>
      <label for="cream">
        <input type="checkbox" v-model="colours" name="" id="cream" value="cream">
        <div data-colour="cream" class="colour-label">
            <i class="fa-solid fa-check" style="color:black"></i>
        </div>
      </label>
      <label for="olive">
        <input type="checkbox" v-model="colours" name="" id="olive" value="olive">
        <div data-colour="olive" class="colour-label">
            <i class="fa-solid fa-check" style="color:white"></i>
        </div>
      </label>
      
      </div>
      
  </div>
  <div class="field">
      <h3>What habitat did you see the bird in?</h3>
      <div class="field-content">
        <label v-for="(h,index) in habitat_fields" :key="index" :for="h">
            <input type="radio" name="habitat" :id="h" :value="h" v-model="habitat">
            {{h}}
        </label>

      </div>
      
  </div>
  <button @click="search()">SEARCH</button>
  {{filtered_birds}}
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            habitat:'',
            colours:[],
            habitat_fields:[
                'forest',
                'forest_edge',
                'mangrove',
                'woodland',
                'park',
                'grassland',
                'coastal',
                'urban'
            ],
            birds:[],
            filtered_birds:[],
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
                    habitat:data[i][11].split(','),
                    colours:data[i][12].split(',')
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
           
            this.birds = birds
            

        });
    },
    methods:{
        search(){
           
            this.filtered_birds = 
            this.birds.filter(b=>{
                console.log(this.colours, b.colours);
                if(b.habitat.includes(this.habitat)){
                    if(this.colours.every(e=>b.colours.includes(e))){
                        return b

                    }

                    
                }
            })
        }
    }
}
</script>

<style>
.field{
    margin-top:2rem;
}
input{
    padding:0;
    margin:0;
}
label{
    position: relative;
    margin:1rem;
}
    .colour-label{
        position: relative;
    }
    .colour-label{
        
        background-color:rgb(219, 219, 219);
        position: absolute;
        top:50%;
        left:50%;
        height: 30px;
        width:30px;
        transform: translate(-50%, -50%);
        border-radius: 100%;
        z-index: 3;
        
    }
    .colour-label>i{
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%, -50%);
        color: white;
        display: none;
    }
    input:checked + .colour-label>i{
        display: block;
    }

    [data-colour="red"]{
        background-color: red;
    }
    [data-colour="green"]{
        background-color: green;
    }
    [data-colour="blue"]{
        background-color: blue;
    }
    [data-colour="yellow"]{
        background-color: rgb(255, 238, 0);
    }
    [data-colour="brown"]{
        background-color: rgb(136, 87, 47);
    }
    [data-colour="black"]{
        background-color: black;
    }
    [data-colour="white"]{
        background-color: white;
        border:2px solid black;
        
    }
    [data-colour="cream"]{
        background-color: rgb(241, 218, 141);
    }
    [data-colour="orange"]{
        background-color: rgb(255, 136, 0);
    }
    [data-colour="olive"]{
        background-color:rgb(183, 183, 11);
    }
    .colour-field{
        max-width: 600px;
        margin: auto;
        margin-top:2rem;

    }
    .colour-field>.field-content{
        display:flex;
    justify-content: center;
    }

</style>