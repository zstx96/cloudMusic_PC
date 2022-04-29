import { UserProfile } from "./user";

export interface ArtistDetail {
	videoCount: number;
	identify: IIdentify;
	artist: IArtist;
	blacklist: boolean;
	preferShow: number;
	showPriMsg: boolean;
	secondaryExpertIdentiy: ISecondaryExpertIdentiy[];
	user?:UserProfile
}

interface ISecondaryExpertIdentiy {
	expertIdentiyId: number;
	expertIdentiyName: string;
	expertIdentiyCount: number;
}


interface IArtist {
	id: number;
	cover: string;
	name: string;
	transNames: void /* undefined */[];
	identities: string[];
	identifyTag: void /* 未知类型 */;
	briefDesc: string;
	rank: IRank;
	albumSize: number;
	musicSize: number;
	mvSize: number;

}


interface IRank {
	rank: number;
	type: number;
}


interface IIdentify {
	imageUrl: void /* 未知类型 */;
	imageDesc: string;
	actionUrl: string;
}