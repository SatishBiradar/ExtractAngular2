import { Component } from '@angular/core';
import {DownloadService} from './app.component.downloadservice';
import {IDownloadData} from './app.data.download';
import { SpinnerComponent} from '../../app/progressbar/SpinnerComponent';

@Component({
    selector: 'pm-app',
    templateUrl:'app/download/download.component.html',
    providers: [DownloadService,SpinnerComponent]
})
export class DownloadComponent { 
          
    constructor(private _ds:DownloadService){

    }
    public isRequesting: boolean;
    //downloadUrl:string = 'http://localhost/Dragnet.Services.Storage.WebAPI/api/files/';
    downloadUrl:string = 'http://phildev3/Dragnet.Services.Storage.WebAPI/api/files/';
    smsUrl:string = 'http://phildev3/Dragnet.Services.Storage.WebAPI/api/Session/';          
    pageTitle:string = 'Mobile Intercept - Storage Download API';
    sessionId:string ='';
    mobileNumber:string ='';
    transactionId:string ='';
    errorMessage: string;
    rawResponse:string = 'raw response';
    FrontPictureName:string;
    FrontPicture: any;
    BackPictureName:string;
    BackPicture:any;
    downloads:IDownloadData;
    downloadCount:0;
    public refresh(): void {
        this.isRequesting = true;
    }
    private stopRefreshing() {
        this.isRequesting = false;
    }     
    clearScreen():void{
        this.errorMessage = '';
        this.downloadCount=0;
        this.sessionId="";
        this.transactionId = '';
        this.mobileNumber = '';
        this.stopRefreshing();
    }
    getImages():void{
        this.errorMessage = '';
        this.downloadCount=0;
        this.refresh();
        var url = this.downloadUrl+this.sessionId;
        this._ds.getSessionImages(url).subscribe(
            downloads => {
                this.downloads = downloads;
                this.sessionId = downloads.SessionId;
                this.transactionId = downloads.TransactionId;
                this.FrontPictureName = downloads.Files[0].Name;
                this.FrontPicture = downloads.Files[0].Data;
                this.BackPictureName = downloads.Files[1].Name;
                this.BackPicture = downloads.Files[1].Data;          
                this.downloadCount = downloads.Files.length;   
                this.stopRefreshing();   
            },error => {
                this.errorMessage = <any>error;
                this.stopRefreshing();
             });
       console.log("Done!");
    }
    sendSms():void{
        this.errorMessage = '';
        this.refresh();
        var url = this.smsUrl+this.mobileNumber;        
        this._ds.sendSMS(url).subscribe(
            smsResp => {
                this.sessionId = smsResp;
                this.stopRefreshing();   
            },error => {
                this.errorMessage = <any>error;
                this.stopRefreshing();
             });        
        console.log("Done!");
    }
}
