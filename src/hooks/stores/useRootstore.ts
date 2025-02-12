import { create } from "zustand";
import { StatusBarStyle } from "expo-status-bar";
import { PendingApprovalSite, User } from "@/src/types";
import { AuditSite } from "@/src/types";

export interface Alert {
	show?: boolean;
	message: string;
	type: "error" | "success";
}

type RootStore = {
	statusBarStyle: StatusBarStyle;
	setStatusBarStyle: (val: StatusBarStyle) => void;
	isAuthenticated: boolean;
	setIsAuthenticated: (val: boolean) => void;
	alert: Alert;
	setAlert: (val: Alert) => void;
	userDetails: User | null;
	setUserDetails: (val: User | null) => void;
	siteAuditToUpload: AuditSite | null;
	setSiteAuditToUpload: (val: AuditSite | null) => void;
	pendingSites: AuditSite[];
	approvedSites: AuditSite[];
	disapprovedSites: AuditSite[];
	pendingApprovalSites: PendingApprovalSite[];
	setApprovedSites: (val: AuditSite[]) => void;
	setDisapprovedSites: (val: AuditSite[]) => void;
	setPendingApprovalSites: (val: PendingApprovalSite[]) => void;
	setPendingSites: (val: AuditSite[]) => void;
};

const RootStore = create<RootStore>()((set) => ({
	statusBarStyle: "light",
	isAuthenticated: false,
	siteAuditToUpload: null,
	pendingApprovalSites: [],
	approvedSites: [],
	disapprovedSites: [],
	pendingSites: [],
	setApprovedSites: (val) => set((state) => ({ ...state, approvedSites: val })),
	setDisapprovedSites: (val) =>
		set((state) => ({ ...state, disapprovedSites: val })),
	setPendingApprovalSites: (val) =>
		set((state) => ({ ...state, pendingApprovalSites: val })),
	setPendingSites: (val) => set((state) => ({ ...state, pendingSites: val })),
	setSiteAuditToUpload: (val) =>
		set((state) => ({ ...state, siteAuditToUpload: val })),
	setIsAuthenticated: (val) =>
		set((state) => ({ ...state, isAuthenticated: val })),
	setStatusBarStyle: (val) =>
		set((state) => ({ ...state, statusBarStyle: val })),
	alert: {
		show: false,
		message: "",
		type: "success",
	},
	setAlert: (val) => set((state) => ({ ...state, alert: val })),
	userDetails: null,
	setUserDetails: (val) => set((state) => ({ ...state, userDetails: val })),
}));

const useRootStore = () => RootStore((state) => state);

export default useRootStore;
