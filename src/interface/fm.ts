export interface FMResponse {
	popAdjust: boolean
	data: FMResponse[]
	code: number
}

/* 自动生成的 Interface */

export interface FM {
	name: string
	id: number
	position: number
	alias: void /* undefined */[]
	status: number
	fee: number
	copyrightId: number
	disc: string
	no: number
	artists: IArtist[]
	album: IAlbum
	starred: boolean
	popularity: number
	score: number
	starredNum: number
	duration: number
	playedNum: number
	dayPlays: number
	hearTime: number
	sqMusic: ISqMusic
	hrMusic: void /* 未知类型 */
	ringtone: string
	crbt: void /* 未知类型 */
	audition: void /* 未知类型 */
	copyFrom: string
	commentThreadId: string
	rtUrl: void /* 未知类型 */
	ftype: number
	rtUrls: void /* undefined */[]
	copyright: number
	transName: void /* 未知类型 */
	sign: void /* 未知类型 */
	mark: number
	originCoverType: number
	originSongSimpleData: void /* 未知类型 */
	single: number
	noCopyrightRcmd: void /* 未知类型 */
	rtype: number
	rurl: void /* 未知类型 */
	mvid: number
	bMusic: IBMusic
	mp3Url: void /* 未知类型 */
	hMusic: IHMusic
	mMusic: IMMusic
	lMusic: ILMusic
	reason: string
	privilege: IPrivilege
	alg: string
}

interface IPrivilege {
	id: number
	fee: number
	payed: number
	st: number
	pl: number
	dl: number
	sp: number
	cp: number
	subp: number
	cs: boolean
	maxbr: number
	fl: number
	toast: boolean
	flag: number
	preSell: boolean
	playMaxbr: number
	downloadMaxbr: number
	maxBrLevel: string
	playMaxBrLevel: string
	downloadMaxBrLevel: string
	plLevel: string
	dlLevel: string
	flLevel: string
	rscl: void /* 未知类型 */
	freeTrialPrivilege: IFreeTrialPrivilege
	chargeInfoList: IChargeInfoList[]
}

interface IChargeInfoList {
	rate: number
	chargeUrl: void /* 未知类型 */
	chargeMessage: void /* 未知类型 */
	chargeType: number
}

interface IFreeTrialPrivilege {
	resConsumable: boolean
	userConsumable: boolean
	listenType: void /* 未知类型 */
}

interface ILMusic {
	name: void /* 未知类型 */
	id: number
	size: number
	extension: string
	sr: number
	dfsId: number
	bitrate: number
	playTime: number
	volumeDelta: number
}

interface IMMusic {
	name: void /* 未知类型 */
	id: number
	size: number
	extension: string
	sr: number
	dfsId: number
	bitrate: number
	playTime: number
	volumeDelta: number
}

interface IHMusic {
	name: void /* 未知类型 */
	id: number
	size: number
	extension: string
	sr: number
	dfsId: number
	bitrate: number
	playTime: number
	volumeDelta: number
}

interface IBMusic {
	name: void /* 未知类型 */
	id: number
	size: number
	extension: string
	sr: number
	dfsId: number
	bitrate: number
	playTime: number
	volumeDelta: number
}

interface ISqMusic {
	name: void /* 未知类型 */
	id: number
	size: number
	extension: string
	sr: number
	dfsId: number
	bitrate: number
	playTime: number
	volumeDelta: number
}

interface IAlbum {
	name: string
	id: number
	type: string
	size: number
	picId: number
	blurPicUrl: string
	companyId: number
	pic: number
	picUrl: string
	publishTime: number
	description: string
	tags: string
	company: string
	briefDesc: string
	artist: IArtist_1
	songs: void /* undefined */[]
	alias: void /* undefined */[]
	status: number
	copyrightId: number
	commentThreadId: string
	artists: IArtist_2[]
	subType: string
	transName: void /* 未知类型 */
	onSale: boolean
	mark: number
	gapless: number
	picId_str: string
}

interface IArtist_2 {
	name: string
	id: number
	picId: number
	img1v1Id: number
	briefDesc: string
	picUrl: string
	img1v1Url: string
	albumSize: number
	alias: void /* undefined */[]
	trans: string
	musicSize: number
	topicPerson: number
}

interface IArtist_1 {
	name: string
	id: number
	picId: number
	img1v1Id: number
	briefDesc: string
	picUrl: string
	img1v1Url: string
	albumSize: number
	alias: void /* undefined */[]
	trans: string
	musicSize: number
	topicPerson: number
}

interface IArtist {
	name: string
	id: number
	picId: number
	img1v1Id: number
	briefDesc: string
	picUrl: string
	img1v1Url: string
	albumSize: number
	alias: void /* undefined */[]
	trans: string
	musicSize: number
	topicPerson: number
}
