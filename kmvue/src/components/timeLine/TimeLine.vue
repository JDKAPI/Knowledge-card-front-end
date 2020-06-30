<template>
  <el-container>
    <el-header><NavMenu></NavMenu></el-header>
    <el-container>
      <el-aside style="width: 200px"><SideMenu></SideMenu></el-aside>
      <el-main>
        <div class="block">
          <link rel="stylesheet" href="//at.alicdn.com/t/font_1907822_2kqvxepkjap.css">

          <el-timeline>
            <el-timeline-item
                              v-for="(activity, index) in activities"
                              :key="index"
                              :icon="activity.icon">
              <el-row>
                <el-col :span="2">
                  <el-avatar :src="timeAvatarSrc" style="margin-top: 64px;"></el-avatar>
                </el-col>
                <el-col :span="18">
                  <el-card>
                    <h4 v-text="activity.cardName"></h4>
                    <p v-text="activity.cardDescription"></p>
                    <el-divider><i class="el-icon-sunny"></i></el-divider>
                    <el-row>
                      <el-col :span="3">
                        <i class="el-icon-edit icon-size" ></i>
                        <i class="iconfont icon-like icon-size" >
                          <span v-text="activity.likeNum" style="font-size: 11px;" ></span>
                        </i>
<!--                          <span v-text="activity.likeNum"  style="font-size: 11px;" ></span>-->
<!--                        </i>-->
                        <i class="el-icon-delete icon-size" @click="delcard(activity)"></i>
                      </el-col>
                      <el-col :span="4" :offset="15" >
                        <span>{{activity.gmtCreate | formatDate}}</span>
                      </el-col>
                    </el-row>

                  </el-card>
                </el-col>
              </el-row>
            </el-timeline-item>
          </el-timeline>
        </div>

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
        name: "timeLine",
        components: {SideMenu, NavMenu},
        data() {
            return {
                activities: [{
                    cardId: 37,
                    creatorId:1,
                    reviewTime: 1593261633875,
                    gmtCreate: 1593261633875,
                    reviewNum: 0,
                    cardName: "小明爱吃鸡",
                    cardDescription: "Vue.js快速入门课程----站在初学者的角度，重点帮助大伙完成从早期基于Dom开发，到Vue中基于数据开发的编程思路转换",
                    size: 'large',
                    type: 'primary',
                    icon:"",
                    timeAvatarSrc:"https://pic3.zhimg.com/80/v2-20b0180ba7944c669edf31bed2a055d3_720w.jpg",
                    likeNum:4,
                }],
                timeAvatarSrc:"https://pic3.zhimg.com/80/v2-20b0180ba7944c669edf31bed2a055d3_720w.jpg",
            }
        },
        props:{
            ava:{
                type:String,
                default:'我是默认值，可以不定义',
             }
        },
        mounted() {
            this.init();
        },
        methods:{
            init() {
                var that = this;
                axios.get('timeLine',{
                    params:{userId:1},
                    headers:{}
                }).then(
                    function (res) {
                        console.log(res);
                        that.activities =res.data.timeLineDTOList;
                        that.timeAvatarSrc = NavMenu.data().avatarSrc;
                    }
                )
                    .catch(error=>console.log(error));
            },
            delcard(activity){
                axios.get('delcard',{
                    params:{
                        userId:NavMenu.data().userId,
                        cardId:activity.cardId,
                        creatorId:activity.creatorId
                    }
                },{})
                    .then(function () {
                        window.location.reload();
                    })
                    .catch(error=>console.log(error));
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
            }
        },
    }
</script>

<style scoped>
.icon-size{
  font-size: 20px;
}
</style>
