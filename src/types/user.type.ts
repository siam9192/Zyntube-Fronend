import { UserInfo } from "firebase/auth"

export interface IUser {
    google:UserInfo,
    app:IAppUser
}


export interface IAppUser {
    _id:string,
    email:string,
    // channel:

}


