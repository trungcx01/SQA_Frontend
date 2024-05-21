<template>
  <div class="register-layout">
    <div class="title-wrapper">
      <div class="main-title">Xem lịch giảng dạy</div>
      <div class="sub-title">Vui lòng chọn tuần giảng dạy để xem lịch</div>
    </div>
    <div class="week-wrapper">
      <div class="caret-icon" v-if="weekValue > 1" @click="() => weekValue--">
        <unicon name="angle-left-b" fill="#232321" width="24px" height="24px" />
      </div>
      <unicon name="calendar-alt" fill="#232321" width="24px" height="24px" />
      <div class="week-label">Tuần {{ weekValue }}</div>
      <div class="caret-icon" v-if="weekValue < 7" @click="() => weekValue++">
        <unicon name="angle-right-b" fill="#232321" width="24px" height="24px" />
      </div>
    </div>
    <ViewTimeTable :currentWeek="weekValue" :listSchedule="listSchedule" />
  </div>
</template>
<script>
import ViewTimeTable from '../components/ViewTimeTable.vue'
import api from '../api/api'
import { useLoadingStore } from '../stores/loading'

export default {
  name: 'ScheduleView',
  components: { ViewTimeTable },
  data() {
    return {
      weekValue: 1,
      scheduleIdArray: [],
      listSchedule: []
    }
  },
  async created() {
    useLoadingStore().setLoading(true)
    await this.getTeacherScheduleFromApi()
    await this.getAllScheduleFromApi()
    useLoadingStore().setLoading(false)
  },
  methods: {
    async getTeacherScheduleFromApi() {
      let res = await api('getTeacherSchedule')
      if (res.success) {
        if (!res.data.length) {
          this.$toast.open({
            message: 'Giảng viên không có lịch giảng dạy',
            type: 'error',
            position: 'top-right',
            duration: 5000
          })
        }
        for (let i = 0; i < res.data.length; i++) {
          let subjectResponse = await api('getSubjectNameFromCode', res.data[i].subjectCode)
          if (subjectResponse) {
            let detailSchedule = {
              subjectName: subjectResponse.data.name,
              scheduleId: res.data[i].scheduleIds[0]
            }
            this.scheduleIdArray.push(detailSchedule)
          }
        }
        this.$toast.open({
          message: 'Lấy dữ liệu thành công',
          type: 'success',
          position: 'top-right',
          duration: 5000
        })
      }
    },
    async getAllScheduleFromApi() {
      for (let i = 0; i < this.scheduleIdArray.length; i++) {
        let res = await api('getScheduleFromId', this.scheduleIdArray[i].scheduleId)
        if (res.success) {
          let detailSchedule = {
            ...res.data,
            subjectName: this.scheduleIdArray[i].subjectName
          }
          this.listSchedule.push(detailSchedule)
        }
      }
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
    color: #fff ;
    background-color: #0190c0;
    padding: 25px;

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
