import { create } from "zustand";
import { StatusBarStyle } from "expo-status-bar";
import {
	Advertiser,
	Brand,
	Category,
	City,
	PendingApprovalSite,
	State,
	User,
} from "@/src/types";
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
	structures: { id: number; name: string }[];
	setStructures: (val: { id: number; name: string }[]) => void;
	posters: { id: number; name: string }[];
	setPosters: (val: { id: number; name: string }[]) => void;
	illumination: { id: number; name: string }[];
	setIllumination: (val: { id: number; name: string }[]) => void;
	side: { id: number; name: string }[];
	setSide: (val: { id: number; name: string }[]) => void;
	route: { id: number; name: string }[];
	setRoute: (val: { id: number; name: string }[]) => void;
	brands: Brand[];
	setBrands: (val: Brand[]) => void;
	advertisers: Advertiser[];
	setAdvertisers: (val: Advertiser[]) => void;
	categories: Category[];
	setCategories: (val: Category[]) => void;
	boardTypes: { id: number; name: string }[];
	setBoardTypes: (val: { id: number; name: string }[]) => void;
	states: State[];
	setStates: (val: State[]) => void;
	cities: City[];
	setCities: (val: City[]) => void;
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
	structures: [],
	setStructures: (val) => set((state) => ({ ...state, structures: val })),
	posters: [],
	setPosters: (val) => set((state) => ({ ...state, posters: val })),
	illumination: [],
	setIllumination: (val) => set((state) => ({ ...state, illumination: val })),
	side: [],
	setSide: (val) => set((state) => ({ ...state, side: val })),
	route: [],
	setRoute: (val) => set((state) => ({ ...state, route: val })),
	brands: [],
	setBrands: (val) => set((state) => ({ ...state, brands: val })),
	advertisers: [],
	setAdvertisers: (val) => set((state) => ({ ...state, advertisers: val })),
	categories: [],
	setCategories: (val) => set((state) => ({ ...state, categories: val })),
	boardTypes: [],
	setBoardTypes: (val) => set((state) => ({ ...state, boardTypes: val })),
	states: [],
	setStates: (val) => set((state) => ({ ...state, states: val })),
	cities: [],
	setCities: (val) => set((state) => ({ ...state, cities: val })),
}));

const useRootStore = () => RootStore((state) => state);

export default useRootStore;
