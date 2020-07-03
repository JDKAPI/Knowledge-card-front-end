<template>

<div  class="el-menu-vertical-demo" >
  <el-container   @mouseenter.native="collapse(false)" @mouseleave.native="collapse(true)">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
             @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="background-color: rgba(0, 0, 0, 0.4)">
      <el-menu-item index="1">
        <i class="el-icon-edit-outline"></i>
        <span slot="title" ><a href="/index" style="text-decoration: none;font-size: 15px;color: white">返回首页</a></span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-s-claim"></i>
        <span slot="title"><a href="/reviewcard" style="text-decoration: none;font-size: 15px;color: white">复习卡片</a></span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-reading"></i>
        <span slot="title" ><a href="/cardmanager" style="text-decoration: none;font-size: 15px;color: white">知识总览</a></span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-odometer"></i>
        <span slot="title" ><a href="/timeLine" style="text-decoration: none;font-size: 15px;color: white">时间轴</a></span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-house"></i>
        <span slot="title" ><a href="/personinfo" style="text-decoration: none;font-size: 15px;color: white">个人信息</a></span>
      </el-menu-item>
    </el-menu>
  </el-container>

</div>

</template>

<script>
    export default {
        name: "SideMenu",
        data() {
            return {
                isCollapse: true
            };
        },
        methods: {
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          },
          collapse(key) {
            this.isCollapse = key;
          }
        }
    }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
