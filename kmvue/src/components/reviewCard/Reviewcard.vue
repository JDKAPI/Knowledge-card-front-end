<template>
   <el-container style="z-index: 10;background-color: #C5C4A9">
     <el-header style="z-index: 10;"><NavMenu></NavMenu></el-header>
     <el-container>
       <el-aside style="width: 200px;z-index: 10">
         <SideMenu></SideMenu>
       </el-aside>
       <el-main style="z-index: 10">
          <div style="width: 85%;text-align: center;margin: inherit">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix" style="border-bottom: 1px solid #999999;margin-top: 20px">
                <span>{{carddata[index].cardName}}</span>
              </div>
              <div style="height: 330px">
              <p style="font-size: 15px;float:left;">{{carddata[index].cardDescription}}</p>
            </div>
              <div style="border-top:1px solid #999999;width: 100%;text-align: left;font-size: 20px;">
                <span>上次复习时间:{{carddata[index].lastReviewTime}}</span>
                <span>创建时间:{{carddata[index].gmtCreate}}<br></span>
                <span>上次修改时间:{{carddata[index].gmtModified}}</span>
                <span>复习时间:{{carddata[index].reviewTime}}</span>
              </div>
            </el-card>
            <el-button style="font-size: 50px;background-color:  #C5C4A9;float: left" @click="tips">提示</el-button>
            <el-button  style="font-size: 50px;background-color:  #C5C4A9;float: right" @click="yihui">已会</el-button>
          </div>

            <el-dialog title="详细信息" :visible.sync="dialogTableVisible">
              <p style="font-size: 15px;float:left;">{{this.card.cardContent}}</p>
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
          userid:'',
          index: 0,
          card: {
            cardTitle: '',
            cardContent: "",
            cardLable: [],
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
        this.getuserid();
        this.getdata();
      },
      methods: {
        getuserid(){
          var temp = window.sessionStorage;
          this.userid=temp.getItem('userId');
        },
        tips() {
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
          }
          // else if (te.length === 10) {
          //   var time = new Date(te * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          //   var y = time.getFullYear();
          //   var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
          //   var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
          //   var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
          //   var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
          //   var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
          //   var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
          //   return timedate;
          // }
          else {
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
                userId: that.userid
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
              userId: that.userid,
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
    background-image: url("../../assets/reviewback.png");
    background-size: 100% 100%;
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
