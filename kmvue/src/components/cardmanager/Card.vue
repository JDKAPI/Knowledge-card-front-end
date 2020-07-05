<template>
  <el-container v-bind:style="{backgroundColor:colordata[index]}" class="main">
    <div >
      <el-row >
        <el-tooltip effect="dark" placement="right"
                    v-for="item in cards"
                    :key="item.id" style="z-index: 10">
          <p slot="content" style="width: 300px" class="abstract">{{"上次复习时间："+item.id}}</p>
          <p slot="content" style="font-size: 13px;margin-bottom: 6px">
            <span>{{"卡片创建时间："+item.gmtCreate}}</span>
          </p>
          <p slot="content" style="width: 300px" class="abstract">{{"id："+item.id}}</p>
          <p slot="content" style="width: 300px" class="abstract">{{"上次复习时间："+item.reviewTime}}</p>
          <p slot="content" style="width: 300px" class="abstract">{{"最后复习时间："+item.lastReviewTime}}</p>
          <p slot="content" style="width: 300px" class="abstract">{{"复习次数："+item.reviewNum}}</p>
          <p slot="content" style="width: 300px" class="abstract">{{"上次修改时间："+item.gmtModified}}</p>
          <p slot="content" style="width: 300px" class="abstract">{{"卡片编号："+item.cardId}}</p>
          <el-card style="width: 230px;margin-bottom: 20px;float: left;margin-right: 15px; " class="card"
                   bodyStyle="padding:10px" shadow="hover">
            <div style="margin-top: 40px">
              <div class="title">
                <span>{{item.cardName}}</span>
              </div>
              <div class="content">
                <p>{{item.cardDescription}}</p>
              </div>
              <div>
                <el-button icon="el-icon-delete" circle @click="delcard(item)"></el-button>
                <router-link :to="{path: '/cardEdit',query: {cardId: item.cardId}}">
                  <el-button icon="el-icon-edit" circle></el-button>
                </router-link>

                <router-link :to="{path: '/cardDetail',query: {cardId: item.cardId}}">
                  <el-button icon="el-icon-view" circle type="button"></el-button>
                </router-link>
              </div>
            </div>
          </el-card>
        </el-tooltip>
        <el-row style=" position: absolute;left: 450px;top: 500px">
          <el-pagination
            id="xi"
            @next-click="nextpage"
            @prev-click="prevnext"
            @current-change="changepage"
            :current-page=currentPage
            :page-size=1
            :total=totalPage>
          </el-pagination>
        </el-row>
      </el-row>
    </div>
  </el-container>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Cards',
    data() {
      return {
        userid:'',
        index:0,
        colordata:['#FFFFCC','#FFFFFF','#E8E8E8'],
        cards: [
          {
            cardDescription:"",
            id: 1,
            cardId: 2,
            reviewTime: "3",
            gmtCreate: "4",
            gmtModified: "5",
            reviewNum: 5,
            lastReviewTime:"",
            userId: "7",
            cardName: "8",
            creatorId: 1,
          }
        ],
        showPrevious: false,
        showFirstPage: false,
        showNext: false,
        showEnd: false,
        currentPage: 1,
        totalPage: 20,
        pages:[],
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
        this.userid=temp.getItem('userId');
      },
      changepage(val){
        this.currentPage=val;
        this.init();
      },
    nextpage(){
      this.currentPage++;
      this.init();
    },
      prevnext(){
        this.currentPage--;
        this.init();
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
      init() {
        var that = this;
        axios.get('getcardlist', {
          params: {page: this.currentPage, userId: that.userid,size:5},
          headers: {}
        }).then(
          function (res) {
            console.log(res);
            that.cards = res.data.paginationList.data;
            that.currentPage = res.data.paginationList.currentPage;
            that.totalPage = res.data.paginationList.totalPage;
            that.pages=res.data.paginationList.pages;
            that.showPrevious = res.data.paginationList.showPrevious;
            that.showFirstPage = res.data.paginationList.showFirstPage;
            that.showNext = res.data.paginationList.showNext;
            that.showEnd = res.data.paginationList.showEnd;
            for (var i = 0; i < that.cards.length; i++) {
              that.cards[i].reviewTime = that.trans(that.cards[i].reviewTime);
              that.cards[i].gmtCreate = that.trans(that.cards[i].gmtCreate);
              that.cards[i].gmtModified = that.trans(that.cards[i].gmtModified);
              that.cards[i].lastReviewTime = that.trans(that.cards[i].lastReviewTime);
            }
          }
        )
          .catch(function (error) {
            console.log(error);
          });
      },
      delcard(item) {
        axios.get('delcard', {
          params: {
            userId: item.userId,
            cardId: item.cardId,
            creatorId: item.creatorId
          }
        }, {})
          .then(function () {
            window.location.reload();
          })
          .catch(error => console.log(error));
      }
    }
  }
</script>

<style scoped>
  .main{
  height: 100%;
    width: 100%;
    position: absolute;
  }
  .card{
    background-image: url("../../assets/timg.png");
    background-size: 100% 100%;
  }
  .title {
    margin-left: 20px;
    margin-right: 20px;
    height: 30px;
    font-size: 20px;
    color: #FF0033;
    text-align: center;
  }
.content{
  text-align: center;
  margin-left: 22px;
  width: 170px;
  height: 190px;
  font-size: 14px;
  color: #3366FF;
}
  .abstract {
    display: block;
    line-height: 17px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>

