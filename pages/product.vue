<template>
  <div class="products">
    <article>
      <section>
        <crumbs :keyword="keyword" />
      </section>
      <section>
        <product-category :types="types" :areas="areas" @handleFilterProduct="handleFilter" />
      </section>
      <section>
        <product-list :products="products" @handleToMap="handleToMap" @handleSort="handleSort" />
      </section>
    </article>
    <aside>
      <amap ref="map" :center="center" :pois="mapPois" />
    </aside>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import Crumbs from '@/components/product/crumbs.vue'
import ProductCategory from '@/components/product/productcategory.vue'
import ProductList from '@/components/product/productList.vue'
import Amap from '@/components/public/amap.vue'
import { formatProductAddress } from '@/assets/js/utils'
export default {
  components: {
    Crumbs,
    ProductCategory,
    ProductList,
    Amap
  },
  data() {
    return {
      keyword: '',
      center: [],
      originalProducts: [],
      areas: [],
      types: [],
      sortMode: '',
      sortOption: false,
      typeFilter: '',
      areaFilter: ''
    }
  },
  computed: {
    mapPois() {
      return this.products.map((item, index) => {
        return {
          id: item.id,
          name: item.name,
          position: item.location,
          index
        }
      })
    },
    products() {
      let temp = cloneDeep(this.originalProducts)
      if (this.typeFilter) {
        temp = temp.filter((item) => {
          return item.type === this.typeFilter
        })
      }
      if (this.areaFilter) {
        temp = temp.filter((item) => {
          return item.area === this.areaFilter
        })
      }

      if (this.sortMode) {
        if (this.sortOption) {
          temp.sort((a, b) => b[this.sortMode] - a[this.sortMode])
        } else {
          temp.sort((a, b) => a[this.sortMode] - b[this.sortMode])
        }
      }
      return temp
    }
  },
  async asyncData(ctx) {
    const keyword = ctx.query.keyword
    const city = ctx.store.state.geo.position.city
    const { status, data: { count, pois } } = await ctx.app.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword,
        city
      }
    })
    const { status: status2, data: { areas, types } } = await ctx.app.$axios.get('/category/menu', {
      params: {
        city
      }
    })
    if (status === 200 && count > 0 && status2 === 200) {
      const products = pois.filter(item => item.photos.length).map((item) => {
        return {
          id: item.id,
          name: item.name,
          type: item.type,
          img: item.photos[0].url,
          tel: item.tel,
          price: Number(item.biz_ext.cost),
          addr: formatProductAddress(item),
          location: item.location.split(','),
          comment: Math.floor(Math.random() * 1000),
          rate: Number(item.biz_ext.rating),
          scene: item.tag,
          status: '可定明日',
          module: item.type.split(';')[0],
          area: item.adname
        }
      })
      return {
        originalProducts: products,
        keyword,
        center: (pois.find(item => item.location).location || '').split(','),
        areas: areas.filter(item => item.type !== ''),
        types: types.filter(item => item.type !== '')
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.onscroll = () => {
        if (this.$refs.map.$el.offsetTop - document.documentElement.scrollTop < 50) {
          this.$refs.map.$el.style.position = 'fixed'
          this.$refs.map.$el.style.top = '50px'
        }

        if (document.documentElement.scrollTop < 230) {
          this.$refs.map.$el.style.position = ''
          this.$refs.map.$el.style.top = ''
        }
      }
    })
  },
  methods: {
    handleToMap(location) {
      this.center = location
    },
    handleSort(mode, option) {
      this.sortMode = mode
      this.sortOption = option
    },
    handleFilter(mode, value) {
      this[mode + 'Filter'] = value
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixins.scss';
  .products {
    @include page-center;
    display: flex;
    aside {
      width: 322px;
      margin-left: 15px;
      padding-top: 50px;
    }
    article {
      width: 853px;
      section {
        margin-top: 10px;
      }
    }
  }
</style>
