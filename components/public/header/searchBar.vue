<template>
  <div class="header-search-bar">
    <el-row class="search-bar-inner">
      <el-col :span="5" class="left">
        <div class="logo">
          <a href="/"><img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团"></a>
        </div>
      </el-col>
      <el-col :span="19" class="right">
        <div class="search-block">
          <el-input
            v-model="search"
            class="search__input"
            placeholder="搜索商家或地点"
            @blur="handleBlur"
            @focus="handleFocus"
            @input="handleInput"
          >
          </el-input>
          <el-button class="search__button" @click="handleSearch">
            <i class="el-icon-search"></i>
          </el-button>
          <div v-show="showHot" class="hot-search">
            <dl>
              <dt>热门搜索</dt>
              <dd v-for="(item, index) of $store.state.home.hotPlace.slice(0, 5)" :key="item.name + index">
                <a :href="'/product?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
              </dd>
            </dl>
          </div>
          <div v-show="showResult" class="search-result">
            <ul v-if="searchList.length > 0">
              <li v-for="(item, index) of searchList" :key="item.name + index">
                <a :href="'/product?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
              </li>
            </ul>
            <ul v-else>
              <li>暂无搜索结果</li>
            </ul>
          </div>
        </div>
        <div class="suggest">
          <a
            v-for="(item, index) of $store.state.home.hotPlace.slice(0, 5)"
            :key="item.name + index"
            :href="'/product?keyword='+encodeURIComponent(item.name)"
          >
            {{ item.name }}
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'SearchBar',
  data() {
    return {
      search: '',
      isFocus: false,
      searchList: []
    }
  },
  computed: {
    showHot() {
      return this.isFocus && !this.search && this.$store.state.home.hotPlace.length > 0
    },
    showResult() {
      return this.isFocus && this.search
    }
  },
  methods: {
    handleBlur() {
      setTimeout(() => {
        this.isFocus = false
        this.searchList = []
      }, 200)
    },
    handleFocus() {
      this.isFocus = true
    },
    handleInput: debounce(async function () {
      if (!this.search) {
        return
      }
      this.searchList = []
      const { status, data: { top } } = await this.$axios.get('/search/top', {
        params: {
          input: this.search,
          city: this.$store.state.geo.position.city.replace('市', '')
        }
      })
      this.searchList = status === 200 ? top.slice(0, 10) : []
    }, 300),
    handleSearch() {
      location.href = `/product?keyword=${encodeURIComponent(this.search)}`
    }
  }
}
</script>

<style>
  .search__input .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    outline: none;
    border-right: none;
    border-color: #e5e5e5;
  }
</style>

<style lang="scss" scoped>
  @import '~@/assets/css/mixins.scss';
  @import '~@/assets/css/variables.scss';

  .header-search-bar {
    background-color: #fff;
    .search-bar-inner {
      @include page-center;
      padding-top: 50px;
      padding-bottom: 70px;
      .left {
        .logo {
          height: 46px;
          img {
            height: 100%;
          }
        }
      }
      .right {
        .search-block {
          display: flex;
          height: 40px;
          margin-left: 60px;
          position: relative;
          .search__input {
            width: 470px;
          }
          .search__button {
            width: 80px;
            background-color: $mainBgColor;
            border: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            color: #222;
            font-size: 18px;
          }
          .hot-search {
            position: absolute;
            top: 40px;
            left: 0;
            width: 470px;
            padding-bottom: 10px;
            border: 1px solid $mainBorderColor;
            border-top: none;
            background-color: #fff;
            font-size: 12px;
            dt {
              height: 30px;
              line-height: 30px;
              font-weight: 600;
              color: #999;
              padding-left: 10px;
            }
            dd {
              float: left;
              padding-left: 10px;
              cursor: pointer;
              a {
                color: #666;
                &:hover {
                  color: $mainAColor;
                }
              }
            }
          }
          .search-result {
            position: absolute;
            top: 40px;
            width: 470px;
            border: 1px solid $mainBorderColor;
            border-top: none;
            background-color: #fff;
            color: #333;
            font-size: 12px;
            z-index: 9;
            padding: 10px 0;
            li {
              height: 26px;
              line-height: 26px;
              padding-left: 10px;
              a {
                color: #666;
              }
              &:hover {
                background-color: #f8f8f8;
                a {
                    color: $mainAColor;
                }
              }
            }
          }
        }
        .suggest {
          margin-top: 4px;
          margin-left: 60px;
          height: 26px;
          line-height: 26px;
          padding-left: 15px;
          a {
            color: #999;
            font-size: 12px;
            margin-right: 10px;
            &:hover {
              color: #fe8c00;
            }
          }
        }
      }
    }
  }
</style>
