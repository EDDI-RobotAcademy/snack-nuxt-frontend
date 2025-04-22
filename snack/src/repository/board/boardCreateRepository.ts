// src/repository/board/BoardCreateRepository.ts
import { createAxiosInstance } from '@/common/utils/axiosInstance'

const getAxios = () => {
  const token = localStorage.getItem('userToken') || ''
  const accountId = localStorage.getItem('account_id') || ''
  return createAxiosInstance(token, accountId)
}

interface BoardCreatePayload {
  title: string
  content: string
  image?: File
  end_time: string
  restaurant_id?: number
  author_id?: number
}

export const boardCreateRepository = {
  async requestCreateBoard(payload: BoardCreatePayload) {
    if (!payload.title || !payload.content || !payload.end_time) {
      throw new Error('필수 항목이 누락되었습니다.')
    }

    const formData = new FormData()
    formData.append('title', payload.title)
    formData.append('content', payload.content)
    formData.append('end_time', payload.end_time)

    const authorId = payload.author_id ?? localStorage.getItem('account_id')
    if (!authorId) throw new Error('로그인이 필요합니다.')
    formData.append('author_id', String(authorId))

    if (payload.restaurant_id) {
      formData.append('restaurant_id', String(payload.restaurant_id))
    }
    if (payload.image instanceof File) {
      formData.append('image', payload.image)
    }

    try {
      const res = await getAxios().post('/board/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return res.data
    } catch (error: any) {
      console.error('❌ 유지보수 중 입니다 잠시만 기다려주세요', error.response?.data || error.message)
      throw error
    }
  },
}
