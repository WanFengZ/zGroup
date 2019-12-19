<template>
  <div class="cart">
    <el-table
      :data="goods"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="项目"
        width="530"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span>¥ {{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="数量" align="center">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.count" :min="1" size="small" step-strictly></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="总价" align="right">
        <template slot-scope="scope">
          <span style="color: #f76120;font-size: 16px">¥ {{ scope.row.count * scope.row.price }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="submit-order">
      <span class="price-total"><sub>应付金额：</sub>¥{{ total }}</span>
      <el-button class="submit-button" size="small" :disabled="goods.length === 0" @click="handleSubmitOrder">提交订单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: []
    }
  },
  computed: {
    total() {
      let total = 0
      this.goods.forEach((item) => {
        total += item.price * item.count
      })
      return total
    }
  },
  async asyncData(ctx) {
    const { status, data: { code, detail: { name, price, imgs } } } = await ctx.$axios.post('/cart/getCart', {
      id: ctx.query.id
    })

    if (status === 200 && code === 0) {
      return {
        goods: [
          {
            name,
            price,
            imgs,
            count: 1
          }
        ],
        cartNo: ctx.query.id
      }
    }
  },
  methods: {
    async handleSubmitOrder() {
      const { status, data: { code, id } } = await this.$axios.post('/order/createOrder', {
        id: this.cartNo,
        count: this.goods[0].count
      })
      if (status === 200 && code === 0) {
        this.$alert('恭喜您，下单成功，订单号：' + id, '下单成功', {
          confirmButtonText: '确定'
        }).then(() => {
          window.location.href = '/order'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart {
    width: 980px;
    margin: 40px auto 0;
    .submit-order {
      margin-top: 20px;
      text-align: right;
      .price-total {
        font-size: 22px;
        color: #f76120;
        font-weight: 600;
        sub {
          vertical-align: baseline;
          font-size: 14px;
          color: #666;
          font-weight: 500;
          padding-right: 4px;
        }
      }
      .submit-button {
        margin-left: 20px;
        font-size: 20px;
        font-weight: 400;
        color: #fff;
        background-color: #2db3a6;
        background-image: linear-gradient(to bottom,#2ec3b4,#2db3a6);
        border-color: #008177;
        border-radius: 2px;
      }
    }
  }
</style>
