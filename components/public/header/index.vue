<template>
  <div>
    <el-row>
      <el-col>
        <top-bar />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <search-bar />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopBar from './topBar.vue'
import SearchBar from './searchBar.vue'
export default {
  name: 'Header',
  components: {
    TopBar,
    SearchBar
  }
}
</script>
