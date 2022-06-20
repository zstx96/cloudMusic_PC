export interface IHotAlbum {
	songs: void /* undefined */[]
	paid: boolean
	onSale: boolean
	mark: number
	alias: string[]
	artists: IArtist_1[]
	copyrightId: number
	picId: number
	artist: IArtist_2
	pic: number
	publishTime: number
	company: string
	briefDesc: string
	picUrl: string
	commentThreadId: string
	blurPicUrl: string
	companyId: number
	tags: string
	description: string
	status: number
	subType: string
	name: string
	id: number
	type: string
	size: number
	picId_str: string
	isSub: boolean
}

interface IArtist_2 {
	img1v1Id: number
	topicPerson: number
	alias: string[]
	picId: number
	musicSize: number
	albumSize: number
	briefDesc: string
	picUrl: string
	img1v1Url: string
	followed: boolean
	trans: string
	name: string
	id: number
	picId_str: string
	img1v1Id_str: string
}

export interface IArtist_1 {
	img1v1Id: number
	topicPerson: number
	alias: void /* undefined */[]
	picId: number
	musicSize: number
	albumSize: number
	briefDesc: string
	picUrl: string
	img1v1Url: string
	followed: boolean
	trans: string
	name: string
	id: number
	img1v1Id_str: string
}

export interface IArtist {
	img1v1Id: number
	topicPerson: number
	alias: string[]
	picId: number
	musicSize: number
	albumSize: number
	briefDesc: string
	picUrl: string
	img1v1Url: string
	followed: boolean
	trans: string
	name: string
	id: number
	picId_str: string
	img1v1Id_str: string
}
