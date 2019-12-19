<template>
  <el-row
    class="header-top-bar"
  >
    <el-col :span="8" class="header-bar-item">
      <geo />
    </el-col>
    <el-col :span="6" class="header-bar-item">
      <user />
    </el-col>
    <el-col :span="10" class="header-bar-item">
      <top-nav />
    </el-col>
  </el-row>
</template>

<script>
import Geo from './geo.vue'
import User from './user.vue'
import TopNav from './nav.vue'
export default {
  name: 'TopBar',
  components: {
    Geo,
    User,
    TopNav
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/mixins.scss";
  @import "~@/assets/css/variables.scss";
  .header-top-bar {
    @include page-center;
    height: $headerBarHeight;
    font-size: $headerBarFontsize;
    color: #999;
    @include v-center;
    .header-bar-item {
      height: 100%;
    }
  }
</style>
