<template>
  <body>
  <el-container >
    <el-header ><NavMenu></NavMenu></el-header>
    <el-container >
      <el-aside  ><SideMenu></SideMenu></el-aside>
      <el-main>
        <el-row >
          <el-col :span="13" :offset="2" > <div><el-input placeholder="请输入内容" v-model="card.headline"><template slot="prepend">标题</template></el-input></div></el-col>
          <el-col :span="13" :offset="2">
            <div style="margin-top: 10px">
              <el-switch
                v-model="card.ispublic"
                active-text="公有"
                inactive-text="私有">
              </el-switch>
            </div>
          </el-col>
          <el-col :span="13" :offset="2"> <div style="margin-top: 10px" >
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

          <el-col :span="13" :offset="2">
            <div style="margin-top: 10px">
              <el-input
                type="textarea"
                :rows="8"
                placeholder="请输入内容"
                v-model="card.content">
              </el-input>
            </div>
          </el-col>
          <el-col :span="13" :offset="2">
            <div style="margin-top: 10px">
              <el-input
                type="textarea"
                :rows="8"
                placeholder="请输入重点"
                v-model="card.zhongdian">
              </el-input>
            </div>
          </el-col>
          <el-col :span="11">
            <div style="margin-top: 10px">
              <el-button type="primary" v-on:click="submit">提交</el-button>
            </div>
          </el-col>
          <el-col  :span="1">
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
            dynamicTags: ['标签一', '标签二', '标签三'],
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
      methods: {
        open() {
          this.$message('提交成功');
        },
          empty(){
            this.card.dynamicTags=['标签一', '标签二', '标签三'],
              this.card.zhongdian="",
              this.card.content="",
              this.card.ispublic=true;
            this.card.headline=""
          },
        submit(){
            var that= this;
            axios.post('addcard',
                      {
                        creatorId:"1",
                        isPublic: this.card.ispublic,
                        title: this.card.headline,
                        cardDescription:this.card.content,
                        imgSrc: this.card.zhongdian,
                        labelName:this.card.dynamicTags.toString(),
                        userId:"1",
                        cardText:"1"
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
