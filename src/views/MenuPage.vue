<template>
  <div class="menu-page">
    <Sidebar />
    <div class="menu-page-content">
      <MenuHeader />
      <div class="content-wrapper">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
<script>
// import Sidebar from '../components/MenuSidebar.vue'
import MenuHeader from '../components/MenuHeader.vue'
export default {
  name: 'MenuPage',
  data() {
    return {
      menuOptions: [
        {
          id: 0,
          title: 'Đăng ký giảng dạy',
          type: 'register'
        },
        {
          id: 2,
          title: 'Xem lịch giảng dạy',
          type: 'watch'
        }
      ]
    }
  },
  methods: {
    handleOnClick(type) {
      if (type == 'register') {
        this.$router.push({
          name: 'RegisterTimetable'
        })
      }
    }
  },
  components: { MenuHeader }
}
</script>
<style lang="scss" scoped>
.menu-page {
  display: flex;
  height: 100vh;
  width: 100vw;


  .menu-page-content {
    width: 100%;
    height: 100%;
    overflow: auto;

    .content-wrapper {
      
      padding: 10px 15px 25px 15px;
      background-color: #e7e7e3;
      min-height: 525px;
    }
  }
}
</style>
