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

    <!-- 文件上传输入框 隐藏 -->
    <input type="file" hidden ref="file" />
    <!-- 头像 -->
    <van-cell title="头像" is-link @click="imgupData">
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
        @click="isUpdatePhotoShow = true"
      />
      <!-- 触发file的点击事件 -->
    </van-cell>
    <!-- 编辑头像弹层 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      style="height: 100%"
      position="bottom"
    >
      <updatePhoto
        v-if="isUpdatePhotoShow"
        :photo="photo"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- 编辑头像弹层 -->
    <!-- 头像 -->

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
import UpdatePhoto from './componets/UpdatePhoto.vue'
import UpdateName from './componets/UpdateName.vue'
import UpdateGender from './componets/UpdateGender.vue'
import UpdateBirthday from './componets/UpdateBirthday.vue'
export default {
  name: 'User',
  components: {
    UpdatePhoto,
    UpdateName,
    UpdateGender,
    UpdateBirthday
  },
  data() {
    return {
      user: {}, //个人信息
      isShowUpdateName: false, //修改昵称弹出层
      isShowUpdateGender: false, //修改性别弹出层
      isShowUpdateBirthday: false, //修改生日弹出层
      isUpdatePhotoShow: false, // 头像弹窗
      photo: '' // 图片路径
    }
  },

  created() {
    this.getUserProfile()
  },
  mounted() {
    // 在DOM更新完成之后，文件上传之后会触发自身的cahange事件，监听文件上传框的change事件，利用事件对象e.target捕捉到上传完成的文件
    this.$refs.file.addEventListener('change', (e) => {
      // 其捕捉到的事件对象e中的e.target中会携带一盒files伪数组数据，在其原型对象的原型对象Blob上存放着该文件的base64格式的文件数据
      console.log(e)
      // 定义一个常量接收e.target.files伪数组中的文件对象，因为这里只上传一个文件，所以直接[0]接收即可
      // 第一种方法，URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的 URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的 URL 对象表示指定的 File 对象或 Blob 对象。
      const file = e.target.files[0]
      // file = URL.createObjectURL(file) // 将file对象转换成图片可识别的url
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.photo = e.target.result
        this.isUpdatePhotoShow = true
      }
    })
  },
  methods: {
    async getUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
    },
    imgupData() {
      this.$refs.file.click()
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
