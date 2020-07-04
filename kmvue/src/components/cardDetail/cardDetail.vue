<template>
  <el-container >
    <el-header style="z-index: 10;"><NavMenu></NavMenu></el-header>
    <el-container>
      <el-aside style="width: 200px;z-index: 10"><SideMenu></SideMenu></el-aside>
      <el-main  style="z-index: 10;">
        <link rel="stylesheet" href="//at.alicdn.com/t/font_1907822_2kqvxepkjap.css">
        <div>
          <span v-text="card.cardTitle" style="font-size: 60px;"></span>
        </div>
        <div>
        <ul class="menu">
          <li v-text="card.creatorName" class="tou"></li>
          <li  class="tou">{{card.gmtModified|formatDate}}</li>
        </ul>
        </div>
        <el-row>
          <el-col :span="16" :offset="4" >
            <el-card class="box-card" style="margin: initial">
                <span v-text="card.cardDescription" style="vertical-align: center"></span>
                <el-divider></el-divider>
                  <span v-text="card.cardText" style="vertical-align: center"></span>
                <el-divider><i class="el-icon-sunny"></i></el-divider>
                <el-image v-for="item in card.imageSrc" :key="item" :src="item">
                </el-image>
              <div>
                <el-row style="margin-left: 45px" >
                  <el-badge :value="card.commentNum" :max="99" class="badgeItem">
                  <el-button type="success" icon="el-icon-s-comment" circle></el-button>
                  </el-badge>
                  <el-badge :value="card.collectNum" :max="99" class="badgeItem">
                  <el-button type="warning" icon="el-icon-star-off" circle @click="upCollect"></el-button>
                  </el-badge>
                  <el-badge :value="card.likeNum" :max="99" class="badgeItem">
                    <el-button type="danger" icon="iconfont icon-like icon-size" circle @click="upLikeNum"></el-button>
                  </el-badge>
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
        data() {
            return {
              userId:'',
                card: {
                    cardTitle: 'Django 简介',
                    cardDescription: "Django 是一个由 Python 编写的一个开放源代码的 Web 应用框架。",
                    cardText: "使用 Django，只要很少的代码，Python 的程序开发人员就可以轻松地完成一个正式网站所需要" +
                        "的大部分内容，并进一步开发出全功能的 Web 服务 Django 本身基于 MV" +
                        "C 模型，即 Model（模型）+ View（视图）" +
                        "+ Controller（控制器）设计模式，MVC 模式使后续对程序的修改和扩展简化，并且" +
                        "使程序某一部分的重复利用成为可能。",
                    imageSrc: ['https://www.runoob.com/wp-content/uploads/2020/05/1589777036-2760-fs1oSv4dOWAwC5yW.png',
                        'https://www.runoob.com/wp-content/uploads/2020/05/MTV-Diagram.png'
                    ],
                    labelName: ['标签一', '标签二', '标签三'],
                    creatorAvatarSrc: "https://pic3.zhimg.com/80/v2-20b0180ba7944c669edf31bed2a055d3_720w.jpg",
                    creatorName: "小明",
                    gmtModified: 1593261633875,
                    likeNum: 11,
                    commentNum:11,
                    collectNum:11
                } ,
            }
        },
        mounted() {
          this.getuserid();
            this.init();
        },
        methods: {
          getuserid(){
            var temp = window.sessionStorage;
            this.userId=temp.getItem('userId');
          },
            init() {
                var cardId = this.$route.query.cardId;
                var that = this;
                axios.get('showcard', {
                    params: {userId: NavMenu.data().userId,
                    cardId:cardId},
                    headers: {}
                }).then(
                    function (res) {
                        that.card = res.data;
                        console.log(that.card);
                        that.creatorAvatarSrc = NavMenu.data().avatarSrc;
                    }
                )
                    .catch(error => console.log(error));
            },
            upLikeNum(){
                var that=this;
                var cardId = this.$route.query.cardId;
                axios.get('upLikeNum', {
                    params: {userId: that.userId,cardId:cardId},
                    headers: {}
                }).then(
                    function (res) {
                        var num=res.data.likeNum;
                        if(num!==-1){
                            that.card.likeNum+=1;
                        }else {
                            that.card.likeNum-=1;
                        }
                    }
                )
                    .catch(error => console.log(error));
            },
            upCollect(){
                var that=this;
                var cardId = this.$route.query.cardId;
                axios.get('upCollect', {
                    params: {userId: that.userId,cardId:cardId},
                    headers: {}
                }).then(
                    function (res) {
                        var num=res.data.collectNum;
                        console.log(res.data.collectNum);
                        if(num==0){
                          alert("您是卡片创造者，无需收藏");
                        } else if(num!==-1){
                            that.card.collectNum+=1;
                        }else {
                            that.card.collectNum-=1;
                        }
                    }
                )
                    .catch(error => console.log(error));
            }
        },
        filters: {
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            },
        },

    }
</script>

<style scoped>

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
  .badgeItem {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
