<template>
  <div class="geo">
    <div class="geo__body">
      <i class="el-icon-location-outline"></i>
      {{ city }}
    </div>
    <nuxt-link
      class="geo__button"
      to="/changeCity"
    >
      切换城市
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Geo',
  computed: {
    city() {
      const position = this.$store.state.geo.position
      return position && position.city ? position.city : '定位失败'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/mixins.scss";
  .geo {
    @include v-center;
    height: 100%;
    .geo__button {
      margin-left: 15px;
    }
  }
</style>
