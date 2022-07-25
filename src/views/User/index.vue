<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isShowUpdateName = true"
    />
    <van-cell
      title="性别"
      :value="user.gender ? '女' : '男'"
      is-link
      @click="isShowUpdateGender = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isShowUpdateBirthday = true"
    />

    <!-- 编辑昵称弹层 -->
    <van-popup
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <!-- v-if每次开启弹层后重新渲染 -->
      <UpdateName
        v-if="isShowUpdateName"
        @close="isShowUpdateName = false"
        v-model="user.name"
      ></UpdateName>
    </van-popup>
    <!-- 编辑昵称弹层 -->

    <!-- 编辑性别弹层 -->
    <van-popup v-model="isShowUpdateGender" position="bottom">
      <UpdateGender
        v-if="isShowUpdateGender"
        v-model="user.gender"
        @close="isShowUpdateGender = false"
      >
      </UpdateGender>
    </van-popup>
    <!-- 编辑性别弹层 -->

    <!-- 编辑生日弹层 -->
    <van-popup v-model="isShowUpdateBirthday" position="bottom">
      <UpdateBirthday
        v-if="isShowUpdateBirthday"
        v-model="user.birthday"
        @close="isShowUpdateBirthday = false"
      ></UpdateBirthday>
    </van-popup>
    <!-- 编辑生日弹层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api'
import UpdateName from './componets/UpdateName.vue'
import UpdateGender from './componets/UpdateGender.vue'
import UpdateBirthday from './componets/UpdateBirthday.vue'
export default {
  name: 'User',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday
  },
  data() {
    return {
      user: {}, //个人信息
      isShowUpdateName: false, //修改昵称弹出层
      isShowUpdateGender: false, //修改性别弹出层
      isShowUpdateBirthday: false //修改生日弹出层
    }
  },

  created() {
    this.getUserProfile()
  },

  methods: {
    async getUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .page-nav-bar {
    background-color: #3296fa;
    :deep(.van-nav-bar__title) {
      color: #fff;
    }
    :deep(.van-icon) {
      color: #fff;
    }
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
