import { createContext, useReducer, useEffect } from "react";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SET_NOTIFICATION":
			return action.payload;
		case "CLEAR_NOTIFICATION":
			return "";
		default:
			return state;
	}
};

export const setNotification = (notification) => {
	return {
		type: "SET_NOTIFICATION",
		payload: notification,
	};
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		""
	);

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				notificationDispatch({ type: "CLEAR_NOTIFICATION" });
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [notification]);

	return (
		<NotificationContext.Provider
			value={[notification, setNotification, notificationDispatch]}
		>
			{props.children}
		</NotificationContext.Provider>
	);
};

export default NotificationContext;
