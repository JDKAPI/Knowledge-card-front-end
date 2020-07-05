<template>
    <el-container v-bind:style="{backgroundColor:colordata[index]}" class="main">
      <el-header style="z-index: 10;"><NavMenu></NavMenu></el-header>
      <el-container>
        <el-aside style="width: 200px;z-index: 10"><SideMenu></SideMenu></el-aside>
        <el-main style="z-index: 10;">
          <Card ></Card>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
  import NavMenu from "./common/NavMenu";
  import SideMenu from "./common/SideMenu";
  import Card from "./cardmanager/Card";
    export default {
        name: "Cardmanager",
      components: {Card, SideMenu, NavMenu},
      data(){
          return{
            index:0,
            colordata:['#FFFFCC','#FFFFFF','#E8E8E8'],
          }
      },
      mounted() {
        this.initcolor();
      },
      methods:{
        initcolor(){
          var temp = window.sessionStorage;
          this.index=temp.getItem('backcolor');
        },
      }
    }
</script>
<style>
  .main {
    height: 100%;
    width: 100%;
    position: absolute;
  }
</style>
<style scoped>
</style>
