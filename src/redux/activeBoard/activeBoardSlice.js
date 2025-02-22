import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import { mapOrder } from '~/utils/sorts'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import authorizeAxiosInstance from '~/utils/authorizeAxios'

const initialState = {
  currentActiveBoard: null
}

// Các hành động gọi api(bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk di
// đi kèm với extraReducer

export const fetchBoardDetailsAPI = createAsyncThunk('activeBoard/fetchBoardDetailsAPI', async (boardId) => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/api/boards/${boardId}`)
  // Lưu ý: axios sẽ trả về kết quả về qua property của nó là data
  return response.data
})

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // reducers: noi xu ly du lieu dong bo (sync)
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload // payload la du lieu nhan vao reducer

      // update lai du lieu cua currentActiveBoard
      state.currentActiveBoard = board
    }
  },
  // ExtraReducer: noi xu ly du lieu bat dong bo (async)
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // payload la response.data o api(fetchBoardDetailsAPI) tren
      let board = action.payload

      // Sắp xếp thứ tự các column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con (video 71 đã giải thích lý do ở phần Fix bug quan trọng)
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach((column) => {
        // Khi F5 trang web thì cần xử lý vấn đề kéo thả vào một column rỗng (Nhớ lại video 37.2, code hiện tại là video 69)
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // Sắp xếp thứ tự các column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con (video 71 đã giải thích lý do ở phần Fix bug quan trọng)
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      console.log('board', board)

      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

export const activeBoardReducer = activeBoardSlice.reducer
