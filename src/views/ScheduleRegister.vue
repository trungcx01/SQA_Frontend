<template>
  <div class="register-layout">
    <div class="title-wrapper">
      <div class="main-title">Đăng ký giảng dạy</div>
      <div class="sub-title">Vui lòng nhập môn học, tuần và phòng học</div>
    </div>
    <div class="input-container">
      <div class="input-wrapper" v-for="item in listInput" :key="item.id">
        <div class="input-label">
          {{ item.label }}
        </div>
        <SelectInput
          :placeholder="item.placeholder"
          :value="item.inputValue"
          :options="item.listOptions"
          :keyName="item.keyName"
          :keyId="item.keyId"
          @onChooseItem="handleChooseItem($event, item.type)"
        />
      </div>
    </div>
    <RegisterTimeTable
      :selectedValue="selectedValue"
      :isDisableTable="isDisableTable"
      @schedulePayload="handleSchedulePayload"
    />
    <div class="button-wrapper">
      <button
        class="submit-btn"
        :class="{ 'submit-btn-disabled': !registerPayload.length }"
        @click="handleSubmit"
      >
        Lưu
      </button>
    </div>
  </div>
</template>
<script>
import RegisterTimeTable from '../components/RegisterTimeTable.vue'
import SelectInput from '../components/SelectInput.vue'
import api from '../api/api'
import { useLoadingStore } from '../stores/loading'

export default {
  name: 'ScheduleRegister',
  components: { RegisterTimeTable, SelectInput },
  data() {
    return {
      listInput: [
        {
          id: 0,
          type: 'subject',
          label: 'Mã môn học',
          placeholder: 'Chọn mã môn học',
          inputValue: {},
          listOptions: [],
          keyName: 'name',
          keyId: 'code',
          tableKey: 'subjectCode'
        },
        {
          id: 1,
          type: 'week',
          label: 'Tuần',
          placeholder: 'Chọn tuần học',
          inputValue: {},
          listOptions: [
            {
              id: 1,
              name: 'Tuần 1'
            },
            {
              id: 2,
              name: 'Tuần 2'
            },
            {
              id: 3,
              name: 'Tuần 3'
            },
            {
              id: 4,
              name: 'Tuần 4'
            },
            {
              id: 5,
              name: 'Tuần 5'
            },
            {
              id: 6,
              name: 'Tuần 6'
            },
            {
              id: 7,
              name: 'Tuần 7'
            }
          ],
          keyName: 'name',
          keyId: 'id',
          tableKey: 'weekID'
        },
        {
          id: 3,
          type: 'room',
          label: 'Phòng học',
          placeholder: 'Chọn phòng học',
          inputValue: {},
          listOptions: [],
          keyName: 'name',
          keyId: 'id',
          tableKey: 'roomID'
        }
      ],
      registerPayload: []
    }
  },
  async created() {
    useLoadingStore().setLoading(true)
    await this.getAllSubject()
    await this.getAllClassroom()
    // await this.loadTeacherSchedule()
    useLoadingStore().setLoading(false)
  },
  methods: {
    async getAllClassroom() {
      let res = await api('getAllClassroom')
      if (res.success) {
        let roomCondition = this.listInput.find((condition) => condition.type == 'room')
        if (roomCondition) {
          roomCondition.listOptions = res.data
        }
      }
    },
    async getAllSubject() {
      let res = await api('getAllSubject')
      if (res.success) {
        let subjectCondition = this.listInput.find((condition) => condition.type == 'subject')
        if (subjectCondition) {
          subjectCondition.listOptions = res.data
        }
      }
    },
    async loadTeacherSchedule() {
      let res = await api.get('getTeacherSchedule')
      if (res.success) {
        this.scheduleArray = res.data.map((schedule) => ({
          week: schedule.week,
          weekDay: schedule.weekDay,
          shift: schedule.shift,
          subjectCode: schedule.subjectCode,
          roomID: schedule.roomId
        }))
        this.registerPayload = this.scheduleArray // Cập nhật payload để phản ánh lịch hiện tại
      } else {
        this.$toast.open({
          message: 'Không thể tải lịch giảng dạy',
          type: 'error',
          position: 'top-right',
          duration: 5000
        })
      }
    },
    handleChooseItem(id, type) {
      let currentCondition = this.listInput.find((item) => item.type == type)
      if (currentCondition) {
        let chosenItem = currentCondition.listOptions.find(
          (option) => option[currentCondition.keyId] == id
        )
        currentCondition.inputValue = chosenItem
      }
    },
    async handleSubmit() {
      useLoadingStore().setLoading(true)
      for (let i = 0; i < this.registerPayload.length; i++) {
        let res = await api('registerSchedule', this.registerPayload[i])
        if (res.data.message === 'Đăng ký thành công') {
          this.$toast.open({
            message: 'Đăng ký lịch dạy thành công',
            type: 'success',
            position: 'top-right',
            duration: 5000
          })
        } else {
          this.$toast.open({
            message: res.data.message,
            type: 'error',
            position: 'top-right',
            duration: 5000
          })
        }
      }

      useLoadingStore().setLoading(false)
    },
    handleSchedulePayload(val) {
      this.registerPayload = val
    }
  },
  computed: {
    selectedValue() {
      let val = {}
      this.listInput.forEach((item) => {
        val[item.tableKey] = item.inputValue
      })
      return val
    },
    isDisableTable() {
      return !this.listInput.every((item) => !!item.inputValue.name)
    }
  }
}
</script>
<style lang="scss" scoped>
.register-layout {
  margin: 12px 20px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .title-wrapper {
    display: flex;
    flex-direction: column;
    background-color: #4a69e2;
    padding: 25px;
    gap: 4px;
    color: #fff;

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

  .input-container {
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-radius: 8px;
    padding: 10px;

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .input-label {
        font-weight: 600;
        line-height: 24px;
        color: #232321;
      }

      .input-style {
        min-height: 35px;
        outline: none;
        padding: 10px;
        color: #1f1a24;
        line-height: 19px;
      }
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: end;

    .submit-btn {
      width: 142px;
      height: 48px;
      background: #232321;
      padding: 8px 16px;
      color: #fff;
      border: none;
      text-transform: uppercase;
      font-weight: 500;
      border-radius: 8px;
      cursor: pointer;

      &-disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
}
</style>
