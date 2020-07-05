<template>
  <body id="poster" style="z-index: 10">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item >
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-row>
        <el-button type="primary" v-on:click="Login">登录</el-button>
        <el-button onclick="window.location.href = '/register'">注册</el-button>
        <el-button >忘记密码</el-button>
        </el-row>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
import axios from 'axios'
    export default {
        name: 'Login',
        data () {
            return {
                loginForm: {
                    username: 'test@163.com',
                    password: '123456'
                },
                responseResult: []
            }
        },
        methods: {
            Login () {
              var that = this;
                axios.post('/login', {
                    },{params:{
                    userMail: this.loginForm.username,
                    userPassword: this.loginForm.password
                  }})
                    .then(function (res) {
                       var storage = window.sessionStorage;
                      storage.setItem('userId',res.data.state);
                      that.$store.commit('login',res.data.state);
                      var path = that.$route.query.redirect;
                      that.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                      }
                    )
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        }
    }
</script>

<style>
  #poster {
    background:url("../assets/two.gif") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    z-index: 10;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>

