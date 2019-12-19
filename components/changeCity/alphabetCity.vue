<template>
  <div class="alphabet-city">
    <dl class="alphabet-menu">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item of alphabetList" :key="item">
        <a :href="'#city-' + item">{{ item }}</a>
      </dd>
    </dl>
    <dl v-for="item of categoricalList" :id="'city-' + item.title" :key="item.title + 'category'" class="city-list" @click="handleClick">
      <dt>{{ item.title }}</dt>
      <dd v-for="city of item.cities" :key="city.id" :province="city.province" :city="getCity(city)">{{ getCity(city) }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'AlphabetCity',
  props: {
    categoricalList: {
      type: Array,
      required: true
    },
    alphabetList: {
      type: Array,
      required: true
    }
  },
  methods: {
    getCity(item) {
      return item.name === '市辖区' || item.name === '省直辖县级行政规划' ? item.province : item.name
    },
    handleClick(e) {
      const dom = e.target
      if (dom.tagName.toLowerCase() === 'dd') {
        const position = dom.getAttribute('province') + ',' + dom.getAttribute('city')
        this.$emit('changeCity', position)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/variables.scss";
  .alphabet-city {
    .alphabet-menu {
      display: flex;
      padding: 30px 0;
      dt {
        font-size: 16px;
        color: #333;
        font-weight: 500;
      }
      dd {
        width: 25px;
        height: 25px;
        line-height: 25px;
        margin: 0 10px;
        font-size: 15px;
        color: #666;
        text-align: center;
        cursor: pointer;
        border-radius: 50%;
        &:hover {
          font-weight: 500;
          color: #222222;
          background: #F8F8F8;
        }
        a {
          color: #666;
        }
      }
    }
    .city-list {
      padding: 13px 30px 13px 50px;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      dt {
        position: absolute;
        top: 13px;
        left: 10px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        color: #222;
        font-size: 16px;
        background-color: $mainBgColor;
      }
      dd {
        margin: 10px 20px;
        cursor: pointer;
        &:hover {
          color: #222222;
          font-weight: 500;
        }
      }
    }
  }
</style>
