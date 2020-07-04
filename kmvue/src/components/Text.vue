<template>
  <div id="baseReport" style="z-index: 1000;" >
<!--    <remote-css href="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap-grid.min.css"></remote-css>-->
<!--    <remote-css href="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap-reboot.css"></remote-css>-->
<!--    <remote-css href="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap.css"></remote-css>-->
    <remote-js src="http://chabudai.sakura.ne.jp/blogparts/honehoneclock/honehone_clock_tr.js"></remote-js>
    <remote-js src=""></remote-js>

  </div>
</template>
<script>

  export default {
    components:{
      'remote-css': {
        render(createElement) {
          return createElement('link', { attrs: { rel: 'stylesheet', href: this.href }});
        },
        props: {
          href: { type: String, required: true },
        },
      },
      'remote-js': {
        render(createElement) {
          return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
        },
        props: {
          src: { type: String, required: true },
        },
      },
    },
    name: "baseReport",
    data() {
      return {
      }
    },
    mounted(){

    },
    methods:{

    }
  };
</script>

<style scoped>
</style>
