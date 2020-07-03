<template>
<el-container style="z-index: 10">
  <el-header style="z-index: 10;"><NavMenu></NavMenu></el-header>
  <el-container>
    <el-aside style="width: 200px;z-index: 10"><SideMenu></SideMenu></el-aside>
    <el-main>
      <div  v-for="item in tableData"
            :key="item.id">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-badge is-dot :hidden="panduan(item.status)" style="float:left;"> </el-badge>
              <span style="float:left;">{{item.typeName}}</span>
              <el-button icon="el-icon-right" style="float: right; border: none" @click="handleDelete(item.id)"></el-button>
              <el-button  style="float: right; border: none" @click="readed(item.id)">已读</el-button>
            </div>
            <div>
              <span style="float:left;">{{item.notifier}}{{item.typeName}}</span>
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
          idreaded:false,
          currentDate: new Date(),
          tableData: []
        }
      },
      mounted() {
        this.getdata();
      },
      methods: {
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
              params: {userId: NavMenu.data().userId }
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
