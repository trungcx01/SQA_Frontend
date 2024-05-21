<template>
  <div class="register-layout">
    <div class="title-wrapper">
      <div class="main-title">Sửa lịch giảng dạy</div>
      <div class="sub-title">Vui lòng chọn tuần giảng dạy để sửa lịch</div>
    </div>
    <div class="week-wrapper">
      <div class="caret-icon" v-if="weekValue > 1" @click="() => weekValue--">
        <unicon name="angle-left-b" fill="#232321" width="24px" height="24px" />
      </div>
      <unicon name="calendar-alt" fill="#232321" width="24px" height="24px" />
      <div class="week-label">Tuần {{ weekValue }}</div>
      <div class="caret-icon" @click="() => weekValue++">
        <unicon name="angle-right-b" fill="#232321" width="24px" height="24px" />
      </div>
    </div>
    <!-- <TimeTable /> -->
  </div>
</template>
<script>
// import TimeTable from '../components/TimeTable.vue'

export default {
  name: 'ScheduleEdit',
  // components: { TimeTable },
  data() {
    return {
      weekValue: 1
    }
  }
}
</script>
<style lang="scss" scoped>
.register-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .title-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .main-title {
      font-size: 24px;
      line-height: 28px;
      font-weight: 600;
    }

    .sub-title {
      font-size: 16px;
      line-height: 22px;
      font-weight: 600;
      opacity: 0.8;
    }
  }

  .week-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: end;

    .week-label {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
    }

    .caret-icon {
      cursor: pointer;
    }
  }
}
</style>
