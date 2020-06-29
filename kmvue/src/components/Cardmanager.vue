<template>
    <el-container>
      <el-header><NavMenu></NavMenu></el-header>
      <el-container>
        <el-aside style="width: 200px"><SideMenu></SideMenu></el-aside>
        <el-main>
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
