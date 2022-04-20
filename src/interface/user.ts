/*
 * @作者: zhao
 * @Date: 2022-03-23 17:09:29
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */
export interface UserProfile {
    nickname: string;
    remarkName:string,
    avatarUrl: string;
    createTime: number;
    userId: number;
    username: string;
    userType: number;
    backgroundUrl: string;
    vipType: number;
    viptypeVersion: number;
    city:number,
    followed:boolean,
    follows:number,
    followeds:number,
    artistIdentity:any[],
    inBlacklist:boolean,
    playlistCount:number,
    sCount:number,
    newFollows:number,
    signature:string

  }
  export interface User{
    profile:UserProfile,
    level:number,
    listenSongs:number,
    mobileSign:boolean,
    pcSign:false,
    peopleCanSeeMyPlayRecord:boolean,
    bindings:any[],
    adValid:false,
    code:number,
    createTime:number,
    createDays:1843,
    profileVillageInfo?:{
        title:string,
        imageUrl:null | string,
        targetUrl:string
    }
  }

  export interface Follower{
      followed:true,
      follows:number,
      nickname:string,
      followeds:number,
      avatarUrl:string,
      authStatus:number,
      gender:number,
      userId:number,
      userType:number,
      signature:string,
      blacklist:boolean,
      eventCount:number,
      playlistCount:number,
      avatarDetail:{
        identityIconUrl:string,
        identityLevel:number
        userType:number
      }
  }