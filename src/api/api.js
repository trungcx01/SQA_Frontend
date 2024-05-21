import axios from 'axios'
import apiMapEndpoint from './apiMap'

const BASE_URL = 'http://localhost:8080'

const request = axios.create({
  baseURL: BASE_URL
})

const config = (method, url, data, header) => {
  let obj = {
    method,
    url
  }
  if (data) {
    if (method === 'get') {
      obj['params'] = data
    } else {
      obj['data'] = data
    }
  }
  if (header) {
    obj['headers'] = header
  }
  return obj
}

const apiMap = { ...apiMapEndpoint(config) }
const api = async (apiName, apiParams) => {
  const config = apiMap[apiName](apiParams)
  try {
    const { data } = await request(config)
    return {
      success: true,
      data
    }
  } catch (error) {
    // if (error?.response?.status === 401 || error?.response?.status === 403) {
    //   return
    // }
    return {
      success: false,
      data: error
    }
  }
}

export default api
