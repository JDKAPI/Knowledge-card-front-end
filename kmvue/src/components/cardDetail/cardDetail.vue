<template>
  <el-container v-bind:style="{backgroundColor:colordata[index]}" class="main">
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
                <span v-text="card.cardDescription" style="vertical-align: center;word-wrap: break-word"></span>
                <el-divider></el-divider>
                  <span v-text="card.cardText" style="vertical-align: center;word-wrap: break-word"></span>
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
      <div class="block"  style="width: 500px; height: 500px">
        <el-image :src="card.wordCloud"></el-image>
      </div>
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
              index:0,
              colordata:['#FFFFCC','#FFFFFF','#909090'],
              userId:'',
                card: {
                    cardTitle: '',
                    cardDescription: "",
                    cardText: "",
                    imageSrc: [],
                    labelName: ['标签一', '标签二', '标签三'],
                    creatorAvatarSrc: "",
                    creatorName: "",
                    gmtModified: null,
                    likeNum: null,
                    commentNum:null,
                    collectNum:null,
                    wordCloud:""
                } ,
            }
        },
      mounted() {
          this.initcolor();
          this.getuserid();
            this.init();
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
                        that.card.wordCloud = 'data:image/png;base64,' + res.data.wordCloud;
                        that.creatorAvatarSrc = NavMenu.data().avatarSrc;
                    }
                )
                    .catch(error => console.log(error));
            },
            getWordCloud() {
                var cardId = this.$route.query.cardId;
                var that = this;
                axios.get('wordCloud', {
                    params: {userId: NavMenu.data().userId,
                        cardId:cardId},
                    headers: {}
                }).then(
                    function (res) {
                        var temp=res.data.wordCloud;
                        that.card.wordCloud = 'data:image/png;base64,' + temp;
                        console.log(that.card)
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
  .main {
    height: 100%;
    width: 100%;
    position: absolute
  }
  .box-card {
    width:100%;
    height: auto;
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
