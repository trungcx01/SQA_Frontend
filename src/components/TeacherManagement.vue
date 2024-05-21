<template>
    <div class="teacher-management">
      <h1>Quản lý giáo viên</h1>
      <table>
        <thead>
          <tr>
            <th>Mã giảng viên</th>
            <th>Tên giảng viên</th>
            <th>Ngày sinh (DOB)</th>
            <th>Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>MGV001</td>
            <td>Nguyễn Văn A</td>
            <td>01/01/1980</td>
            <td>Hà Nội</td>
          </tr>
        </tbody>
      </table>
      <div class="buttons-container">
        <button @click="registerSchedule">Đăng kí lịch giảng dạy</button>
        <button @click="viewSchedule">Xem lịch giảng dạy</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      registerSchedule() {
        this.$router.push({ name: 'ScheduleRegister' })
      },
      viewSchedule() {
        this.$router.push({ name: 'ScheduleView' })
      }
    }
  }
  </script>
  
  <style scoped>
  .teacher-management{
    margin: auto;
    background-color: #ffffff;
    height: 97vh;
    width: 97vw;
  }
  .teacher-management h1 {
    font-size: 50px;
    text-align: center;
    margin-bottom: 40px;
    padding: 30px;
  }
  table {
    width: 60%; 
    margin: 20px auto; 
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 16px; 
    text-align: left;
    font-size: 18px;
  }
  button {
    margin: 20px 10px; 
    padding: 15px 30px;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    font-size: 16px;
    display: inline-block;
    text-align: center;
    min-width: 150px;
  }
  button:nth-child(1){
    background-color: #4eaf4e;
  }
  button:nth-child(2){
    background-color: #008cba;
  }
  .buttons-container {
    text-align: center; 
  }
  </style>