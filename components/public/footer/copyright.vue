<template>
  <div>
    <div class="footer">
      ©meituan.com  京ICP证070791号  京公网安备11010502025545号
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixins.scss';
  .footer {
    @include page-center;
    text-align: center;
    color: #999;
    padding: 20px 0 30px;
  }
</style>
