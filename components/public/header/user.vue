<template>
  <div class="user">
    <template v-if="$store.state.user.user">
      欢迎您，<span style="color: #fe8c00">{{ $store.state.user.user.username }}</span>
      <nuxt-link to="/exit" style="margin-left: 10px; color: #999">
        退出
      </nuxt-link>
    </template>
    <template v-else>
      <nuxt-link to="/login">
        立即登录
      </nuxt-link>
      <nuxt-link to="/register" style="margin-left: 10px">
        注册
      </nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      user: ''
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "~@/assets/css/mixins.scss";
  .user {
    height: 100%;
    @include v-center;
  }
</style>
