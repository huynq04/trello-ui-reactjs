import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios'

const initialState = {
  currentUser: null
}

// Các hành động gọi api(bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk di
// đi kèm với extraReducer

export const loginUserAPI = createAsyncThunk('user/loginUserAPI', async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/login`, data)
  return response.data
})

export const getMyInfo = createAsyncThunk('user/getMyInfo', async () => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/api/me`)
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

    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      let user = action.payload
      state.currentUser = user
    })
  }
})

// Action creators are generated for each case reducer function
// export const { updateCurrentUser } = userSlice.actions

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer
