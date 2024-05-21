import { useAuthStore } from '../stores/auth'

const api = (config) => ({
  login: (payload) => {
    return config('post', 'api/v1/auth/login', {
      username: payload.username,
      password: payload.password
    })
  },
  getAllSubject: () => {
    return config('get', 'api/v1/subject/all', null, {
      Authorization: `Bearer ${useAuthStore().getToken}`,
      'Access-Control-Allow-Origin': '*'
    })
  },
  getAllClassroom: () => {
    return config('get', 'api/v1/classroom/all', null, {
      Authorization: `Bearer ${useAuthStore().getToken}`,
      'Access-Control-Allow-Origin': '*'
    })
  },
  registerSchedule: (payload) => {
    return config('post', 'api/v1/register', payload, {
      Authorization: `Bearer ${useAuthStore().getToken}`,
      'Access-Control-Allow-Origin': '*'
    })
  },
  getTeacherSchedule: () => {
    return config('get', `api/v1/register/${localStorage.getItem('username')}`, null, {
      Authorization: `Bearer ${useAuthStore().getToken}`,
      'Access-Control-Allow-Origin': '*'
    })
  },
  getScheduleFromId: (payload) => {
    return config('get', `api/v1/schedule/${payload}`, null, {
      Authorization: `Bearer ${useAuthStore().getToken}`,
      'Access-Control-Allow-Origin': '*'
    })
  },
  getSubjectNameFromCode: (payload) => {
    return config('get', `api/v1/subject/${payload}`, null, {
      Authorization: `Bearer ${useAuthStore().getToken}`,
      'Access-Control-Allow-Origin': '*'
    })
  }
})

export default api
