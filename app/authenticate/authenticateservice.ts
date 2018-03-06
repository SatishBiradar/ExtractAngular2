import {Injectable} from '@angular/core';
import { Http,Headers, RequestOptions} from '@angular/http';

@Injectable()
export class AuthenticateService{
    constructor(private _http:Http)
    {

    }
    uploadImages(url:string,data:FormData,username:string,password:string){
        let headers = new Headers({ "Authorization": "Basic " + btoa(username + ":" + password) });
        headers.append('Access-Control-Allow-Origin', '*');
        let opt = new RequestOptions({ headers: headers });   
        return this._http.post(url,data,opt)
        .map(data => {
                data.json();
                console.log("I CAN SEE authenticate data at SERVICE: ", data.json());
                return data.json();
        });
    }
}