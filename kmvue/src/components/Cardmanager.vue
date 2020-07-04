<template>
    <el-container style="background-color: #E0DEE3;height: 100%;width: 100%;position: absolute">
      <el-header style="z-index: 10;"><NavMenu></NavMenu></el-header>
      <el-container>
        <el-aside style="width: 200px;z-index: 10"><SideMenu></SideMenu></el-aside>
        <el-main style="z-index: 10;">
          <Card ></Card>
        </el-main>
      </el-container>


    </el-container>
</template>

<script>
  import NavMenu from "./common/NavMenu";
  import SideMenu from "./common/SideMenu";
  import Card from "./cardmanager/Card";
    export default {
        name: "Cardmanager",
      components: {Card, SideMenu, NavMenu}
    }
</script>

<style scoped>
</style>
