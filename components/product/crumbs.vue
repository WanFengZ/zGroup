<template>
  <div class="crumbs-wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="crumbs">
      <el-breadcrumb-item :to="{ path: '/' }">{{ $store.state.geo.position.city.replace('市', '') + '美团' }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $store.state.geo.position.city.replace('市', '') + keyword }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Crumbs',
  props: {
    keyword: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .crumbs-wrapper {
    height: 40px;
    .crumbs {
      color: #222;
      font-size: 12px;
      padding-top: 14px;
    }
  }
</style>
