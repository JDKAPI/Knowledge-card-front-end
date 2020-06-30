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
               <li>姓名 {{person.name}}</li>
               <li>邮箱  {{person.mail}}</li>
             </ul>
           </div>
            <div>
              <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          formLabelWidth: '120px'
        }
      },
      mounted() {
        this.getinfo();
      },
      methods: {
        getinfo() {
          var that = this;
          axios.get('getUserInfo', {
            params: {userId: 1}
          }).then(function (res) {
            console.log(res);
            that.person = res.data.userInfo;
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
  li{
    font-size: 20px;
    margin-top: 20px;
  }
</style>
<style scoped>

</style>
