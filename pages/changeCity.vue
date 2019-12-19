<template>
  <div class="change-city">
    <el-row class="border-bottom">
      <el-col>
        <select-city @changeCity="changeCity" />
      </el-col>
    </el-row>
    <el-row class="border-bottom">
      <el-col>
        <hot-city @changeCity="changeCity" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <alphabet-city :categorical-list="allCity" :alphabet-list="allAlphabet" @changeCity="changeCity" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import jspy from 'js-pinyin'
import SelectCity from '@/components/changeCity/selectCity.vue'
import HotCity from '@/components/changeCity/hotCity.vue'
import AlphabetCity from '@/components/changeCity/alphabetCity.vue'
export default {
  components: {
    SelectCity,
    HotCity,
    AlphabetCity
  },
  data() {
    return {
      allCity: [],
      allAlphabet: []
    }
  },
  async asyncData({ app }) {
    const { status, data: { city } } = await app.$axios.get('/geo/city')
    if (status === 200) {
      const data = {}
      city.forEach((item) => {
        const char = jspy.getFullChars(item.name).toUpperCase().slice(0, 1)
        const charCode = char.charCodeAt(0)
        if (charCode > 64 && charCode < 91) {
          if (!data[char]) {
            data[char] = []
          } else {
            data[char].push(item)
          }
        }
      })
      const allCity = []
      const allAlphabet = []
      for (const [key, value] of Object.entries(data)) {
        allCity.push({
          title: key,
          cities: value
        })
        allAlphabet.push(key)
      }
      allCity.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      allAlphabet.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
      return {
        allCity,
        allAlphabet
      }
    }
  },
  methods: {
    async changeCity(value) {
      const arr = value.split(',')
      const position = {
        province: arr[0],
        city: arr[1]
      }
      const loading = this.$loading({
        lock: true,
        fullscreen: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, .4)',
        customClass: 'page-loading'
      })
      const { status, data: { code } } = await this.$axios.post('/geo/changePosition', { position })
      if (status === 200 && code === 0) {
        window.location.href = '/'
      } else {
        loading.close()
        this.$message.error('请求失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixins.scss';
  @import '~@/assets/css/public.scss';
  .change-city {
    @include page-center;
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
    color: #666;
  }
</style>
