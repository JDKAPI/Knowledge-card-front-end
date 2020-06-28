<template>
  <el-container>
    <el-header><NavMenu></NavMenu></el-header>
    <el-container>
      <el-aside style="width: 200px"><SideMenu></SideMenu></el-aside>
      <el-main>
        <link rel="stylesheet" href="//at.alicdn.com/t/font_1907822_2kqvxepkjap.css">
        <div>
          <span v-text="card.title" style="font-size: 60px"></span>
        </div>
        <div>
        <ul class="menu">
          <li v-text="card.creatorName" class="tou"></li>
          <li v-text="card.gmtCreate" class="tou"></li>
        </ul>
        </div>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-card class="box-card">

              <div>
                  <span v-text="card.cardDescription"></span>
                <el-divider></el-divider>
                  <span v-text="card.cardText"></span>
                <el-divider><i class="el-icon-sunny"></i></el-divider>
                <el-image v-for="item in card.imageSrc" :src="item">
                </el-image>
              </div>
              <div>
                <el-row>
                  <el-button icon="el-icon-search" circle></el-button>
                  <el-button type="primary" icon="el-icon-edit" circle></el-button>
                  <el-button type="success" icon="el-icon-s-comment" circle></el-button>
                  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
                  <el-button type="danger" icon="iconfont icon-like icon-size" circle></el-button>
                </el-row>

              </div>

            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    import axios from 'axios'
    import NavMenu from "../common/NavMenu";
    import SideMenu from "../common/SideMenu";
    import Vue from 'vue';
    let vm = new Vue();
    export default {
        name: "cardDetail",
        components: {SideMenu, NavMenu},
        data(){
            return{
                card: {
                    title: 'Django 简介',
                    gmtCreate: "2019.1.1",
                    cardDescription: "Django 是一个由 Python 编写的一个开放源代码的 Web 应用框架。",
                    cardText: "使用 Django，只要很少的代码，Python 的程序开发人员就可以轻松地完成一个正式网站所需要" +
                        "的大部分内容，并进一步开发出全功能的 Web 服务 Django 本身基于 MV" +
                        "C 模型，即 Model（模型）+ View（视图）" +
                        "+ Controller（控制器）设计模式，MVC 模式使后续对程序的修改和扩展简化，并且" +
                        "使程序某一部分的重复利用成为可能。",
                    imageSrc: ["https://www.runoob.com/wp-content/uploads/2020/05/1589777036-2760-fs1oSv4dOWAwC5yW.png",
                        "https://www.runoob.com/wp-content/uploads/2020/05/MTV-Diagram.png"
                    ],
                    labelName: ['标签一', '标签二', '标签三'],
                    creatorAvatarSrc: "https://pic3.zhimg.com/80/v2-20b0180ba7944c669edf31bed2a055d3_720w.jpg",
                    creatorName: "小明",
                }
            }

        }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width:100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .tou{
    list-style-type: none;
    color: #a6a9ad;
  }

</style>
