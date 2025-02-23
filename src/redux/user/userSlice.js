import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { toast } from 'react-toastify'

const initialState = {
  currentUser: null
}

// Các hành động gọi api(bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk di
// đi kèm với extraReducer

export const loginUserAPI = createAsyncThunk('user/loginUserAPI', async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/api/auth/login`, data)
  return response.data
})

export const logoutUserAPI = createAsyncThunk('user/logoutUserAPI', async (showSuccessMessage = true) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/api/auth/logout`)
  if (showSuccessMessage) {
    toast.success('Logout successfully')
  }

  return response.data
})

export const updateUserAPI = createAsyncThunk('user/updateUserAPI', async (data) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/api/users/update`, data)
  return response.data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // reducers: noi xu ly du lieu dong bo (sync)
  reducers: {},
  // ExtraReducer: noi xu ly du lieu bat dong bo (async)
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      let user = action.payload
      state.currentUser = user
    })

    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })

    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      let user = action.payload
      state.currentUser = user
    })
  }
})

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer
