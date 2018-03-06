import {Injectable} from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {IDownloadData} from './app.data.download';

@Injectable()
export class DownloadService{
    //private _productUrl = 'http://phildev3/Dragnet.Services.Storage.WebAPI/api/files/7JTTG';
    constructor(private _http:Http)
    {

    }
    getSessionImages(url:string){
        return this._http.get(url)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA at SERVICE: ", data.json());
                return data.json();
        });
    }
    sendSMS(url:string){
        return this._http.get(url)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA at SERVICE: ", data.json());
                return data.json();
        });
    }    
    getDownloads(url:string): Observable<IDownloadData>{
        return this._http.get(url)
        .map((resp:Response) => <IDownloadData>resp.json());
    }
}