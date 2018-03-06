import { Component } from '@angular/core';
import {UploadService} from './uploadservice';
import { SecurityContext} from '@angular/core';
import { ElementRef} from '@angular/core';
import { SpinnerComponent} from '../../app/progressbar/SpinnerComponent';

@Component({
    templateUrl: 'app/upload/upload.component.html',
    providers: [UploadService,SpinnerComponent]
})
export class UploadComponent {
    public isRequesting: boolean;
    public pageTitle: string = 'Mobile Intercept - Storage Upload API';
    uploadUrl:string = 'http://phildev3/Dragnet.Services.Storage.WebAPI/api/files/';     
    sessionId:string ='';
    transactionId:string ='';
    errorMessage: string;
    frontImage:File;
    backImage:File;
    submitEnabled:boolean = false;
    constructor(private _us:UploadService,private element: ElementRef){
        
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
        this.frontImage = null;
        this.backImage = null;
        this.submitEnabled = false;
        var fimage = (<HTMLInputElement>document.getElementById('frontImage'));
        fimage.src = null;                             
        var bimage = (<HTMLInputElement>document.getElementById('backImage'));
        bimage.src = null;                             
    }    
    sendImages():void{
        this.refresh();
        this.submitEnabled = false;
        this.uploadUrl+=this.sessionId;
        var data = new FormData();
        data.append("sessionId",this.sessionId);
        data.append(this.frontImage.name, this.frontImage);
        data.append(this.backImage.name, this.backImage);
        this._us.uploadImages(this.uploadUrl,data).subscribe(
            upload => {
                this.sessionId = upload.SessionId;
                this.errorMessage = upload.Message;
                this.stopRefreshing();
            },error => this.errorMessage = <any>error );
    }
    frontImageChangeEvent(event: any){
        let file =  event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e:any) {
            var src = e.target.result;
            var bimage = (<HTMLInputElement>document.getElementById('frontImage'));
            bimage.src = src;                        
        };
        // read the image file as a data URL.
        reader.readAsDataURL(event.target.files[0]);        
        this.submitEnabled = true;
        this.frontImage = file;
    }
    backImageChangeEvent(event: any){
        let file =  event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e:any) {
            var src = e.target.result;
            var bimage = (<HTMLInputElement>document.getElementById('backImage'));
            bimage.src = src;                     
        };
        // read the image file as a data URL.
        reader.readAsDataURL(event.target.files[0]);        
        this.submitEnabled = true;
        this.backImage = file;
    }    
}
