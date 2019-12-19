<template>
  <div class="menu">
    <dl class="menu-list">
      <dt>全部分类</dt>
      <dd
        v-for="menu of menus"
        :key="menu.type"
        @mouseenter="handleEnterList(menu.child)"
        @mouseleave="handleLeaveList"
      >
        <span class="icon" :class="menu.type">
        </span>
        <span class="text">
          {{ menu.name }}
        </span>
        <span class="arrow el-icon-arrow-right">
        </span>
      </dd>
    </dl>
    <div
      v-show="currentMenuDetail.length > 0"
      class="menu-detail"
      @mouseenter="handleDetailEnter"
      @mouseleave="handleDetailLeave"
    >
      <dl
        v-for="(items, index) of currentMenuDetail"
        :key="index"
      >
        <dt>
          <div class="text">
            {{ items.title }}
          </div>
          <div class="more">
            更多
            <span class="arrow el-icon-arrow-right">
            </span>
          </div>
        </dt>
        <dd
          v-for="item of items.child"
          :key="item"
        >
          {{ item }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Menu',
  data() {
    return {
      currentMenuDetail: []
    //   menus: [{
    //     type: 'food',
    //     name: '美食',
    //     child: [{
    //       name: '美食',
    //       child: ['代金劵', '甜点饮品', '火锅', '自助餐', '小吃快餐', '日韩料理', '西餐', '聚餐宴请',
    //         '烧烤烤肉', '东北菜', '川湘菜', '江浙菜', '香锅烤鱼', '粤港菜', '中式烧烤/烤串', '西北菜']
    //     }]
    //   }, {
    //     type: 'takeout',
    //     name: '外卖',
    //     child: [{
    //       name: '外卖',
    //       child: ['美团外卖']
    //     }]
    //   }, {
    //     type: 'hotel',
    //     name: '酒店',
    //     child: [{
    //       name: '酒店星级',
    //       child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星 ']
    //     }]
    //   }, {
    //     type: 'homestay',
    //     name: '榛果民宿',
    //     child: [{
    //       name: '热门城市',
    //       child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '武汉', '厦门',
    //         '长沙', '青岛', '深圳', '天津', '苏州']
    //     }, {
    //       name: '热门房源',
    //       child: ['复式Loft', '别墅']
    //     }]
    //   }, {
    //     type: 'movie',
    //     name: '猫眼电影',
    //     child: [{
    //       name: '热映电影',
    //       child: ['少年的你', '沉睡魔咒2', '中国机长', '双子杀手', '催眠·裁决', '我和我的祖国', '天气之子',
    //         '航海王：狂热行动', '天作谜案', '终结者：黑暗命运']
    //     }, {
    //       name: '热门影院',
    //       child: ['万达影城', '耀莱成龙国际影城', '大地影院', '保利国际影城', '博纳国际影城', 'CGV影城',
    //         '橙天嘉禾影城', '金逸影城', '中影国际影城', '新华国际影城']
    //     }]
    //   }, {
    //     type: 'ticket',
    //     name: '机票 / 火车票',
    //     child: [{
    //       name: '机票',
    //       child: ['国内机票', '国际/港澳台机票']
    //     }, {
    //       name: '火车票',
    //       child: ['火车票']
    //     }]
    //   }, {
    //     type: 'ktv',
    //     name: '休闲娱乐 / KTV',
    //     child: [{
    //       name: '休闲娱乐',
    //       child: ['足疗按摩', '洗浴/汗蒸', '酒吧', '密室逃脱', '轰趴馆', '茶馆', '私人影院', 'DIY手工坊',
    //         '采摘/农家乐', '网吧网咖', '游乐游艺', 'VR', '桌面游戏', '真人CS', '棋牌室', '其他游乐']
    //     }, {
    //       name: 'KTV',
    //       child: ['KTV']
    //     }]
    //   }, {
    //     type: 'life',
    //     name: '生活服务',
    //     child: [{
    //       name: '生活服务',
    //       child: ['衣物/皮具洗护', '家政', '搬家运输', '送水', '充值缴费', '服饰/鞋包养护', '开锁换锁', '居家维修',
    //         '管道疏通', '家电维修清洗', '电脑维修', '手机维修', '证件照/肖像摄影', '照片冲印/图文文印', '商家服务/法律服务',
    //         '文件传媒机构', '成人用品/情趣用品']
    //     }]
    //   }, {
    //     type: 'hair',
    //     name: '丽人 / 美发 / 医学美容',
    //     child: [{
    //       name: '丽人',
    //       child: ['美发', '美甲美睫', '美容美体', '医学美容', '瑜伽舞蹈', '瘦身纤体', '韩式定妆', '祛痘', '纹身',
    //         '化妆品', '养发']
    //     }]
    //   }, {
    //     type: 'marry',
    //     name: '结婚 / 婚纱摄影 / 婚宴',
    //     child: [{
    //       name: '结婚',
    //       child: ['婚纱摄影', '旅拍', '个性写真', '婚宴', '婚庆公司', '婚纱礼服', '西服定制', '婚戒首饰', '婚车租赁',
    //         '司仪主持', '彩妆造型', '婚礼跟拍', '婚礼小礼品', '更多婚礼服务']
    //     }]
    //   }, {
    //     type: 'offspring',
    //     name: '亲子 / 儿童乐园 / 幼教',
    //     child: [{
    //       name: '儿童乐园',
    //       child: ['婴儿游泳', '其他亲子游乐']
    //     }, {
    //       name: '幼儿教育',
    //       child: ['早教中心', '少儿英语', '智力开发', '托班/幼儿园', '幼儿教育', '其他幼儿教育']
    //     }, {
    //       name: '亲子摄影',
    //       child: ['儿童摄影', '孕妇写真', '上门拍', '其他亲子摄影']
    //     }, {
    //       name: '孕产护理',
    //       child: ['月子会所', '产后恢复', '妇幼医院', '孕产用品', '开奶催乳', '月嫂', '亲子购物', '宝宝派对', '亲子服务']
    //     }]
    //   }, {
    //     type: 'sport',
    //     name: '运动健身 / 健身中心',
    //     child: [{
    //       name: '运动健身',
    //       child: ['运动健身', '武术场馆', '游泳馆', '羽毛球馆', '溜冰场', '射箭馆', '篮球场', '网球场', '台球馆', '乒乓球',
    //         '足球场', '高尔夫场', '保龄球馆', '体育场馆', '马术场', '壁球馆', '更多运动']
    //     }]
    //   }, {
    //     type: 'furniture',
    //     name: '家装 / 建材 / 家居',
    //     child: [{
    //       name: '装修设计',
    //       child: ['半包装修', '全包装修', '清包装修']
    //     }, {
    //       name: '装修建材',
    //       child: ['地板', '瓷砖石材', '橱柜', '灯饰照明', '厨卫洁具', '油漆涂料', '集成吊顶', '墙纸墙艺', '门窗', '木材板材',
    //         '家用五金', '电工电料', '楼梯', '管材管件']
    //     }, {
    //       name: '家居家具',
    //       child: ['家具', '床上用品/家纺', '家居饰品', '厨具餐具', '智能家居']
    //     }, {
    //       name: '家装卖场',
    //       child: ['建材卖场', '家具卖场', '灯饰卖场']
    //     }]
    //   }, {
    //     type: 'study',
    //     name: '学习培训 / 音乐培训',
    //     child: [{
    //       name: '音乐培训',
    //       child: ['钢琴', '吉他', '小提琴', '古筝', '架子鼓', '声乐', '其他音乐培训']
    //     }, {
    //       name: '职业技术',
    //       child: ['美容美妆', '会计', 'IT', '厨艺', '管理培训', '摄影培训', '司法考试', '公务员培训', '其他职业培训']
    //     }, {
    //       name: '外语培训',
    //       child: ['英语', '日语', '韩语', '法语', '德语', '汉语', '俄语', '西班牙语', '其他外语']
    //     }, {
    //       name: '美术培训',
    //       child: ['绘画', '书法', '其他美术']
    //     }]
    //   }, {
    //     type: 'health',
    //     name: '医疗健康 / 宠物 /爱车',
    //     child: [{
    //       name: '医疗健康',
    //       child: ['医院', '齿科口腔', '体检中心', '药店', '中医', '其他健康服务']
    //     }, {
    //       name: '爱车',
    //       child: ['洗车', '租车', '加油站', '维修保养', '驾校', '汽车美容', '陪练', '汽车用品', '停车场', '汽车保险',
    //         '4S店/汽车销售', '更多汽车服务', '机油保养', '汽车报价', '二手车', '广告驾校', '交警队', '汽车改装', '汽车配件']
    //     }, {
    //       name: '宠物',
    //       child: ['宠物店', '宠物医院']
    //     }]
    //   }, {
    //     type: 'bar',
    //     name: '酒吧 / 密室逃脱',
    //     child: [{
    //       name: '玩乐',
    //       child: ['KTV', '酒吧', '密室逃脱', '游乐游艺', '网吧网咖', '私人影院', 'DIY手工坊', '桌面游戏', '采摘/农家乐',
    //         '棋牌室', '轰趴馆', '真人CS', 'VR', '其他玩乐']
    //     }]
    //   }]
    }
  },
  computed: {
    ...mapState('home', {
      menus: state => state.menus
    })
  },
  methods: {
    handleEnterList(detail) {
      clearTimeout(this._timer)
      this.currentMenuDetail = detail
    },
    handleLeaveList() {
      this._timer = setTimeout(() => {
        this.currentMenuDetail = []
      }, 150)
    },
    handleDetailEnter() {
      clearTimeout(this._timer)
    },
    handleDetailLeave() {
      this.currentMenuDetail = []
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/variables.scss';
  .menu {
    width: 228px;
    position: relative;
    .menu-list {
      border: 1px solid $mainBorderColor;
      background-color: #fff;
      padding-bottom: 10px;
      dt {
        height: 50px;
        line-height: 50px;
        color: #222;
        font-size: 16px;
        font-weight: 700;
        margin-left: 15px;
        margin-bottom: 10px;
      }
      dd {
        height: 26px;
        line-height: 26px;
        padding: 0 12px;
        .text {
          font-size: 13px;
          color: #646464;
          cursor: pointer;
        }
        .icon {
          display: inline-block;
          width: 22px;
          font-family: 'meituan';
          font-size: 14px;
          &.food {
            &:before {
              content: "\e622";
              color: #ff8200;
            }
          }
          &.takeout {
            &:before {
              content: "\e630";
              color: #ffb500;
            }
          }
          &.hotel {
            &:before {
              content: "\e62a";
              color: #9b5e3e;
            }
          }
          &.homestay {
            &:before {
              content: "\e631";
              color: #ffb500;
            }
          }
          &.movie {
            &:before {
              content: "\e62c";
              color: #ff3d00;
              position: relative;
              left: -2px;
            }
          }
          &.airport {
            &:before {
              content: "\e632";
              color: #03a9f4;
            }
          }
          &.ktv {
            &:before {
              content: "\e627";
              color: #00bf96;
            }
          }
          &.life {
            &:before {
              content: "\e633";
              color: #00bf96;
            }
          }
          &.hair {
            font-size: 8px;
            &:before {
              content: "\e626";
              color: #ff4081;
              position: relative;
              left: -2px;
            }
          }
          &.marry {
            &:before {
              content: "\e629";
              color: #ff4081;
            }
          }
          &.offspring {
            &:before {
              content: "\e623";
              color: #ff4081;
            }
          }
          &.sport {
            &:before {
              content: "\e62b";
              color: #03a9f4;
            }
          }
          &.furniture {
            &:before {
              content: "\e625";
              color: #00bf96;
            }
          }
          &.study {
            &:before {
              content: "\e624";
              color: #00bf96;
            }
          }
          &.health {
            &:before {
              content: "\e628";
              color: #03a9f4;
            }
          }
          &.bar {
            &:before {
              content: "\e621";
              color: #00bf96;
            }
          }
        }
        .arrow {
          margin-top: 6px;
          float: right;
          color: #646464;
        }
        &:hover {
          background: rgba(255,150,0,0.08);
          .text {
            color: #222;
            font-weight: 700;
          }
        }
      }
    }
    .menu-detail {
      position: absolute;
      top: 60px;
      left: 228px;
      width: 400px;
      height: 427px;
      padding: 0 30px;
      background-color: #fff;
      z-index: 9;
      dt {
        box-sizing: content-box;
        margin-top: 24px;
        height: 22px;
        line-height: 22px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
        .text {
          float: left;
          font-size: 16px;
          color: #222;
          font-weight: 500;
        }
        .more {
          float: right;
          font-size: 12px;
          color: #999;
          font-weight: 400;
          cursor: pointer;
          .arrow {
            margin-left: -4px;
          }
        }
      }
      dd {
        display: inline-block;
        color: #999;
        font-size: 12px;
        line-height: 15px;
        margin-right: 16px;
        margin-top: 10px;
        cursor: pointer;
        &:hover {
          color: $mainAColor;
        }
      }
    }
  }
</style>
