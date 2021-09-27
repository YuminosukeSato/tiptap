import { StringifyOptions } from 'querystring'

import axios, { AxiosError } from 'axios'

import { PostUserTaps } from '../domain/postUserTaps'


//サーバー接続の切り替え
let api: string
switch (window.location.host) {
   case 'localhost:3000':
      api = 'http://localhost:8080'
      break
   case '': //本番
      api = ''
      break
   default:
      api = ''
}

const headers = {
   headers: {
      client: 'SVw5fDxYha8h23nSs0srKw',
      uid: 'test@example.com',
      "access-token": 'JhQx8e8LM0pIiTy21x9Ljw'
   }
}

const errorHandler = (error: AxiosError) => {
   if (error.response) {
      switch (error.response.status) {
         case 400:
            alert('400' + error.message)
            break
         case 401:
            alert('401' + error.message)
            break
         case 403:
            alert('403' + error.message)
            break
         case 404:
            alert('404' + error.message)
            break
         case 500:
            alert('500' + error.message)
            break
         default:
            alert(error.message)
      }
   } else if (error.request) {
      alert(error.request)
   } else {
      alert('Error' + error.message)
   }
}

export const Api = {
   getTemes: (name: string | undefined): Promise<Error> => {
      return axios
         .get(`${api}/getTemes?name=${name}`)
         .then((response) => {
            return response.data
         })
         .catch((error) => {
            errorHandler(error)
         })
   },
   postUserTaps: (postUserTaps: PostUserTaps): Promise<Error> => {
      return axios
         .post(`${api}/api/user_taps`, postUserTaps, headers)
         .then((response) => {
            return response.data
         })
         .catch((error) => {
            errorHandler(error)
         })
   },
}
