<template>
  <body class="beijing" style="height: 700px">
  <el-container>
    <el-header style="z-index: 10;"><NavMenu></NavMenu></el-header>
    <el-container >
      <el-aside style="width: 200px;z-index: 10"><SideMenu></SideMenu></el-aside>
      <el-main style="margin-right: 200px;background-color: rgba(0, 0, 0, 0.5);z-index: 10">
        <el-row >
          <el-col :span="13" :offset="5" > <div><el-input placeholder="请输入内容" v-model="card.headline"><template slot="prepend">标题</template></el-input></div></el-col>
          <el-col :span="13" :offset="5">
            <div style="margin-top: 10px">
              <el-switch
                v-model="card.ispublic"
                active-text="公有"
                inactive-text="私有">
              </el-switch>
            </div>
          </el-col>
          <el-col :span="13" :offset="5"> <div style="margin-top: 10px" >
            <el-tag
              :key="tag"
              v-model="card.dynamicTags"
              v-for="tag in card.dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div></el-col>

          <el-col :span="13" :offset="5">
            <div style="margin-top: 10px">
              <el-input
                type="textarea"
                :rows="8"
                placeholder="请输入概述"
                v-model="card.zhongdian">
              </el-input>
            </div>
          </el-col>
          <el-col :span="13" :offset="5">
            <div style="margin-top: 10px">
              <el-input
                type="textarea"
                :rows="8"
                placeholder="请输入内容"
                v-model="card.content">
              </el-input>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div style="margin-top: 10px">
              <el-button type="primary" v-on:click="submit">提交</el-button>
            </div>
          </el-col>
          <el-col  :span="1" :offset="2">
            <div style="margin-top: 10px">
              <el-button type="primary">取消</el-button>
            </div>
          </el-col>

        </el-row>
      </el-main>
    </el-container>

  </el-container>
  </body>
</template>

<script>

  import NavMenu from './common/NavMenu'
  import SideMenu from './common/SideMenu'
  import {stars_nest} from "./stars_nest";
  import {} from  "./canvas-nest"
  import axios from 'axios'
  export default {
        name: "Home",
      data() {
        return {
          card:{
            headline: '',
            ispublic: true,
            content:'',
            zhongdian:'',
            dynamicTags: [],
          },
          inputVisible: false,
          inputValue: '',
          options: [{
            value: '选项1',
            label: '公共'
          }, {
            value: '选项2',
            label: '私有'
          },],
          value: ''
        };
      },
    mounted() {
          stars_nest()
    },
    methods: {
        open() {
          this.$message('提交成功');
        },
          empty(){
            this.card.dynamicTags=[],
              this.card.zhongdian="",
              this.card.content="",
              this.card.ispublic=true;
            this.card.headline=""
          },
        submit(){
            var that= this;
            axios.post('addcard',
                      {
                        creatorId:NavMenu.data().userId,
                        isPublic: this.card.ispublic,
                        title: this.card.headline,
                        cardDescription:this.card.zhongdian,
                        cardText:this.card.content,
                        imgSrc: "111",
                        labelName:this.card.dynamicTags.toString(),
                        userId:NavMenu.data().userId,
                      },{}
          )
          .then(res => console.log(res))
            .catch(error => console.log(error));
             that.empty();
             that.open();
        },
        handleClose(tag) {
          this.card.dynamicTags.splice(this.card.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },

        handleInputConfirm() {
          let inputValue = this.inputValue;
          if (inputValue) {
            this.card.dynamicTags.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        }
      },
        components:{NavMenu,SideMenu}
    }
</script>
<style>
  .beijing {
    background-image: url("../assets/18.jpg");
    background-repeat: no-repeat;
    background-position: left top;
    background-size: 100% 100%;
    z-index: -1;
  }

  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
