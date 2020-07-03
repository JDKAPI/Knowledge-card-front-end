<template>
    <el-container style="background-color: #FFFFCC;z-index: 10">
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
  .books-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
