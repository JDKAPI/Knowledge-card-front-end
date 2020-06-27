<template>
    <el-container>
      <el-header><NavMenu></NavMenu></el-header>
      <el-container>
        <el-aside style="width: 200px"><SideMenu></SideMenu></el-aside>
        <el-main>
          <div style="width: max-content">
            <h3 class="headline">个人资料</h3>
            <div >
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="headimg">
            </div>
            <div>
              <span class="title">ID: {{person.id}}</span>
            </div>
           <div class="personinfo">
             <ul style="list-style-type: none">
               <li class="ali">姓名  {{person.name}}</li>
               <li class="ali">关注次数  {{person.noticeNum}}</li>
             </ul>
           </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
  import axios from 'axios'
  import NavMenu from "../common/NavMenu";
  import SideMenu from "../common/SideMenu";
    export default {
      name: "Personinfo",
      components: {SideMenu, NavMenu},
      data() {
        return {
          person: {
            id: "001",
            name:"",
            imgsrc:'',
            noticeNum:'',
          }
        }
      },
      mounted() {
        this.getinfo();
      },
      methods:{
        getinfo(){
          var that = this;
         axios.get('personPage',{
           params:{userId:1},headers:{}
         }).then(function (res) {
              console.log(res);
              that.person=res.data.peronPageInfo;
         }).catch(function (error) {
              console.log(error);
         })
        }
      }
    }
</script>
<style>
     .headimg {
       float: left;
        width: 100px;
       height: 100px;
     }
  .title{
    float: left;
    font-size: 20px;
    color: #999999;
    margin-left: 30px;
    margin-top: 9px;
  }
  .headline{
    float:left;
    font-size: 20px;
    height: 50px;
    width:1200px;
    line-height: 60px;
    border-bottom: 1px solid #e0e0e0;
  }
  .personinfo{
    position: absolute;
    left: 320px;
    top: 220px;
  }
  .ali{
    width: 1200px;
    text-align: left;
    font-size: 20px;
    margin-top: 30px;
    border-bottom: 1px solid #999999;
  }
</style>
<style scoped>

</style>
