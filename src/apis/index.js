import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { toast } from 'react-toastify'

/**
 * Lưu ý: Đối với việc sử dụng axios ở khóa MERN Stack Pro trên kênh Youtube: TrungQuanDev - Một lập trình viên
 *
 * - Tất cả các function bên dưới các bạn chỉ thấy mình request và lấy data từ response luôn, mà không có try catch hay then catch gì để bắt lỗi
 * - Lý do là vì ở phía Front-end chúng ta không cần thiết làm như vậy đối với mọi request bởi nó sẽ gây ra việc dư thừa code catch lỗi quá nhiều
 * - Giải pháp Clean Code gọn gàng đó là chúng ta sẽ catchh lỗi tập trung tại một nơi bằng cách tận dụng một thứ cực kỳ mạnh mẽ trong axios đó là interceptors
 * - Hiểu đơn giản Interceptors là cách mà chúng ta sẽ dhh chặn vào giữa request hoặc response để xử lý logic mà chúng ta muốn
 * (Và ở học phần MERN Stack Advance nâng cao học trực tiếp mình sẽ dạy cực kỳ đầy đủ cách xử lý, áp dụng phần này chuẩn chinh cho các bạn)
 */

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/api/cards/move-to-another-column`, updateData)
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/api/boards/${boardId}`, updateData)
  return response.data
}

export const moveColumnInBoardAPI = async (updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/api/columns/move`, updateData)
  return response.data
}

/** Columns **/
export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/api/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/api/columns/${columnId}`, updateData)
  return response.data
}

export const moveCardInColumn = async (updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/api/cards/move-in-column`, updateData)
  return response.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await authorizeAxiosInstance.delete(`${API_ROOT}/api/columns/${columnId}`)
  return response.data
}

/** Cards **/
export const createNewCardAPI = async (newCardData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/api/cards`, newCardData)
  return response.data
}

export const registerUserAPI = async (data) => {
  const res = await authorizeAxiosInstance.post(`${API_ROOT}/api/auth/register`, data)
  toast.success('Account created successfully! Please check your email to verify your account.', {
    theme: 'colored'
  })
  return res.data
}

export const verifyUserAPI = async (data) => {
  const res = await authorizeAxiosInstance.put(`${API_ROOT}/api/auth/verify`, data)
  toast.success('Account verified successfully! Now you can enjoy our services! Have a great day!', {
    theme: 'colored'
  })
  return res.data
}

export const refreshTokenAPI = async () => {
  const res = await authorizeAxiosInstance.get(`${API_ROOT}/api/auth/refresh_token`)
  return res.data
}

export const fetchBoardsAPI = async (searchPath) => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/api/boards${searchPath}`)
  return response.data
}

// Boards
export const createNewBoardAPI = async (newBoardData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/api/boards`, newBoardData)
  toast.success('Board created successfully!')
  return response.data
}
