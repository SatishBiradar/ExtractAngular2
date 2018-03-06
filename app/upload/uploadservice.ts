import {Injectable} from '@angular/core';
import { Http,Response } from '@angular/http';

@Injectable()
export class UploadService{
    constructor(private _http:Http)
    {

    }
    uploadImages(url:string,data:FormData){
        return this._http.post(url,data)
        .map(data => {
                data.json();
                console.log("I CAN SEE UPLOAD DATA at SERVICE: ", data.json());
                return data.json();
        });
    }
}