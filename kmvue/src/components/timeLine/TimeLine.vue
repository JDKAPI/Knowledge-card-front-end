<template>
  <el-container style="z-index: 10">
    <el-header style="z-index: 10;"><NavMenu></NavMenu></el-header>
    <el-container>
      <el-aside style="width: 200px;z-index: 10"><SideMenu></SideMenu></el-aside>
      <el-main style="z-index: 10">
        <div class="block">
          <link rel="stylesheet" href="//at.alicdn.com/t/font_1907822_2kqvxepkjap.css">

          <el-timeline style="z-index: 10">
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
                    <el-row style="z-index: 10">
                      <el-col :span="3">
                        <router-link :to="{path: '/cardEdit',query: {cardId: activity.cardId}}" >
                          <i class="el-icon-edit icon-size" ></i>
                        </router-link>
                        <i class="iconfont icon-like icon-size" @click="upLikeNum(index)">
                          <span v-text="activity.likeNum"  style="font-size: 11px;" ></span>
                        </i>
                        <router-link :to="{path: '/cardDetail',query: {cardId: activity.cardId}}" >
                          <i class="el-icon-view  icon-size" ></i>
                        </router-link>
                        <i class="el-icon-delete icon-size" @click="delcard(activity)"></i>
                      </el-col>
                      <el-col :span="4" :offset="15" >
                        <span>{{activity.gmtCreate |formatDate}}</span>
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
                    creatorId: 1,
                    reviewTime: 1593261633875,
                    gmtCreate: 1593261633875,
                    reviewNum: 0,
                    cardName: "小明爱吃鸡",
                    cardDescription: "Vue.js快速入门课程----站在初学者的角度，重点帮助大伙完成从早期基于Dom开发，到Vue中基于数据开发的编程思路转换",
                    size: 'large',
                    type: 'primary',
                    icon: "",
                    timeAvatarSrc: "https://pic3.zhimg.com/80/v2-20b0180ba7944c669edf31bed2a055d3_720w.jpg",
                    likeNum: 4,
                }],
                timeAvatarSrc: "https://pic3.zhimg.com/80/v2-20b0180ba7944c669edf31bed2a055d3_720w.jpg",
            }
        },
        props: {
            ava: {
                type: String,
                default: '我是默认值，可以不定义',
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                var that = this;
                axios.get('timeLine', {
                    params: {userId: NavMenu.data().userId },
                    headers: {}
                }).then(
                    function (res) {
                        console.log(res);
                        that.activities = res.data.timeLineDTOList;
                        that.timeAvatarSrc = NavMenu.data().avatarSrc;
                    }
                )
                    .catch(error => console.log(error));
            },
            delcard(activity) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get('delcard', {
                        params: {
                            userId: NavMenu.data().userId,
                            cardId: activity.cardId,
                            creatorId: activity.creatorId
                        }
                    }, {})
                        .then(function () {
                            window.location.reload();
                        })
                        .catch(error => console.log(error));
                    this.$message({

                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            upLikeNum(index){
                var that=this;
                axios.get('upLikeNum', {
                    params: {userId: NavMenu.data().userId,cardId:that.activities[index].cardId},
                    headers: {}
                }).then(
                    function (res) {
                        console.log(res);
                        var num=res.data.likeNum;
                        console.log(res.likeNum);
                        if(num==0){
                            alert("您还未登录，不能点赞！");
                        }
                        else if(num!==-1){
                            that.activities[index].likeNum+=1;
                        }else {
                            that.activities[index].likeNum-=1;
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
.icon-size{
  font-size: 20px;
}

a{
  color:black;
}

</style>
