import axios from 'axios'
// notes kalo selesai pake json

const httpRequest = axios.create({
  baseURL: `https://randomuser.me/`,
  timeout: 30000,
})

const requestHandler = async (request) => {
  return request
}

const errorHandler = (error) => {
  return Promise.reject(error)
}

httpRequest.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error),
)

export default httpRequest
