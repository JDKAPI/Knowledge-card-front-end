<template>
  <div >
    <el-row style="height: 840px;">
      <el-tooltip effect="dark" placement="right"
                  v-for="item in cards"
                  :key="item.id">
        <p slot="content" style="width: 300px" class="abstract">{{"上次复习时间："+item.id}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{"卡片创建时间："+item.gmtCreate}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{"id："+item.id}}</p>
        <p slot="content" style="width: 300px" class="abstract">{{"上次复习时间："+item.reviewTime}}</p>
        <p slot="content" style="width: 300px" class="abstract">{{"复习次数："+item.reviewNum}}</p>
        <p slot="content" style="width: 300px" class="abstract">{{"上次修改时间："+item.gmtModified}}</p>
        <p slot="content" style="width: 300px" class="abstract">{{"卡片编号："+item.cardId}}</p>
        <el-card style="width: 180px;margin-bottom: 20px;height: 270px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover">
            <img :src="cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <span>{{item.cardName}}</span>
            </div>
            <div style="margin-top: 15px">
              <el-button icon="el-icon-delete" circle @click="delcard(item)"></el-button>
              <el-button icon="el-icon-edit" circle></el-button>
              <el-button icon="el-icon-view" circle></el-button>
            </div>
          </div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-pagination
        :current-page="1"
        :page-size="10"
        :total="20">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Cards',
    data () {
      return {
        cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
        cards: [
          {
            id:"1",
            cardId:"2",
            reviewTime:"3",
            gmtCreate:"4",
            gmtModified:"5",
            reviewNum:"6",
            userId:"7",
            cardName: "8",
            creatorId:"id"
          }
        ],
        showPrevious: false,
        showFirstPage: false,
        showNext: false,
        showEnd: false,
        currentPage: "1",
        totalPage: "1",
        pages: [
          1
        ]
      }
    },
  mounted() {
      this.init();
  },
    methods:{
      init() {
        var that = this;
       axios.get('getcardlist',{
         params:{page:1,userid:1},
         headers:{}
       }).then(
         function (res) {
            that.cards =res.data.paginationList.data;
         }
       )
       .catch(error=>console.log(error));
      },
      delcard(item){
        axios.get('delcard',{
         params:{
           userId:item.userId,
           cardId:item.cardId,
           creatorId:item.creatorId
         }
        },{})
      .then(function () {
       window.location.reload();
      })
          .catch(error=>console.log(error));
      }
    }
  }
</script>

<style scoped>
  .cover {
    width: 164px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: center;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
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

