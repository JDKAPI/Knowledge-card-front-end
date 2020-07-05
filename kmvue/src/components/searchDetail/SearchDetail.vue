<template>
  <el-container v-bind:style="{backgroundColor:colordata[index]}" class="main">
    <el-header style="z-index: 10;"><NavMenu></NavMenu></el-header>
    <el-container>
      <el-aside style="width: 200px;z-index: 10"><SideMenu></SideMenu></el-aside>
      <el-main style="z-index: 10">
        <div class="block">
          <link rel="stylesheet" href="//at.alicdn.com/t/font_1907822_2kqvxepkjap.css">

          <el-timeline style="z-index: 10">
            <div style="margin-bottom: 20px"
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon">
              <el-row>
                <el-col :span="2">
                  <el-avatar :src="timeAvatarSrc" style="margin-top: 64px;"></el-avatar>
                </el-col>
                <el-col :span="18">
                  <el-card>
                    <h4 v-text="activity.title"></h4>
                    <p v-text="activity.cardDescription"></p>
                    <el-divider><i class="el-icon-sunny"></i></el-divider>
                    <el-row style="z-index: 10">
                      <el-col :span="3">
                        <router-link :to="{path: '/cardDetail',query: {cardId: activity.cardId,userId:activity.creatorId}}" >
                          <i class="el-icon-view  icon-size" ></i>
                        </router-link>
                      </el-col>
                      <el-col :span="4" :offset="15" >
                        <span>{{activity.gmtCreate |formatDate}}</span>
                      </el-col>
                    </el-row>

                  </el-card>
                </el-col>
              </el-row>
            </div>
            <div v-if="activities.length==0" class="noData">
              <span>抱歉，没有您搜索的结果</span>
            </div>
          </el-timeline>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>
"SearchDetail"
<script>
    import axios from 'axios'
    import NavMenu from "../common/NavMenu";
    import SideMenu from "../common/SideMenu";
    import Vue from 'vue';
    let vm = new Vue();
    export default {
        name: "SearchDetail",
        components: {SideMenu, NavMenu},
        data() {
            return {
              index:0,
              colordata:['#FFFFCC','#FFFFFF','#E8E8E8'],
                activities: [{
                    cardId: 37,
                    creatorId: 1,
                    gmtCreate: 1593261633875,
                    gmtModified: 1593757683216,
                    isPublic: true,
                    title: "小明爱吃鸡",
                    cardDescription: "Vue.js快速入门课程----站在初学者的角度，重点帮助大伙完成从早期基于Dom开发，到Vue中基于数据开发的编程思路转换",
                    imgSrc: "test",
                    labelName: "test",
                    cardText: "",
                    size: 'large',
                    type: 'primary',
                    icon: "",
                }],
                timeAvatarSrc: "",
            }
        },
        props: {
            ava: {
                type: String,
                default: '我是默认值，可以不定义',
            }
        },
        mounted() {
          this.initcolor();
            this.init();
        },
        methods: {
          initcolor(){
            var temp = window.sessionStorage;
            this.index=temp.getItem('backcolor');
          },
            init() {
                var that = this;
                var search = this.$route.query.context;
                axios.get('search', {
                    params: {context: search },
                    headers: {}
                }).then(
                    function (res) {
                        console.log(res);
                        that.activities = res.data.searchCards;
                    }
                )
                    .catch(error => console.log(error));
                },
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
  .noData{
    height: 500px;
    font-size: 50px;
    display: flex;
    margin-left: 20%;
    align-items: center;
  }
  .main {
    height: 100%;
    width: 100%;
  }
</style>
