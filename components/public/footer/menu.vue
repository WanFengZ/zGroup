<template>
  <div class="footer-menu clearfix">
    <div class="footer-col">
      <dl class="footer-row">
        <dt>用户帮助</dt>
        <dd>申请退款</dd>
        <dd>查看美团券密码</dd>
        <dd>常见问题</dd>
        <dd>用户协议</dd>
        <dd>隐私政策</dd>
        <dd>反诈骗公告</dd>
        <dd>消费者权益保障</dd>
      </dl>
      <dl class="footer-row">
        <dt>美团服务</dt>
        <dd>美团外卖</dd>
        <dd>美团酒店</dd>
        <dd>猫眼电影</dd>
        <dd>美团配送</dd>
        <dd>美团云</dd>
        <dd>大众点评</dd>
        <dd>美团民宿</dd>
        <dd>无人配送</dd>
      </dl>
    </div>
    <div class="footer-col">
      <dl class="footer-row">
        <dt>商家合作</dt>
        <dd>美团餐饮商户中心</dd>
        <dd>美食商家入驻(非外卖)</dd>
        <dd>美团外卖开店申请</dd>
        <dd>美团收银官网</dd>
        <dd>外卖配送加盟申请</dd>
        <dd>美团点评餐饮学院</dd>
        <dd>酒店商家入驻</dd>
        <dd>境内度假商家入驻</dd>
        <dd>综合商家入驻</dd>
        <dd>美团民宿房东商家入驻</dd>
        <dd>商家开票申请</dd>
        <dd>美团点评智能收银机</dd>
        <dd>美团点评餐饮开放平台</dd>
        <dd>美团点评收单</dd>
        <dd>免费使用美团排队</dd>
        <dd>快驴进货商家合作</dd>
      </dl>
    </div>
    <div class="footer-col">
      <dl class="footer-row">
        <dt>代理商加盟</dt>
        <dd>美团外卖代理商招募</dd>
        <dd>到店餐饮代理商招募</dd>
        <dd>非餐饮代理商招募</dd>
        <dd>美团联盟</dd>
        <dd>美团收银招募线上分销商</dd>
        <dd>美团点评5S服务商招募</dd>
        <dd>美团收单渠道代理商招募</dd>
      </dl>
      <dl class="footer-row">
        <dt>美团收单渠道代理商招募</dt>
        <dd>美团规则</dd>
        <dd>规则中心</dd>
        <dd>规则目录</dd>
        <dd>规则评议院</dd>
      </dl>
    </div>
    <div class="footer-col">
      <dl class="footer-row">
        <dt>关注美团</dt>
        <dd>美团新浪微博</dd>
      </dl>
      <dl class="footer-row">
        <dt>公司信息</dt>
        <dd>关于我们</dd>
        <dd>投资者关系</dd>
        <dd>加入我们</dd>
        <dd>商户诚信公约及管理办法</dd>
        <dd>保险经纪资质</dd>
      </dl>
      <dl class="footer-row">
        <dt>廉正举报</dt>
        <dd>廉政邮箱</dd>
      </dl>
      <dl class="footer-row">
        <dt>知识产权</dt>
        <dd>知识产权维权平台</dd>
      </dl>
    </div>
    <div class="footer-col">
      <dl class="footer-row">
        <dt>消费者服务热线</dt>
        <dd>外卖消费者：10109777</dd>
        <dd>猫眼消费者：10105335</dd>
        <dd>其他消费者：10107888</dd>
      </dl>
      <dl class="footer-row">
        <dt>商家服务热线</dt>
        <dd>外卖&餐饮商家：10105557</dd>
        <dd>休闲娱乐、丽人、ktv、教育、结婚、亲子、家装等商家：10100107</dd>
      </dl>
      <dl class="footer-row">
        <dt>投诉举报热线</dt>
        <dd>违法和不良信息举报电话：4006018900</dd>
        <dd>举报邮箱：tousujubao@meituan.com</dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterMenu'
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixins.scss';
  @import '~@/assets/css/public.scss';
  @import '~@/assets/css/variables.scss';
  .footer-menu {
    @include page-center;
    text-align: left;
    padding: 40px;
    margin-top: 50px;
    border-top: 1px solid $mainBorderColor;
    border-bottom: 1px solid $mainBorderColor;
    .footer-col {
      width: 20%;
      float: left;
      .footer-row {
        padding-bottom: 20px;
        dt {
          color: #333;
          font-size: 14px;
          font-weight: 500;
          line-height: 28px;
        }
        dd {
          color: #666;
          font-size: 12px;
          line-height: 24px;
          cursor: pointer;
          &:hover {
            color: $mainAColor
          }
        }
      }
    }
  }
</style>
