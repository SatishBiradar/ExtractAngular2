import { Component,ViewChild } from '@angular/core';
import { Http,Headers, RequestOptions} from '@angular/http';
import {AuthenticateService} from './authenticateService';
import { SecurityContext} from '@angular/core';
import { ElementRef} from '@angular/core';
import { SpinnerComponent} from '../../app/progressbar/SpinnerComponent';

@Component({
    templateUrl: 'app/authenticate/authenticate.component.html',
    providers: [AuthenticateService,SpinnerComponent]
})


export class AuthenticateComponent {
    public isRequesting: boolean;
    public pageTitle: string = 'Mobile Intercept - Authenticate API';
    transactionId:string ='';
    errorMessage: string;
    frontImage:File;
    backImage:File;
    cropImage:boolean = false;
    submitEnabled:boolean = false;
    responseSuccess:boolean = false;
    public mobileInterceptUrls:Array<string> = ['https://mi.dragnetsolutions.com/Dragnet.WebApi/api/authenticatedocument', 'http://localhost/Dragnet.WebAPI/api/authenticatedocument', 'http://phildev3/Dragnet.WebApi/api/authenticatedocument'];
    public selectedUrl = 'https://mi.dragnetsolutions.com/Dragnet.WebApi/api/authenticatedocument';
    username:string ='';
    password:string ='';
    arrayBarcodeData:Dictionary;
    arrayOcrData:Dictionary;
    isDocAuthenticated: boolean;
    ReformattedPicture:any;
    FacePicture:any;
    SignPicture:any;
    msgDocAuthenticated: string;
    docAuthErrors = {};
    docAuthWarnings = {};
    @ViewChild('mFrontImage')
    mFrontImageVariable: any;
    @ViewChild('mBackImage')
    mBackImageVariable: any;
    
    constructor(private _us:AuthenticateService,private element: ElementRef){
        this.arrayBarcodeData = {};
        this.arrayOcrData = {};    
    }
    barcodeKeys() : Array<string> {
        return Object.keys(this.arrayBarcodeData);
    } 
    ocrKeys() : Array<string> {
        return Object.keys(this.arrayOcrData);
    }        
    public refresh(): void {
        this.isRequesting = true;
    }
    private stopRefreshing() {
        this.isRequesting = false;
    }    
    clearScreen():void{
        this.errorMessage = '';
        this.username = '';
        this.password = '';
        this.submitEnabled = false;
        this.arrayBarcodeData = {};    
        this.arrayOcrData = {};  
        this.frontImage = null;     
        this.backImage = null;     
        this.cropImage = false;
        this.mFrontImageVariable.nativeElement.value = "";      
        this.mBackImageVariable.nativeElement.value = "";      
        var fbimage = (<HTMLInputElement>document.getElementById('frontImage'));
        fbimage.src = "";       
        var bbimage = (<HTMLInputElement>document.getElementById('backImage'));
        bbimage.src = "";       
        
        this.responseSuccess = false;           
    }    
    sendImages():void{
        this.refresh();
        this.submitEnabled = false;
        var data = new FormData();
        data.append('FrontImage', this.frontImage);
        data.append('CropImage',this.cropImage);        
        data.append(this.backImage.name, this.backImage);
        this._us.uploadImages(this.selectedUrl,data,this.username,this.password).subscribe(
            resp => {
                this.errorMessage = resp.Message;
                this.arrayBarcodeData =  resp.BackFields;
                this.arrayOcrData =  resp.FrontFields;
                this.transactionId = 'Transcation ID: ' + resp.TransactionId;
                this.responseSuccess = resp.Success;
                this.isDocAuthenticated =  resp.DocumentAuthenticationResult.Passed;
                this.ReformattedPicture = resp.ReformattedFrontImage;
                this.FacePicture = resp.FaceImage;
                this.SignPicture = resp.SignatureImage;
                if (this.isDocAuthenticated){
                    this.msgDocAuthenticated = 'Document Authentication Passed';
                } else {
                    this.msgDocAuthenticated = 'Document Authentication Failed';
                }
                this.docAuthErrors = resp.DocumentAuthenticationResult.Failures;
                this.docAuthWarnings = resp.DocumentAuthenticationResult.Warnings;
                console.log("I CAN SEE authenticate data  at Client: ", resp.FieldData);
                this.stopRefreshing();
                this.errorMessage = <any>resp.Errors;
            },error => {
                this.stopRefreshing();
                this.errorMessage = <any>error} 
                );
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
};
interface Dictionary {
    [ index: string ]: string
};