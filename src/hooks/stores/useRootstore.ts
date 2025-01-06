import { create } from "zustand";
import { StatusBarStyle } from "expo-status-bar";

type RootStore = {
	statusBarStyle: StatusBarStyle;
	setStatusBarStyle: (val: StatusBarStyle) => void;
};

const RootStore = create<RootStore>()((set) => ({
	statusBarStyle: "light",
	setStatusBarStyle: (val) =>
		set((state) => ({ ...state, statusBarStyle: val })),
}));

const useRootStore = () => RootStore((state) => state);

export default useRootStore;
