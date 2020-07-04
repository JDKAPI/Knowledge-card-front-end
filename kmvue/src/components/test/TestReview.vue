<template>


</template>

<script>
    import NavMenu from "../common/NavMenu";
    import SideMenu from "../common/SideMenu";
    import Vue from 'vue';
    let vm = new Vue();
    export default {
        name: "TestReview",
        components: {SideMenu, NavMenu},

        data(){
            return{
                card: {
                    cardTitle: '机器人会梦到电子羊么？',
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
        }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 600px;
    height: 700px;
    margin-top: 63px;
    margin-left: 400px;
    position: relative;

  }
</style>
