import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameRunnerComponent } from './gameRunner/gameRunner.component';

@NgModule({
  declarations: [
    AppComponent,
    GameRunnerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
