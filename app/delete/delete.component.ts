import { Component } from '@angular/core';
import {DeleteService} from './deleteservice';
import { SpinnerComponent} from '../../app/progressbar/SpinnerComponent';

@Component({
    templateUrl: 'app/delete/delete.component.html',
    providers: [SpinnerComponent]
})
export class DeleteComponent {
    public isRequesting: boolean;
    public pageTitle: string = 'Mobile Intercept - Storage Delete API';
    downloadUrl:string = 'http://phildev3/Dragnet.Services.Storage.WebAPI/api/files/';
    sessionId:string ='';
    transactionId:string ='';
    errorMessage: string;
    opMessage: string;

    constructor(private _ds:DeleteService){

    }
    public refresh(): void {
        this.isRequesting = true;
    }
    private stopRefreshing() {
        this.isRequesting = false;
    }
    clearScreen():void{
        this.errorMessage = '';
        this.sessionId="";
        this.opMessage = '';
    }    
    deleteSession():void{
        this.refresh();
        this.errorMessage = '';
        this.opMessage = '';
        var url = this.downloadUrl+this.sessionId;
        this._ds.deleteSession(url).subscribe(
            downloads => {
                this.opMessage = 'Session Id ' + this.sessionId + ' - Deleted';
                this.sessionId = downloads.SessionId;
                this.transactionId = downloads.TransactionId;
                this.stopRefreshing();   
            },error => this.errorMessage = <any>error );
    }
    
}
