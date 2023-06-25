import {
  AuthProvider,
  HttpError,
  addRefreshAuthToAuthProvider
} from 'react-admin'
import axios from 'axios'
import { environment } from '../config/environment.config'
import moment from 'moment'

export const refreshAuth = () => {
  const D = localStorage.getItem('login')

  if (D) {
    const PastDate = moment(new Date(D))
    const CurrentDate = moment()
    var Duration = moment.duration(CurrentDate.diff(PastDate))
    var Minutes = Duration.asMinutes()

    if (Minutes > 30) {
      return axios({
        method: 'get',
        url: `${environment.apiUrl}/admin/authentication/refresh`,
        withCredentials: true
      })
        .then((response) => {
          if (response.status === 200) {
            return Promise.resolve()
          }

          return Promise.reject(
            new HttpError('Unauthorized', 401, {
              message: 'Invalid username or password'
            })
          )
        })
        .catch((e) => {
          return Promise.reject(
            new HttpError('Unauthorized', 401, {
              message: 'Invalid username or password'
            })
          )
        })
    }

    return Promise.resolve()
  }

  return Promise.reject(
    new HttpError('Unauthorized', 401, {
      message: 'Invalid username or password'
    })
  )
}

export const myAuthProvider: AuthProvider = {
  login: ({ username, password }) => {
    return axios({
      method: 'post',
      url: `${environment.apiUrl}/admin/authentication/signin`,
      withCredentials: true,
      data: {
        email: username,
        password
      }
    })
      .then((response) => {
        if (response.status === 200) {
          const setDate = new Date()

          localStorage.setItem('login', setDate.toString())
          return Promise.resolve()
        }

        return Promise.reject(
          new HttpError('Unauthorized', 401, {
            message: 'Invalid username or password'
          })
        )
      })
      .catch((e) => {
        return Promise.reject(
          new HttpError('Unauthorized', 401, {
            message: 'Invalid username or password'
          })
        )
      })
  },
  logout: () => {
    localStorage.removeItem('login')

    return axios({
      method: 'get',
      url: `${environment.apiUrl}/admin/authentication/signout`,
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.resolve()
        }

        return Promise.resolve()
      })
      .catch((e) => {
        return Promise.resolve()
      })
  },
  checkError: (error) => {
    const status = error.status
    if (status === 401 || status === 403) {
      localStorage.removeItem('login')
      return Promise.reject()
    }
    return Promise.resolve()
  },
  checkAuth: () => {
    return axios({
      method: 'get',
      url: `${environment.apiUrl}/admin/authentication`,
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.resolve()
        }

        return Promise.reject(
          new HttpError('Unauthorized', 401, {
            message: 'Invalid username or password'
          })
        )
      })
      .catch((e) => {
        return Promise.reject(
          new HttpError('Unauthorized', 401, {
            message: 'Invalid username or password'
          })
        )
      })
    // localStorage.getItem('user') ? Promise.resolve() : Promise.reject(),
  },
  getPermissions: () => Promise.resolve(),
  getIdentity: () => {
    const persistedUser = localStorage.getItem('user')
    const user = persistedUser ? JSON.parse(persistedUser) : null

    return Promise.resolve(user)
  }
}

export const authProvider = addRefreshAuthToAuthProvider(
  myAuthProvider,
  refreshAuth
)

// export const authProvider = myAuthProvider
