import {Injectable} from '@angular/core';
import { Http,Response } from '@angular/http';

@Injectable()
export class DeleteService{
    //private _productUrl = 'http://phildev3/Dragnet.Services.Storage.WebAPI/api/files/7JTTG';
    constructor(private _http:Http)
    {

    }
    deleteSession(url:string){
        return this._http.delete(url)
            .map(data => {
                data.json();
                console.log("I CAN SEE DELETE at SERVICE: ", data.json());
                return data.json();
        });
    }
}