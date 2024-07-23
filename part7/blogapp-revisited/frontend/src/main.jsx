import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NotificationContextProvider } from "./providers/notificationcontext";
import { BlogContextProvider } from "./providers/blogcontext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<div className="container">
		<QueryClientProvider client={queryClient}>
			<NotificationContextProvider>
				<BlogContextProvider>
					<App />
				</BlogContextProvider>
			</NotificationContextProvider>
		</QueryClientProvider>
	</div>
);
