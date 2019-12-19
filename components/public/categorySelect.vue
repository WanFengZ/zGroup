<template>
  <el-popover
    v-model="visible"
    placement="bottom-start"
    width="400"
    trigger="hover"
    class="select-box"
  >
    <span slot="reference">{{ name }}<i class="el-icon-caret-bottom"></i></span>
    <dl class="category-popover-list">
      <dt>{{ name }}</dt>
      <dd @click="handleSelect(name)">全部</dd>
      <dd v-for="(item, index) of list" :key="item + index" @click="handleSelect(item)">{{ item }}</dd>
    </dl>
  </el-popover>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: {
    name: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleSelect(value) {
      this.visible = false
      this.$emit('handleSelect', value, this.name)
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/css/variables.scss";
  .category-popover-list {
    dt {
      font-size: 16px;
      font-weight: 500;
      color: #ccc;
      margin-bottom: 10px;
    }
    dd {
      font-size: 12px;
      float: left;
      width: 33.3%;
      line-height: 24px;
      cursor: pointer;
      &:hover {
        color: $mainAColor;
      }
    }
  }
</style>
