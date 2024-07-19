import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		notificationChange(state, action) {
			return action.payload;
		},
		clearNotification(state) {
			return "";
		},
	},
});

export const { notificationChange, clearNotification } =
	notificationSlice.actions;
export default notificationSlice.reducer;
