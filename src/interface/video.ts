interface Creator {
	defaultAvatar: boolean
	province: number
	authStatus: number
	followed: boolean
	avatarUrl: string
	accountStatus: number
	gender: number
	city: number
	birthday: number
	userId: number
	userType: number
	nickname: string
	signature: string
	description: string
	detailDescription: string
	avatarImgId: number
	backgroundImgId: number
	backgroundUrl: string
	authority: number
	mutual: boolean
	expertTags: string
	experts: string
	djStatus: number
	vipType: number
	remarkName: string
	backgroundImgIdStr: string
	avatarImgIdStr: string
}

export interface Video {
	alg: string
	scm: string
	threadId: string
	coverUrl: string
	height: number
	width: number
	title: string
	description: string
	commentCount: number
	shareCount: number
	resolutions: Resolutions[]
	creator: Creator
	urlInfo: string
	videoGroup: VideoGroup[]
	previewUrl: string
	previewDurationms: number
	hasRelatedGameAd: boolean
	markTypes: string
	relateSong: any[]
	relatedInfo: string
	videoUserLiveInfo: string
	vid: string
	durationms: number
	playTime: number
	praisedCount: number
	praised: boolean
	subscribed: boolean
}

export interface VideoProfile {
	type: number
	displayed: boolean
	alg: string
	extAlg: string
	data: Video
}

interface Resolutions {
	resolution: number
	size: number
}

interface VideoGroup {
	id: number
	name: string
	alg: string
}
