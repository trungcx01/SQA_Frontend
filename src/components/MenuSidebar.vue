<template>
  <div class="sidebar-container">
    <div class="sidebar-title">Hệ thống đăng ký giảng dạy</div>
    <div class="navigation-wrapper">
      <div
        class="navigation-item"
        :class="{ 'navigation-item-active': this.$route.name == item.routeName }"
        v-for="item in navigationItems"
        :key="item.id"
        @click="handleNavigation(item.routeName)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MenuSidebar',
  data() {
    return {
      navigationItems: [
        {
          id: 0,
          label: 'ĐĂNG KÝ GIẢNG DẠY',
          type: 'register',
          routeName: 'ScheduleRegister'
        },
        {
          id: 1,
          label: 'XEM LỊCH GIẢNG DẠY',
          type: 'view',
          routeName: 'ScheduleView'
        }
        // {
        //   id: 2,
        //   label: 'SỬA LỊCH GIẢNG DẠY',
        //   type: 'edit',
        //   routeName: 'ScheduleEdit'
        // }
      ]
    }
  },
  methods: {
    handleNavigation(routeName) {
      this.$router.push({
        name: routeName
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-container {
  padding: 32px 24px;
  height: 100%;
  width: 300px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(35, 35, 33, 0.2);
  gap: 48px;

  .navigation-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .navigation-item {
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      color: #232321;
      font-weight: 500;
      line-height: 17px;
      min-height: 48px;
      cursor: pointer;

      &:hover {
        background-color: #e7e7e3;
      }

      &-active {
        background-color: #4a69e2;
        color: #fff;
        pointer-events: none;
      }
    }
  }
}
</style>
