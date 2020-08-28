import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'
import {HeaderComponent} from "./header/header.component";
import {CardBoardComponent} from "./card-board/card-board.component";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardBoardComponent
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'app-root'}),
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        FormsModule,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
