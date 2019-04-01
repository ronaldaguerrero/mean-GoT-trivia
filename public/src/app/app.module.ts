import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { PlayersComponent } from './players/players.component'; // <-- import FormsModule.

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    GameComponent,
    PlayersComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
