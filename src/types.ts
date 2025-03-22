export interface User {
	address: string;
	advertiserId: number | null;
	email: string;
	firstname: string;
	id: number;
	lastname: string;
	phone: string;
	profilePicture: string | null;
	role: "FIELD_AUDITOR";
	statesCovered: { id: number; name: string; regionId: number }[];
}

export interface AuditSite {
	address: string;
	advertiser: { id: number; name: string };
	boardType: string;
	campaignID: string;
	mediaOwner: string;
	siteCode: string;
	state: string;
	status: "pending" | "approved" | "disapproved";
	uploadedAt: Date;
	brand: string;
	city: string;
	siteAssignmentId: number;
	mainCampaignId: string | number;
}

export interface PendingApprovalSite {
	address: string;
	advertiser: { id: number; name: string };
	campaignId: string;
	complianceId: number;
	siteCode: string;
	status: "pending" | "approved" | "disapproved";
}

export interface Advertiser {
	id?: number;
	name: string;
}

export interface Category {
	id?: number;
	name: string;
}

export interface Brand {
	id?: number;
	name: string;
	advertiserId: number | string;
	categoryId: number | string;
	advertiser?: Advertiser;
	logo?: string;
	category?: Category;
}

export interface State {
	id?: number;
	name: string;
	regionId: number | string;
}

export interface Region {
	id?: number;
	name: string;
}

export interface City {
	id?: number;
	name: string;
	stateId: number | string;
}
