import { Component,ViewChild } from '@angular/core';
import { Http,Headers, RequestOptions} from '@angular/http';
import {BarcodeExtractService} from './BarcodeExtractService';
import { SecurityContext} from '@angular/core';
import { ElementRef} from '@angular/core';
import { SpinnerComponent} from '../../app/progressbar/SpinnerComponent';

@Component({
    templateUrl: 'app/extractbarcode/ExtractBarcode.component.html',
    providers: [BarcodeExtractService,SpinnerComponent]
})


export class ExtractBarcodeComponent {
    public isRequesting: boolean;
    public pageTitle: string = 'Mobile Intercept - Extract Barcode API';
    transactionId:string ='';
    errorMessage: string;
    backImage:File;
    submitEnabled:boolean = false;
    responseSuccess:boolean = false;
    public mobileInterceptUrls:Array<string> = ['https://mi.dragnetsolutions.com/Dragnet.WebApi/api/extractbarcodedata', 'http://localhost/Dragnet.WebAPI/api/extractbarcodedata', 'http://phildev3/Dragnet.WebApi/api/extractbarcodedata'];
    public selectedUrl = 'https://mi.dragnetsolutions.com/Dragnet.WebApi/api/extractbarcodedata';
    username:string ='';
    password:string ='';
    arrayBarcodeData:Dictionary;
    @ViewChild('mBackImage')
    myInputVariable: any;
    constructor(private _us:BarcodeExtractService,private element: ElementRef){
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
        this.backImage = null;     
        this.myInputVariable.nativeElement.value = "";      
        var bimage = (<HTMLInputElement>document.getElementById('backImage'));
        bimage.src = "";       
        this.responseSuccess = false;           
    }    
    sendImages():void{
        this.refresh();
        this.submitEnabled = false;
        var data = new FormData();
        data.append(this.backImage.name, this.backImage);
        this._us.uploadImages(this.selectedUrl,data,this.username,this.password).subscribe(
            resp => {
                this.errorMessage = resp.Message;
                this.arrayBarcodeData =  resp.FieldData;
                this.responseSuccess = resp.Success;
                console.log("I CAN SEE BARCODE DATA at Client: ", resp.FieldData);
                this.stopRefreshing();
                this.errorMessage = <any>resp.Errors;
            },error => {
                this.stopRefreshing();
                this.errorMessage = <any>error} 
                );
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