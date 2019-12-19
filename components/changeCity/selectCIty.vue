<template>
  <div class="search">
    <el-row>
      <el-col :span="12">
        <span class="label">按省份搜索：</span>
        <el-select v-model="currentProvince" filterable placeholder="请选择省份">
          <el-option
            v-for="item in provinces"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="currentCity" :disabled="!cities.length > 0" filterable placeholder="请选择城市" @change="handleSelect">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <span class="label">直接搜索：</span>
        <el-select
          v-model="searchInput"
          filterable
          remote
          reserve-keyword
          placeholder="请输入城市"
          no-match-text="无匹配城市"
          no-data-text="无匹配城市"
          :remote-method="remoteSearchCity"
          :loading="searchLoading"
          @change="handleSelect"
          @blur="handleSearchBlur"
        >
          <el-option
            v-for="item in searchResult"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'SelectCity',
  data() {
    return {
      provinces: [],
      currentProvince: '',
      cities: [],
      currentCity: '',
      searchLoading: false,
      searchInput: '',
      searchList: [],
      searchResult: []
    }
  },
  watch: {
    async currentProvince(newValue) {
      if (!newValue) {
        return
      }
      this.currentCity = ''
      const { status, data: { city } } = await this.$axios.get(`/geo/province/${newValue}/city`)
      if (status === 200) {
        this.cities = city.map((item) => {
          const city = item.name === '市辖区' || item.name === '省直辖县级行政规划' ? item.province : item.name
          return {
            value: item.province + ',' + city,
            label: city
          }
        })
      }
    }
  },
  async created() {
    const { status, data: { province } } = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.provinces = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    handleSelect(value) {
      this.$emit('changeCity', value)
    },
    remoteSearchCity: debounce(async function (query) {
      if (query !== '') {
        this.loading = true
        if (this.searchList.length) {
          this.searchResult = this.searchList.filter((item) => {
            return item.label.toLowerCase().includes(query.toLowerCase())
          })
        } else {
          const { status, data: { city } } = await this.$axios.get('/geo/city')
          if (status === 200) {
            this.searchList = city.map((item) => {
              return {
                value: item.province + ',' + item.name,
                label: item.name
              }
            })
            this.searchResult = this.searchList.filter((item) => {
              return item.label.toLowerCase().includes(query.toLowerCase())
            })
          } else {
            this.searchResult = []
          }
        }
      } else {
        this.searchResult = []
      }
    }),
    handleSearchBlur() {
      setTimeout(() => {
        this.searchResult = []
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
  .search {
    padding-bottom: 30px;
    .label {
      font-size: 16px;
      color: #333;
      font-weight: 500;
    }
  }
</style>
