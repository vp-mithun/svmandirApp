/**
 * AppUserModel
 */
export class AppUserModel {
    constructor(
        public key:string,
        public username: string, 
        public password: string,
        public displayname: string,
        public standardselected: string,
        public classesselected: string
    ) {
        
    }
}