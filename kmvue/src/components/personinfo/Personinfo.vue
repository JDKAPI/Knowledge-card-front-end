<template>
    <el-container v-bind:style="{backgroundColor:colordata[index]}" class="main">
      <el-header style="z-index: 10;"><NavMenu></NavMenu></el-header>
      <el-container>
        <el-aside style="width: 200px;z-index: 10"><SideMenu></SideMenu></el-aside>
        <el-main style="z-index: 10">
          <div style="width: max-content">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1" style="width: 300px" ><a  href="/personinfo" class="lianjie">个人信息</a></el-menu-item>
              <el-menu-item index="2" style="width: 300px"><a href="/notice" class="lianjie">消息中心</a></el-menu-item>
              <el-menu-item index="3" style="width: 300px"><a href="/cardmanager" class="lianjie">知识库</a></el-menu-item>
            </el-menu>
            <div>
              <div>
                <el-image :src="person.avatarUrl" class="headimg"></el-image>
              </div>
              <div style="margin-left: 130px;">
                <ul style="list-style-type: none;width: 100%" >
                    <li class="ali">姓名
                      <span style="margin-left: 250px">{{person.name}}</span>
                    </li>
                  <hr>
                  <li class="ali">邮箱
                    <span style="margin-left: 250px">{{person.mail}}</span>
                  </li> <hr>
                  <li class="ali">创建时间
                    <span style="margin-left: 210px">{{this.trans(person.gmtModified)}}</span>
                  </li> <hr>
                  <li class="ali">修改时间
                    <span style="margin-left: 210px">{{this.trans(person.gmtCreate)}}</span>
                  </li> <hr>
                </ul>
              </div>
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
                    <el-input show-password v-model="editperson.password" autocomplete="off"></el-input>
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
  import img from "../../assets/头像默认.jpg"
    export default {
      name: "Personinfo",
      components: {SideMenu, NavMenu},
      data() {
        return {
          index:0,
          colordata:['#FFFFCC','#FFFFFF','#E8E8E8'],
          userId:'',
          activeIndex: '1',
          person:
            {
              avatarUrl: img,
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
            id: '',
            name: '',
            mail: '',
            password: '',
            avatarUrl: '',
          },
          formLabelWidth: '120px'
        }
      },
      mounted() {
        this.initcolor();
        this.getuserid();
        this.getinfo();

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
        trans: function (te) {
          if (te === '') {
            return '';
          }
          // else if (te.length === 10) {
          //   var time = new Date(te * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          //   var y = time.getFullYear();
          //   var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
          //   var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
          //   var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
          //   var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
          //   var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
          //   var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
          //   return timedate;
          // }
          else {
            var time = new Date(te);
            var y = time.getFullYear();
            var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
            var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
            var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
            var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
            return timedate;
          }
        },
        getinfo() {
          var that = this;
          axios.get('getUserInfo', {
            params: {userId: that.userId}
          }).then(function (res) {
            console.log(res);
            that.person = res.data.userInfo;
            if(that.person.avatarUrl!==""){
              var temp = window.sessionStorage;
              temp.setItem('headimg',that.person.avatarUrl);
            }
            else{
              that.person.avatarUrl=img;
            }
          })

        },
        summitedit(){
          var that =this;
          axios.post(
            'modifiedUserInfo',
          {
            id:that.userId,
            name:this.editperson.name,
            mail:this.editperson.mail,
            password:this.editperson.password,
            avatarUrl:this.editperson.avatarUrl
          },
            {}
          ).then(
            function (res) {
              var temp = window.sessionStorage;
              temp.setItem('headimg',that.person.avatarUrl);
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
  .main {
    height: 100%;
    width: 100%;
    position: absolute
  }
     .headimg {
       float: left;
        width: 100px;
       height: 100px;
       border-radius: 150px;
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
    z-index: 100;
  }
  .lianjie{
    text-decoration: none;
    font-size: 15px;
  }
</style>
<style scoped>

</style>
