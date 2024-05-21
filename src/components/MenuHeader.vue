<template>
  <div class="header-wrapper">
    <div class="back-button" @click="onBack">Trang chủ</div>
    <div class="header-title-wrapper">
      <div class="user-greet">Xin chào {{ userName }}</div>
      <div class="logout-button" @click="onLogOut">Đăng xuất</div>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from '../stores/auth'
export default {
  name: 'MenuHeader',
  computed: {
    userName() {
      return localStorage.getItem('name')
    }
  },
  methods: {
    onBack() {
      this.$router.push({ name: 'TeacherManagement' });
    },
    onLogOut() {
      useAuthStore().clearUserAuth();
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.$router.push({
        name: 'LoginView'
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  padding: 28px 28px;
  width: 100%;
  min-height: 96px;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(35, 35, 33, 0.2);
  position: sticky;
  padding: 0px 40px;
  top: 0;
  z-index: 2;
  .user-greet{
    font-size: 18px;
  }
  .back-button{
    font-size: 22px;
    font-weight: 500;
    cursor: pointer;
  }
  .header-title-wrapper {
    display: flex;
    align-items: center;
    gap: 20px;

    .logout-button {
      font-size: 20px;
      padding: 8px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;

      &:hover {
        background-color: #e7e7e3;
      }
    }
  }
}
</style>
