<template>
   <el-container>
     <el-header><NavMenu></NavMenu></el-header>
     <el-container>
       <el-aside style="width: 200px">
         <SideMenu></SideMenu>
       </el-aside>
       <el-main>
          <div style="margin-left: 200px;margin-right: 380px">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
            <el-button icon="el-icon-back" style="border: none;font-size: 50px;float: left"></el-button>
            <el-button icon="el-icon-right" style="border: none;font-size: 50px;float: right"></el-button>
          </div>
       </el-main>
     </el-container>
   </el-container>
</template>

<script>
    import NavMenu from "../common/NavMenu";
    import SideMenu from "../common/SideMenu";
    import axios from 'axios';
    export default {
        name: "Reviewcard",
      components: {SideMenu, NavMenu},
      data(){
          return{

          }
      },
      methods:{
          getdata(){
            axios.get('',
              {
                params:{
                  userid:1
                }
              }
            ).then(function (res) {
              console.log(res);
            }).catch(function (error) {
                    console.log(error);
            });
          }
      }
    }
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 700px;
    height: 480px;
  }
</style>
<style scoped>

</style>
