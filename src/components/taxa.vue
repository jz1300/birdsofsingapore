<template>
  <div class="bird-taxa">
      
      <ul v-for="(o,oi) in orders" :key="o.o" >
          <h3 @click="dropdown(o.o)">{{o.o}} <i :class="'fa-solid fa-angle-down '+ (selected==o.o?'droparrow':'')" ></i></h3>
          <div v-if="selected==o.o" :class="selected==o.o?'dropdown':''">
            <li  v-for="(f,fi) in o.f" :key="f.f" :class="{selected_fam : f.clicked}" @click="family_click(f, fi, oi)" >{{f.f}}</li>

          </div>
      </ul>
  </div>
</template>

<script>
export default {
    props:{
        birds:Array,
        birds_o:Array,
    },
    data(){
        return {
            
            orders:[],
            families:[],
            family:'',
            selected:'',
        }
    },
    
    mounted(){
        console.log(this.birds);
        let f = new Set
        let o = new Set
        let orders = []
        let families = []
        //console.log(birds);
       
        this.birds_o.forEach(b=>{
           // console.log(b)
            f.add(b.family+","+b.order)
            o.add(b.order)
            
           
        })
        this.count = this.birds_o.length
        families = Array.from(f)
        families = families.map(f=>{
            return {f:f.split(',')[0],clicked:false, o:f.split(',')[1]};
        })

        orders = Array.from(o);
       
        orders = orders.map(o=>{
            return {
                o:o,
                f:[]
            }
        })
        orders.forEach(o=>{
            families.forEach(f=>{
             //   console.log(f.f,o.o);
                if(f.o == o.o){
                    o.f.push(f);
                }
            })

        })
        this.families = families;
        this.orders = orders;
        console.log(this.orders);
    },
    methods:{
        family_click(f, fi, oi){
            console.log(f.clicked);
            if(f.clicked){
                this.orders[oi].f[fi].clicked=false;
                this.family = ''
            }
            else{
                this.orders = this.orders.map(o=>{
                    o.f = o.f.map(f=>{
                        f.clicked=false;
                        return f;
                    })
                    return o;
                })
                this.orders[oi].f[fi].clicked = true;
                this.family = f.f
            }

            this.$emit('family', this.family)
        },
    dropdown(o){
        
            if(this.selected == o){
                this.selected = ''
            }
            else{
                this.selected = o
            }
        }
    },
}
</script>

<style>
    .bird-taxa{
        flex-grow: 1;
        overflow-y: auto;
        right:0;

    }
    li{
        list-style-type: none;
        padding:1rem;
        cursor: pointer;
        
    }
    .selected_fam{
        background-color:red;
    }
    h3{
        padding:1rem;
        cursor: pointer;
    }
    ul div{
        display: flex;
        flex-direction: column;
        
    }
    .dropdown{
        animation:dropdown 0.3s ease-in-out forwards;
        transform-origin: top center;
    }
    h3 i{
        transform: rotate(0deg);
        transition:all 0.3s;
    }
    .droparrow{
        transform: rotate(180deg);
    }
    @keyframes dropdown {
                0% {
            transform: rotateX(-90deg)
        }
        70% {
            transform: rotateX(20deg)
        }
        100% {
            transform: rotateX(0deg)
        }
    }
    
</style>