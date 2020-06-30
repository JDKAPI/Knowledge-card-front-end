<template>
    <el-container>
      <el-header><NavMenu></NavMenu></el-header>
      <el-container>
        <el-aside style="width: 200px"><SideMenu></SideMenu></el-aside>
        <el-main>
          <div style="width: max-content">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1" style="width: 300px" ><a  href="http://localhost:8080/personinfo" class="lianjie">个人信息</a></el-menu-item>
              <el-menu-item index="2" style="width: 300px"><a href="http://localhost:8080/notice" class="lianjie">消息中心</a></el-menu-item>
              <el-menu-item index="3" style="width: 300px"><a href="http://localhost:8080/cardmanager" class="lianjie">知识库</a></el-menu-item>
            </el-menu>
            <h3 class="headline">个人资料</h3>
            <div >
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="headimg">
            </div>
            <div>
              <span class="title">ID: {{person.id}}</span>
            </div>
           <div class="personinfo">
             <ul style="list-style-type: none" >
               <li class="ali">姓名 {{person.name}}</li>
               <li class="ali">邮箱  {{person.mail}}</li>
               <li class="ali">创建时间  {{person.gmtCreate}}</li>
               <li class="ali">修改时间  {{person.gmtModified}}</li>
             </ul>
           </div>
            <div>
              <el-button  class="bianji" @click="dialogFormVisible=true">编辑</el-button>
              <el-dialog title="编辑个人信息" :visible.sync="dialogFormVisible">
                <el-form :model="editperson">
                  <el-form-item label="昵称" :label-width="formLabelWidth">
                    <el-input v-model="editperson.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="editperson.mail" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="editperson.password" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="头像链接" :label-width="formLabelWidth">
                    <el-input v-model="editperson.avatarUrl" autocomplete="off"></el-input>
                  </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="summitedit">确 定</el-button>
                </div>
              </el-dialog>
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

          activeIndex: '1',
          person:
            {
              avatarUrl: "",
              gmtCreate: "",
              gmtModified: "",
              id: "",
              mail: "",
              name: "",
              password: "",
              token: ""
            },
          dialogTableVisible: false,
          dialogFormVisible: false,
          editperson: {
            id: 1,
            name: '',
            mail: '',
            password: '',
            avatarUrl: '',
          },
          formLabelWidth: '120px'
        }
      },
      mounted() {
        this.getinfo();
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        open() {
            this.$alert('修改成功', '', {
              confirmButtonText: '确定',
            });
            window.location.reload();
        },
        shibai(){
          this.$alert('提交失败', '', {
            confirmButtonText: '确定',
          });
        },
        getinfo() {
          var that = this;
          axios.get('getUserInfo', {
            params: {userId: 1}
          }).then(function (res) {
            console.log(res);
            that.person = res.data.userInfo;
          })

        },
        summitedit(){
          var that =this
          axios.post(
            'modifiedUserInfo',
          {
            id:this.editperson.id,
            name:this.editperson.name,
            mail:this.editperson.mail,
            password:this.editperson.password,
            avatarUrl:this.editperson.avatarUrl
          },
            {}
          ).then(
            function (res) {
                 console.log(res);
                 that.open();
              that.dialogFormVisible = false
            }
          ).catch(function (error) {
                console.log(error);
            that.dialogFormVisible = false
          });
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
    top: 280px;
  }
  .ali{
    margin-left: 1px;
    font-size: 20px;
    margin-top: 10px;
    text-align: left;
  }
  .bianji{
    position: absolute;
    left: 400px;
    top: 600px;
  }
  .lianjie{
    text-decoration: none;
    font-size: 15px;
  }
</style>
<style scoped>

</style>
