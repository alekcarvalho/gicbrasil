import axios from 'axios'
import { userStore } from '~/stores/user'
import { router } from '~/main'

//base url
axios.defaults.baseURL = import.meta.env.VITE_API_URL

//regular axios
export const http = axios.create()

//auth axios
export const https = axios.create()

// Add a request interceptor
https.interceptors.request.use((config) => {
  const user = userStore()
  const token = user.get.token
  config.headers['token'] = token
  return config
})

// Add a response interceptor
https.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
