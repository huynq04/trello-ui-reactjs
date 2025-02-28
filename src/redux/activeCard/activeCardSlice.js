import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
}

export const fetchCardDetailsAPI = createAsyncThunk(
  'activeCard/fetchCardDetailsAPI',
  async (cardId) => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/api/cards/${cardId}`)
    return response.data
  }
)

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },

    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null,
      state.isShowModalActiveCard = false
    },

    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload

      state.currentActiveCard = fullCard
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardDetailsAPI.fulfilled, (state, action) => {
      let fullCard = action.payload
      state.currentActiveCard = fullCard
    })
  }
})

export const { showModalActiveCard, clearAndHideCurrentActiveCard, updateCurrentActiveCard } = activeCardSlice.actions

export const selectCurrentActiveCard = (state) => state.activeCard.currentActiveCard

export const selectIsShowModalActiveCard = (state) => state.activeCard.isShowModalActiveCard

export const activeCardReducer = activeCardSlice.reducer

