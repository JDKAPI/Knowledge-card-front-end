
<template>
  <body id="poster" style="z-index: 10">
  <el-form :model="registerForm" :rules="rules" ref="registerForm"  label-position="left" label-width="100px" class="login-container">
    <el-form-item   label="用户名" prop="usename">
      <el-input placeholder="请输入用户名" v-model="registerForm.usename"></el-input>
    </el-form-item>
    <el-form-item  label="密码" prop="password">
      <el-input show-password placeholder="请输入密码" v-model="registerForm.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmpassword">
      <el-input show-password placeholder="请再次输入密码"  v-model="registerForm.confirmpassword"></el-input>
    </el-form-item>
    <el-form-item  label="邮箱" prop="email">
      <el-input placeholder="请输入email" v-model="registerForm.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-row>
        <el-button onclick="window.location.href ='/login'">返回登录</el-button>
        <el-button type="primary"   v-on:click="register" >立即创建</el-button>
      </el-row>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
  export default {
    name:'Register',
    data() {

      var check_confirmpassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'))
          }
        }, 100)
      }
      return {
        registerForm: {
          id:'',
          usename: '',
          password: '',
          confirmpassword: '',
          email: ''
        },
        rules: {
          usename: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 8, message: '长度6~8，不能有特殊字符如&|', trigger: 'blur' }
          ],
          confirmpassword: [
            {validator: check_confirmpassword, trigger: 'blur' },
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { min: 6, max: 8, message: '长度6~8，不能有特殊字符如&|', trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      open() {
        this.$alert('修改成功', '', {
          confirmButtonText: '确定',
        });
        window.location.reload();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      register () {
        var that = this;
        this.$axios
          .post('/register', {
            name: this.registerForm.usename,
            token:'',
            gmtCreate:'',
            gmtModified:'',
            mail: this.registerForm.email,
            password: this.registerForm.password,
            avatarUrl:'',
          })
          .then(function (res) {
            console.log(res);
            that.open();
          })
          .catch(function (errro) {

          });
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
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
