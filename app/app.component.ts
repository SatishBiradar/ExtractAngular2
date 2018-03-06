import { Component } from '@angular/core';
import {DownloadService} from './download/app.component.downloadservice';
import {DeleteService} from './delete/deleteservice';
@Component({
    selector: 'pm-app',
    // templateUrl:'app/app.component.download.html',
    template:`
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['/welcome']">Home</a></li>                
                    <li><a [routerLink]="['/extractdata']">Extract Data</a></li>
                    <li><a [routerLink]="['/extractbarcode']">Extract Barcode</a></li>
                    <li><a [routerLink]="['/extractocr']">Extract OCR</a></li>
                    <li><a [routerLink]="['/authenticate']">Authenticate</a></li>
                    <li><a [routerLink]="['/upload']">Upload</a></li>
                    <li><a [routerLink]="['/download']">Download</a></li>
                    <li><a [routerLink]="['/delete']">Delete</a></li>
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
    </div>
    `
    ,
    providers: [DownloadService,DeleteService]
})
export class AppComponent { 
        
    pageTitle:string = 'Angular2 sample:';

}
