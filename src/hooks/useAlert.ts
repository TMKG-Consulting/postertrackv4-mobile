import useRootStore, { Alert } from "./stores/useRootstore";

let timeoutId: NodeJS.Timeout | string | number | undefined;
export default function useAlert() {
	const { alert, setAlert } = useRootStore();

	async function showAndHideAlert({ message, type }: Alert) {
		clearTimeout(timeoutId);
		setAlert({ message, type, show: true });
		timeoutId = setTimeout(() => {
			setAlert({ message, type, show: false });
		}, 5000);
	}

	return { showAndHideAlert };
}
