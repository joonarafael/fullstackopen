import { notificationChange, clearNotification } from "./notificationReducer";

const notificationMiddleware = (store) => (next) => (action) => {
	if (action.type === notificationChange.type) {
		next(action);

		setTimeout(() => {
			store.dispatch(clearNotification());
		}, 5000);
	} else {
		next(action);
	}
};

export default notificationMiddleware;
