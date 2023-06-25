import {
  DataProvider,
  GetListParams,
  GetOneParams,
  UpdateParams,
  addRefreshAuthToDataProvider,
  HttpError
} from 'react-admin'
import { gql } from '@apollo/client'
import client from './apollo'
import Fileds from './fileds'
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

export const baseDataProvider: DataProvider = {
  getList: async (resource: string, params: GetListParams) => {
    const { field, order } = params.sort
    const { page, perPage } = params.pagination
    const filters = params.filter

    return client
      .query({
        query: gql`
           query ($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: Filters) {
            ${`${resource}_list`}(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
            ${Fileds[`${resource}_list`]}
        }
        ${resource}_list_meta(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
        count
        }
        }`,
        variables: {
          perPage: perPage,
          page: page - 1,
          sortField: field,
          sortOrder: order,
          filter: filters
        }
      })
      .then((result) => {
        if (result.data) {
          const Data = {
            data: result.data[`${resource}_list`],
            total: result.data[`${resource}_list_meta`].count
          }
          return Promise.resolve(Data)
        }
        return Promise.reject(500)
      })
      .catch((e) => {
        if (e.networkError) {
          return Promise.reject(
            e?.networkError?.response?.status
              ? e?.networkError?.response.status
              : 500
          )
        }

        return Promise.reject(400)
      })
  },
  getOne: async (resource: string, params: GetOneParams) => {
    return client
      .query({
        query: gql`
          query ($id: String!) {
              ${resource}(id: $id) {
                  ${Fileds[resource]}
              }
          }`,
        variables: {
          id: params.id
        }
      })
      .then((result) => {
        if (result.data) {
          const Data = {
            data: result.data[`${resource}`]
          }
          return Promise.resolve(Data)
        }
        return Promise.reject(500)
      })
      .catch((e) => {
        if (e.networkError) {
          return Promise.reject(
            e?.networkError?.response?.status
              ? e?.networkError?.response.status
              : 500
          )
        }

        return Promise.reject(400)
      })
  },
  getMany: (resource, params) => Promise.reject(500),
  getManyReference: (resource, params) => Promise.reject(500),
  create: (resource, params) => Promise.reject(500),
  update: async (resource: string, params: UpdateParams) => {
    const Data = params.data
    const Keys = Fileds[`update_${resource}`].split(' ')

    const filtered = Object.keys(Data)
      .filter((key) => Keys.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: Data[key]
        }
      }, {})

    return client
      .mutate({
        mutation: gql`
          mutation ($id: String!, $data: update_${resource}) {
              update_${resource}(id: $id, data: $data) {
                  ${Fileds[`${resource}`]}
              }
          }`,
        variables: {
          id: params.id,
          data: filtered
        }
      })
      .then((result) => {
        if (result.data) {
          const Data = {
            data: result.data[`update_${resource}`]
          }
          return Promise.resolve(Data)
        }
        return Promise.reject(500)
      })
      .catch((e) => {
        if (e.networkError) {
          return Promise.reject(
            e?.networkError?.response?.status
              ? e?.networkError?.response.status
              : 500
          )
        }

        return Promise.reject(400)
      })
  },
  updateMany: (resource, params) => Promise.reject(500),
  delete: (resource, params) => Promise.reject(500),
  deleteMany: (resource, params) => Promise.reject(500)
}

export const dataProvider = addRefreshAuthToDataProvider(
  baseDataProvider,
  refreshAuth
)
