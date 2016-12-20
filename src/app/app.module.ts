import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Http, Response, Headers } from '@angular/http';
import { ApiService } from './shared/api.service';
import { WebGLService } from './shared/webGL';
import { Mesh } from './graph/mesh';
import { AppComponent }   from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports:      [
        BrowserModule,HttpModule
        ],
    providers: [
        WebGLService,Mesh,ApiService
    ],
    bootstrap:    [AppComponent]
})
export class AppModule {}