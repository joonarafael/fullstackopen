import { useContext } from "react";
import NotificationContext from "../providers/notificationcontext";
import { Alert } from "react-bootstrap";

const Notification = () => {
	const [notification] = useContext(NotificationContext);

	if (!notification || notification.message === "") {
		return null;
	}

	const { message, type } = notification;

	return <Alert variant={type}>{message}</Alert>;
};

export default Notification;
