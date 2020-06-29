<template>
<el-button @click="trans">diandiandian</el-button>
</template>

<script>
  export default {
    data() {
      return {
        te: 1516703495241
      };
    },
    methods:{
      trans:function () {
        if(this.te === ''){
          console.log('');
          return '';
        }else if(this.te.length === 10){
          var time = new Date(this.te * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var y = time.getFullYear();
          var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
          var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
          var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
          var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
          var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
          var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
          console.log(timedate);
          return timedate;
        }else{
          var time = new Date(this.te);
          var y = time.getFullYear();
          var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
          var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
          var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
          var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
          var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
          var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
          console.log(timedate);
          return timedate;
        }
      }
    }
  }
</script>

<style scoped>

</style>
