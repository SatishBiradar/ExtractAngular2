import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent }  from './app.component';
import { DownloadComponent }  from './download/download.component';
import { UploadComponent }  from './upload/upload.component';
import { WelcomeComponent }  from './Home/welcome.component';
import { DeleteComponent }  from './delete/delete.component';
import { ExtractBarcodeComponent }  from './ExtractBarcode/barcode.component';
import { ExtractOcrComponent }  from './ExtractOcr/ocr.component';
import { ExtractDataComponent }  from './ExtractData/extractdata.component';
import { AuthenticateComponent }  from './authenticate/authenticate.component';
import { SpinnerComponent} from './progressbar/SpinnerComponent';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'welcome',component:WelcomeComponent},
      {path:'download',component:DownloadComponent},
      {path:'upload',component:UploadComponent},
      {path:'delete',component:DeleteComponent},
      {path:'extractbarcode',component:ExtractBarcodeComponent},
      {path:'extractocr',component:ExtractOcrComponent},
      {path:'extractdata',component:ExtractDataComponent},
      {path:'authenticate',component:AuthenticateComponent},
      {path:'spinner',component:SpinnerComponent},
      {path:'', redirectTo:'welcome',pathMatch:'full'},
      {path:'**', redirectTo:'welcome',pathMatch:'full'}
    ]) ],
  declarations: [ AppComponent,DownloadComponent,UploadComponent,WelcomeComponent,DeleteComponent,ExtractBarcodeComponent,ExtractOcrComponent,ExtractDataComponent,AuthenticateComponent,SpinnerComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
