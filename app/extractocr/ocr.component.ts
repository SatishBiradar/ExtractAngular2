import { Component,ViewChild } from '@angular/core';
import { Http,Headers, RequestOptions} from '@angular/http';
import {OcrExtractService} from './OcrExtractService';
import { SecurityContext} from '@angular/core';
import { ElementRef} from '@angular/core';
import { SpinnerComponent} from '../../app/progressbar/SpinnerComponent';

@Component({
    templateUrl: 'app/extractocr/OcrExtract.component.html',
    providers: [OcrExtractService,SpinnerComponent]
})


export class ExtractOcrComponent {
    public isRequesting: boolean;
    public pageTitle: string = 'Mobile Intercept - Extract OCR API';
    transactionId:string ='';
    errorMessage: string;
    frontImage:File;
    cropImage:boolean = false;
    submitEnabled:boolean = false;
    responseSuccess:boolean = false;
    public mobileInterceptUrls:Array<string> = ['https://mi.dragnetsolutions.com/Dragnet.WebApi/api/extractocrdata', 'http://localhost/Dragnet.WebAPI/api/extractocrdata', 'http://phildev3/Dragnet.WebApi/api/extractocrdata'];
    public selectedUrl = 'https://mi.dragnetsolutions.com/Dragnet.WebApi/api/extractocrdata';
    username:string ='';
    password:string ='';
    arrayBarcodeData:Dictionary;
    @ViewChild('mBackImage')
    myInputVariable: any;
    constructor(private _us:OcrExtractService,private element: ElementRef){
        this.arrayBarcodeData = {};    
    }
    keys() : Array<string> {
        return Object.keys(this.arrayBarcodeData);
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
        this.frontImage = null;     
        this.cropImage = false;
        this.myInputVariable.nativeElement.value = "";      
        var bimage = (<HTMLInputElement>document.getElementById('frontImage'));
        bimage.src = "";       
        this.responseSuccess = false;           
    }    
    sendImages():void{
        this.refresh();
        this.submitEnabled = false;
        var data = new FormData();
        data.append('FrontImage', this.frontImage);
        data.append('CropImage',this.cropImage);
        this._us.uploadImages(this.selectedUrl,data,this.username,this.password).subscribe(
            resp => {
                this.errorMessage = resp.Message;
                this.arrayBarcodeData =  resp.FieldData;
                this.responseSuccess = resp.Success;
                console.log("I CAN SEE OCR DATA at Client: ", resp.FieldData);
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
};
interface Dictionary {
    [ index: string ]: string
};