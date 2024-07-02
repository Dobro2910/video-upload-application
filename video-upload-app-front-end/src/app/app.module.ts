import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this for animations

@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule, // Add this line
    ],
    providers: [],
    bootstrap: [AppComponent],
  })
  export class AppModule {}