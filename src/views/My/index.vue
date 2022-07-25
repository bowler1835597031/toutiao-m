<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 登陆的盒子 -->
      <div v-if="isLogin" class="user-info banner">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 展示用户信息 -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <!-- 头像 -->
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <!-- 手机号 -->
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" size="mini" round to="/user">
                编辑资料
              </van-button>
            </van-row>
          </van-col>
        </van-row>
        <!-- 用户文章的数量 -->
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条"
              ><template #icon>
                {{ userInfo.art_count }}</template
              ></van-grid-item
            >
            <van-grid-item text="粉丝"
              ><template #icon>
                {{ userInfo.fans_count }}
              </template></van-grid-item
            >
            <van-grid-item text="关注"
              ><template #icon>
                {{ userInfo.follow_count }}
              </template></van-grid-item
            >
            <van-grid-item text="获赞"
              ><template #icon>
                {{ userInfo.like_count }}</template
              ></van-grid-item
            >
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录的盒子 -->
      <div v-else class="login-register banner">
        <div class="wrap" @click="goLogin">
          <img src="../../assets/images/images/mobile.png" />
          <span>登陆/注册</span>
        </div>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <!-- 历史/搜索 -->
      <div>
        <van-grid column-num="2" class="grid" clickable>
          <van-grid-item icon="photo-o" text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 消息通知/小智同学 -->
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 底部退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出</van-button
    >
  </div>
</template>

<script>
//引入api
import { getUserInfo } from '@/api'
export default {
  name: 'My',
  data() {
    return {
      //用户信息
      userInfo: {}
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    //退出登陆
    logout() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          // 确认
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // 取消
        })
    },
    //前往login页面
    goLogin() {
      this.$router.push('/login')
    },
    //获取用户信息，并处理数据
    async getUserInfo() {
      //如果用户登录了 再去获取用户信息
      if (this.isLogin) {
        try {
          const {
            data: { data } //多重解构拿到res.data.data
          } = await getUserInfo()
          this.userInfo = data
        } catch (error) {
          this.$toast.fail('请重新登陆')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/images/banner.png') no-repeat 0 0 / cover;
}
.user-info {
  display: flex;
  flex-direction: column;
  .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
    :deep(.van-grid-item__icon-wrapper) {
      font-size: 28px;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
}
.link {
  margin: 10px 0;
}
.login-btn {
  :deep(.van-button__text) {
    color: red;
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img {
      margin-bottom: 10px;
    }
  }
}
</style>
