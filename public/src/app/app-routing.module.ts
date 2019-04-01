import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game/game.component';
import { PlayersComponent } from './players/players.component'; // <-- import FormsModule.

const routes: Routes = [
{path: '', pathMatch: 'full', redirectTo: '/' },
{path: 'players', component: PlayersComponent}, // all players
{path: 'GoT/:id', component: GameComponent}, // show game
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
