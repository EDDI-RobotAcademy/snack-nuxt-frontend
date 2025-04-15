import axios from 'axios'
import type { AxiosInstance } from 'axios'

export const createAxiosInstance = (
  baseURL: string,
  token?: string,
  accountId?: string
): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}`, userToken: token } : {}),
      ...(accountId ? { 'Account-Id': accountId } : {}),
    },
    withCredentials: true,
  })
}