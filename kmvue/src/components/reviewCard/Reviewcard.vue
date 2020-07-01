<template>
   <el-container>
     <el-header><NavMenu></NavMenu></el-header>
     <el-container>
       <el-aside style="width: 200px">
         <SideMenu></SideMenu>
       </el-aside>
       <el-main>
          <div style="margin-left: 200px;margin-right: 380px">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>{{carddata[index].cardName}}</span>
              </div>
              <div>
              <p style="font-size: 15px;float:left;">{{carddata[index].cardDescription}}</p>
            </div>
              <div style="position: absolute;top: 500px;left:430px;border-top:1px solid #999999;width: 700px;text-align: left;font-size: 20px">
                <span>上次复习时间:{{carddata[index].lastReviewTime}}</span>
                <span>创建时间:{{carddata[index].gmtCreate}}<br></span>
                <span>上次修改时间:{{carddata[index].gmtModified}}</span>
                <span>复习时间:{{carddata[index].reviewTime}}</span>
              </div>
            </el-card>
            <el-button style="border: none;font-size: 50px;float: left" @click="tishi">提示</el-button>
            <el-button  style="border: none;font-size: 50px;float: right" @click="yihui">已会</el-button>
          </div>
         <el-dialog title="详细信息" :visible.sync="dialogTableVisible">
           <el-container>
               <el-main>
                 <link rel="stylesheet" href="//at.alicdn.com/t/font_1907822_2kqvxepkjap.css">
                 <div>
                   <span v-text="card.cardTitle" style="font-size: 40px;"></span>
                 </div>
                 <div>
                   <ul class="menu">
                     <li v-text="card.creatorName" class="tou"></li>
                     <li  class="tou">{{this.trans(card.modifiedTime)}}</li>
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
                         <el-image v-for="item in card.imageSrc" :key="item" :src="item">
                         </el-image>
                       </div>
                     </el-card>
                   </el-col>
                 </el-row>
               </el-main>
             </el-container>
         </el-dialog>
       </el-main>
     </el-container>
   </el-container>
</template>

<script>
    import NavMenu from "../common/NavMenu";
    import SideMenu from "../common/SideMenu";
    import axios from 'axios';
    export default {
      name: "Reviewcard",
      components: {SideMenu, NavMenu},
      data() {
        return {
          index: 0,
          card: {
            cardTitle: '',
            cardContent: "",
            cardContent: "",
            imageSrc: ['https://www.runoob.com/wp-content/uploads/2020/05/1589777036-2760-fs1oSv4dOWAwC5yW.png',
              'https://www.runoob.com/wp-content/uploads/2020/05/MTV-Diagram.png'
            ],
            cardLable: [],
            creatorAvatarSrc: "https://pic3.zhimg.com/80/v2-20b0180ba7944c669edf31bed2a055d3_720w.jpg",
            creatorName: "",
            modifiedTime: '',
            collectNumber: 0,
            commentNumber: 0,
            likeNumber: 0
          },
          carddata: [
            {
              cardDescription: '',
              cardId: '',
              cardName: '',
              creatorId: '',
              gmtCreate: '',
              gmtModified: '',
              id: '',
              lastReviewTime: '',
              reviewNum: '',
              reviewTime: '',
              userId: '',
            }
          ],
          dialogTableVisible:false,
        }
      },
      mounted() {
        this.getdata();
      },
      methods: {
        tishi() {
          var that = this;
          axios.get('showknowledgebase', {
            params: {
              knowledgeBaseId: that.carddata[that.index].cardId,
              state: 0,
            }
          }).then(function (res) {
            that.card.cardTitle=res.data.cardTitle;
            that.card.cardContent=res.data.cardContent;
            that.card.cardLable=res.data.cardLable;
            that.card.cardDescription=res.data.cardDescription;
            that.card.collectNumber=res.data.collectNumber;
            that.card.commentNumber=res.data.commentNumber;
            that.card.creatorName=res.data.creatorName;
            that.card.likeNumber=res.data.likeNumber;
            that.card.modifiedTime=res.data.modifiedTime;

            console.log(res)
            that.dialogTableVisible=true;
          }).catch(function (error) {

          });
        },
        yihui() {
          var that = this;
          axios.get('showknowledgebase', {
            params: {
              knowledgeBaseId: that.carddata[that.index].cardId,
              state: 1,
            }
          }).then(function (res) {
            that.index++;
            console.log(res)
          }).catch(
            function (error) {
              console.log(error)
            }
          );
        },
        trans: function (te) {
          if (te === '') {
            return '';
          } else if (te.length === 10) {
            var time = new Date(te * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var y = time.getFullYear();
            var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
            var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
            var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
            var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
            return timedate;
          } else {
            var time = new Date(te);
            var y = time.getFullYear();
            var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
            var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
            var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
            var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
            return timedate;
          }
        },
        getdata() {
          var that = this;
          axios.get('review',
            {
              params: {
                userId: 1
              }
            }
          ).then(function (res) {
            that.carddata = res.data.reviewKnowledgeBases;
            for (var i = 0; i < that.carddata.length; i++) {
              that.carddata[i].reviewTime = that.trans(that.carddata[i].reviewTime);
              that.carddata[i].gmtCreate = that.trans(that.carddata[i].gmtCreate);
              that.carddata[i].gmtModified = that.trans(that.carddata[i].gmtModified);
              that.carddata[i].lastReviewTime = that.trans(that.carddata[i].lastReviewTime);
            }
            console.log(res);

          }).catch(function (error) {
            console.log(error);
          });
        },
        init() {
          var cardId = this.$route.query.cardId;
          var that = this;
          axios.get('showcard', {
            params: {
              userId: 1,
              cardId: cardId
            },
            headers: {}
          }).then(
            function (res) {
              that.card = res.data;
              console.log(that.card);
              that.creatorAvatarSrc = NavMenu.data().avatarSrc;
            }
          )
            .catch(error => console.log(error));
        }
      }
    }

</script>
<style>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 700px;
    height: 480px;
  }
</style>
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
