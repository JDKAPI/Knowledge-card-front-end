<template>
<el-container>
  <el-header><NavMenu></NavMenu></el-header>
  <el-container>
    <el-aside style="width: 200px"><SideMenu></SideMenu></el-aside>
    <el-main>
      <el-table
        :data="tableData">
        <el-table-column
          prop="notifier"
          label="发送者"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cardName"
          label="卡片名称"
        width="180">
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="类型"
        width="180">
        </el-table-column>
          <el-table-column
            prop="status"
            label="是否已读" width="180">
          </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini">查看详情</el-button>
            <el-button
              size="mini" @click="readed">标记已读</el-button>
            <el-button
              size="mini"
              type="danger"
             @click="handleDelete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      data(){
          return{
            tableData: []
          }
      },
      mounted() {
        this.getdata();
      },
      methods:{
        handleDelete() {
          axios.get('delNotice',{params:{noticeId:1}}).then(function (res) {
                    console.log(res);
            window.location.reload();
          }).catch(function (error) {
                    console.log(error);
          });
        },
        readed() {
          axios.get(
            'read',
            {
              params:{
                noticeId:3
              }
            }
          ).then(function (res) {
                console.log(res);
                window.location.reload();
          }).catch(function (error) {
                  console.log(error);
          });
        },
        getdata(){
          var that = this;
          axios.get("getNotice",
            {
              params:{userId:1}
            })
            .then(function (res) {
                that.tableData=res.data.noticeList;
              for (var i=0;i<that.tableData.length;i++){
                if(that.tableData[i].status===1){
                  that.tableData[i].status="已读";
                }
                else {
                  that.tableData[i].status="未读";
                }
              }
            }).catch(function (error) {
                  console.log(error);
          });
        }
      }
    }
</script>

<style scoped>

</style>
