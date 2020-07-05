<template>
<el-container v-bind:style="{backgroundColor:colordata[index]}" class="main">
  <el-header style="z-index: 10;"><NavMenu></NavMenu></el-header>
  <el-container>
    <el-aside style="width: 200px;z-index: 10"><SideMenu></SideMenu></el-aside>
    <el-main style="z-index: 10;">
      <div  v-for="item in tableData" :key="item.id" style="z-index: 10;">
          <el-card class="box-card" style="z-index: 10;">
            <div slot="header" class="clearfix">
              <el-badge is-dot :hidden="panduan(item.status)" style="float:left;"> </el-badge>
              <span style="float:left;">{{item.typeName}}</span>
              <el-button icon="el-icon-right" style="float: right; border: none" @click="handleDelete(item.id)"></el-button>
              <el-button  style="float: right; border: none" @click="readed(item.id)">已读</el-button>
            </div>
            <div>
              <span style="float:left;font-size: 25px">{{item.notifierName}}
               <span style="margin-left: 15px;font-size: 20px">{{item.typeName}}</span>
                <span style="margin-left: 15px;font-size: 20px">{{item.cardName}}</span>
              </span>
            </div>
          </el-card>
      </div>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
    import NavMenu from "../common/NavMenu";
    import SideMenu from "../common/SideMenu";
    import axios from "axios"
    export default {
      name: "Notice",
      components: {SideMenu, NavMenu},
      data() {
        return {
          index:0,
          colordata:['#FFFFCC','#FFFFFF','#E8E8E8'],
          userId:'',
          idreaded:false,
          currentDate: new Date(),
          tableData: []
        }
      },
      mounted() {
        this.initcolor();
        this.getuserid();
        this.getdata();
      },
      methods: {
        initcolor(){
          var temp = window.sessionStorage;
          this.index=temp.getItem('backcolor');
        },
        getuserid(){
          var temp = window.sessionStorage;
          this.userId=temp.getItem('userId');
        },
        open() {
          this.$message('已删除');
        },
        panduan(l) {
          if(l===0){
            return false;
          }
          else{
            return true;
          }
        },
        handleDelete(id) {
          var that=this;
          axios.get('delNotice', {params: {noticeId: id}}).then(function (res) {
            console.log(res);
            that.open();
            window.location.reload();
          }).catch(function (error) {
            console.log(error);
          });
        },
        readed(id) {
          axios.get(
            'read',
            {
                params: {
                noticeId: id
              }
            }
          ).then(function (res) {
            console.log(res);
            window.location.reload();
          }).catch(function (error) {
            console.log(error);
          });
        },
        getdata() {
          var that = this;
          axios.get("getNotice",
            {
              params: {userId: that.userId }
            })
            .then(function (res) {
              console.log(res);
              that.tableData = res.data.noticeList;
            }).catch(function (error) {
            console.log(error);
          });
        }
      }
    }
</script>
<style>
  .main {
    height: 100%;
    width: 100%;
    position: absolute
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
    margin-left: 200px;
    margin-top: 20px;
    width: 680px;
    height: 130px;
  }
</style>
<style scoped>

</style>
