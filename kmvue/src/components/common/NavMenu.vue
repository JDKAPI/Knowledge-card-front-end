<template xmlns:el-col="http://www.w3.org/1999/html">
  <div  >
    <el-header class="km-nav">
      <el-row style="line-height: 20px">
        <el-col :span="1">
          <h2 class="km-nav-head">知信</h2>
        </el-col>
        <el-col :span="8" :offset="1" style="margin-top: 10px">
          <el-input :placeholder="selectPlaceholder" v-model="input3" class="input-with-select" >
            <el-select v-model="select" slot="prepend" placeholder="请选择" @change="change">
              <el-option label="私有卡池" value="1" ></el-option>
              <el-option label="公共卡池" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" >搜索</el-button>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="12">
          <el-badge :is-dot="is_dot"style="float: left" class="item">
            <el-button icon="el-icon-message-solid" class="item-noti" @click="jumptonotice"></el-button>
          </el-badge>
          <el-button v-if="is_login" class="item" style="float: left" >登录</el-button>
            <el-avatar v-else class="item" :src="avatarSrc"></el-avatar>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
  import touxiang from "../../assets/头像默认.jpg"
    export default {
        name:'NavMenu',
        data() {
            return {
                selectPlaceholder:'请选择卡池，默认私有卡池',
                input1: '',
                input2: '',
                input3: '',
                select: '',
                is_dot:false,
                is_login:false,
                avatarSrc:touxiang,
                userId:1
            }
        },
        methods:{
            change(){
              if (this.select=='1'){
                  this.selectPlaceholder='在私有卡池搜索'
              }else {
                  this.selectPlaceholder='在公有卡池搜索'
              }
            },
          jumptonotice(){
              this.$router.replace({path:'/notice'});
          },
        }
    }
</script>

<style scoped>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .km-nav{
    margin: 0px;
    white-space: nowrap;
    background-color:#545c64;
    text-color:#fff,
  }
  .km-nav-head{
    color: #fff;
    display: inline-block;
    position: relative;
    left: 10px;
    line-height: inherit;
  }
  .item {
    background-color:#545c64 ;
    color:white;
    margin-top: 10px;
    margin-right: 5px;
  }
  .item-noti{
    background-color:#545c64 ;
    color:white;
  }

</style>
