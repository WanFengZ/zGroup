<template>
  <el-container>
    <el-header>
      <common-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
      <common-footer-menu />
      <common-footer />
    </el-footer>
  </el-container>
</template>

<script>
import CommonHeader from '@/components/public/header/index.vue'
import CommonFooterMenu from '@/components/public/footer/menu.vue'
import CommonFooter from '@/components/public/footer/copyright.vue'
export default {
  components: {
    CommonHeader,
    CommonFooterMenu,
    CommonFooter
  }
}
</script>
