interface NotificationProps {
	isError?: boolean | null;
	message?: string | null;
}

const Notification = ({ isError, message }: NotificationProps) => {
	if (!message) {
		return null;
	}

	if (isError) {
		return (
			<div style={{ color: "red" }}>
				<p>{message}</p>
			</div>
		);
	}

	return (
		<div style={{ color: "green" }}>
			<p>{message}</p>
		</div>
	);
};

export default Notification;
