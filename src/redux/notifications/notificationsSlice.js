import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentNotifications: null
}

export const fetchInvitationAPI = createAsyncThunk(
  'notifications/fetchInvitationAPI',
  async () => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/api/invitations`)
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/api/invitations/board/${invitationId}`, { status })
    return response.data
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    addNotification: (state, action) => {
      const incomingNotification = action.payload

      // unshift() adds the notification to the beginning of the array
      state.currentNotifications.unshift(incomingNotification)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationAPI.fulfilled, (state, action) => {
      let incomingInvitation = action.payload

      state.currentNotifications = Array.isArray(incomingInvitation) ? incomingInvitation.reverse() : []
    })

    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      let incomingInvitation = action.payload

      const getInvitation = state.currentNotifications.find(i => i.id === incomingInvitation.id)
      // getInvitation.boardInvitation = incomingInvitation.boardInvitation
      getInvitation.status = incomingInvitation.status
    })
  }
})

export const { clearCurrentNotifications, updateCurrentNotifications, addNotification } = notificationsSlice.actions

export const selectCurrentNotifications = (state) => state.notifications.currentNotifications

export const notificationsReducer = notificationsSlice.reducer