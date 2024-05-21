<template>
  <div class="table-container">
    <table>
      <tr>
        <th>Kíp/Thứ</th>
        <th v-for="item in tableHeader" :key="item.id">
          {{ item.title }}
        </th>
      </tr>
      <tr v-for="item in tablePeriod" :key="item.id">
        <th>
          {{ item.title }}
        </th>
        <td
          v-for="ele in tableHeader"
          :key="ele.id"
          :class="{ 'schedule-cell': renderScheduleCell(currentWeek, ele.value, item.value).room }"
        >
          <div
            class="schedule-detail-cell"
            v-if="renderScheduleCell(currentWeek, ele.value, item.value).room"
          >
            <div class="subject-name">
              {{ renderScheduleCell(currentWeek, ele.value, item.value).subjectName }}
            </div>
            <div class="room-name">
              Phòng: {{ renderScheduleCell(currentWeek, ele.value, item.value).room.name }}
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'ViewTimeTable',
  data() {
    return {
      tableHeader: [
        {
          id: 0,
          title: 'Hai',
          value: 2
        },
        {
          id: 1,
          title: 'Ba',
          value: 3
        },
        {
          id: 2,
          title: 'Tư',
          value: 4
        },
        {
          id: 3,
          title: 'Năm',
          value: 5
        },
        {
          id: 4,
          title: 'Sáu',
          value: 6
        },
        {
          id: 5,
          title: 'Bảy',
          value: 7
        }
      ],
      tablePeriod: [
        {
          id: 0,
          title: 'Kíp 1',
          value: 1
        },
        {
          id: 1,
          title: 'Kíp 2',
          value: 2
        },
        {
          id: 2,
          title: 'Kíp 3',
          value: 3
        },
        {
          id: 3,
          title: 'Kíp 4',
          value: 4
        },
        {
          id: 4,
          title: 'Kíp 5',
          value: 5
        },
        {
          id: 5,
          title: 'Kíp 6',
          value: 6
        }
      ],
      scheduleArray: [],
      registerPayload: []
    }
  },
  props: {
    currentWeek: {
      type: Number,
      required: true
    },
    listSchedule: {
      type: Array,
      required: true
    }
  },
  methods: {
    renderScheduleCell(week, weekDay, shift) {
      let currentSchedule = this.listSchedule.find(
        (item) => item.week == week && item.weekDay == weekDay && item.shift == shift
      )
      if (currentSchedule) return currentSchedule
      return {}
    }
  }
}
</script>
<style lang="scss" scoped>
.table-container {
  overflow-x: auto;
  &-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
table {
  border-collapse: collapse;
  width: 100%;
  background: #fff;

  td,
  th {
    border: 0.5px solid rgba(35, 35, 33, 0.2);
  }

  th {
    min-width: 130px;
    min-height: 80px;
    padding: 12px;
    text-align: left;
    font-size: 16px;
    line-height: 19px;
  }

  td {
    min-width: 10px;
    height: 80px;
    padding: 12px;
  }

  .schedule-cell {
    background: #e7e7e3;
  }

  .schedule-detail-cell {
  }
}
</style>
