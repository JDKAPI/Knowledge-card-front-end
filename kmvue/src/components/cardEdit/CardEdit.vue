<template>
  <el-container >
    <el-header style="z-index: 10;"><NavMenu></NavMenu></el-header>
    <el-container >
      <el-aside  style="width: 200px;z-index: 10"><SideMenu></SideMenu></el-aside>
      <el-main style="z-index: 10;">
        <el-row >
          <el-col :span="13" :offset="2" > <div><el-input :placeholder="card.title" v-model="card.title"><template slot="prepend">标题</template></el-input></div></el-col>
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
              v-model="card.labelName"
              v-for="tag in card.labelName"
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
                :rows="8" v-model="card.cardDescription">
              </el-input>
            </div>
          </el-col>
          <el-col :span="13" :offset="2">
            <div style="margin-top: 10px">
              <el-input
                type="textarea"
                :rows="8"
                placeholder="请输入内容"
                v-model="card.cardText">
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

</template>

<script>
  import NavMenu from "../common/NavMenu";
  import SideMenu from "../common/SideMenu";
import axios from 'axios'
  export default {
        name: "CardEdit",
      data() {
        return {
          card:{
              title: 'Django 简介',
              cardDescription: "Django 是一个由 Python 编写的一个开放源代码的 Web 应用框架。",
              cardText: "使用 Django，只要很少的代码，Python 的程序开发人员就可以轻松地完成一个正式网站所需要" +
                  "的大部分内容，并进一步开发出全功能的 Web 服务 Django 本身基于 MV" +
                  "C 模型，即 Model（模型）+ View（视图）" +
                  "+ Controller（控制器）设计模式，MVC 模式使后续对程序的修改和扩展简化，并且" +
                  "使程序某一部分的重复利用成为可能。",
              labelName: ['标签一', '标签二', '标签三'],
              isPublic:1,
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
          this.init();
      },
      methods: {
          init() {
              var cardId = this.$route.query.cardId;
              var that = this;
              axios.get('getCard', {
                  params: {
                      cardId:cardId},
                  headers: {}
              }).then(
                  function (res) {
                      that.card = res.data.card;
                      console.log(that.card);
                      that.creatorAvatarSrc = NavMenu.data().avatarSrc;
                      that.card.labelName=res.data.card.labelName.split(',');
                  }
              )
                  .catch(error => console.log(error));
          },
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
            var cardId = this.$route.query.cardId;
            axios.post('upCard',
                      {
                          id:cardId,
                        isPublic: this.card.isPublic,
                        title: this.card.title,
                        cardDescription:this.card.cardDescription,
                          cardText:this.card.cardText,
                        labelName:this.card.labelName.toString(),
                        creatorId:NavMenu.data().userId,
                        cardText:"1"
                      },{}
          )
          .then(res => console.log(res))
            .catch(error => console.log(error));
             that.empty();
             that.open();
        },
        handleClose(tag) {
          this.card.labelName.splice(this.card.labelName.indexOf(tag), 1);
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
            this.card.labelName.push(inputValue);
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
