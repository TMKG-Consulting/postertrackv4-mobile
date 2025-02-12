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
