<template>
  <div class="index-container">
    <el-row class="banner-container">
      <el-col class="banner-left">
        <index-menu class="menu" />
      </el-col>
      <el-col class="banner-right">
        <index-banner class="banner" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <artistic :preset-data="artisticData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import IndexMenu from '@/components/index/menu.vue'
import IndexBanner from '@/components/index/banner.vue'
import Artistic from '@/components/index/artistic.vue'
export default {
  components: {
    IndexMenu,
    IndexBanner,
    Artistic
  },
  data() {
    return {
      artisticData: null
    }
  },
  async asyncData({ store, app, req }) {
    const { status, data: { count, pois } } = await app.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword: '景点',
        city: store.state.geo.position.city
      }
    })
    if (status === 200 && count > 0) {
      const result = pois.filter(item => item.photos.length).map((item) => {
        return {
          title: item.name,
          pos: item.type.split(';')[0],
          price: item.biz_ext.cost || '暂无',
          img: item.photos[0].url,
          url: '//abc.com',
          type: item.type.split(';')[0]
        }
      })
      return {
        artisticData: {
          kind: 'all',
          list: {
            all: result.slice(0, 9),
            part: [],
            spa: [],
            movie: [],
            travel: []
          }
        }
      }
    } else {
      return {
        artisticData: {
          kind: 'all',
          list: {
            all: [],
            part: [],
            spa: [],
            movie: [],
            travel: []
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixins.scss';
  .index-container {
    .banner-container {
      @include page-center;
      display: flex;
      .banner-left {
        width: 226px;
        .menu {
          position: relative;
          top: -50px;
        }
      }
      .banner-right {
        padding-left: 10px;
        .banner {
          position: relative;
          top: -50px;
        }
      }
    }
  }
</style>
