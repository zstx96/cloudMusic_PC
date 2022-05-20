export interface PersonalizedMv {
	id: number
	type: number
	name: string
	copywriter: string
	picUrl: string
	canDislike: boolean
	trackNumberUpdateTime: void /* 未知类型 */
	duration: number
	playCount: number
	subed: boolean
	artists: {
		id: number
		name: string
	}[]
	artistName: string
	artistId: number
	alg: string
}
