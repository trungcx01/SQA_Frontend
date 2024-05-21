<template>
  <div class="login-wrapper">
    <div class="form-wrapper">
      <div class="form-container">
        <h1 class="centered-title">Hệ thống đăng ký giảng dạy</h1>
        <h2 class="login-title">Đăng nhập</h2>
        <input type="text" class="input-wrapper" placeholder="Tên tài khoản" v-model="username" />
        <input type="password" class="input-wrapper" placeholder="Mật khẩu" v-model="password" />
        <button class="login-btn" :class="{ 'login-btn-disabled': !isActiveSubmitBtn }" @click="handleOnSubmit">
          Đăng nhập
        
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/api'
import { useLoadingStore } from '@/stores/loading'
import { useAuthStore } from '@/stores/auth'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleOnSubmit() {
      const loadingStore = useLoadingStore();
      loadingStore.setLoading(true);
      try {
        let payload = { username: this.username, password: this.password };
        let res = await api('login', payload);
        if (res.success) {
          useAuthStore().setUserAuth(res.data);
          this.$router.push({ name: 'TeacherManagement' });
          this.$toast.open({ message: 'Đăng nhập thành công', type: 'success', position: 'top-right', duration: 5000 });
        } else {
          this.$toast.open({ message: 'Thông tin đăng nhập không chính xác', type: 'error', position: 'top-right', duration: 5000 });
        }
      } catch (error) {
        this.$toast.open({ message: 'Lỗi kết nối đến server', type: 'error', position: 'top-right', duration: 5000 });
      } finally {
        loadingStore.setLoading(false);
      }
    }
  },
  computed: {
    isActiveSubmitBtn() {
      return this.username.length > 0 && this.password.length > 0;
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-color: #f4f4f4;

  .form-wrapper {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);

    .form-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;

      .centered-title {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .login-title {
        font-size: 24px;
        color: #333;
      }

      .input-wrapper {
        width: 100%;
        height: 50px;
        max-width: 360px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 17px;
      }

      .login-btn {
        height: 50px;
        width: 130%;
        max-width: 360px;
        padding: 10px;
        background-color: #0056b3;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 17px;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.3s;

       
        &:hover {
          background-color: #004494;
        }

        &-disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>