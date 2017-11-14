import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { TeamListComponent } from './team-list/team-list.component';

const appRoutes:Routes = [
  {path: 'contact', component: ContactComponent},
  {path: '', component: PlayerListComponent},
  {path: 'player/:lastname', component: PlayerDetailComponent},
  {path: 'teams', component: TeamListComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    AddPlayerComponent,
    PlayerListComponent,
    PlayerDetailComponent,
    ContactComponent,
    HeaderComponent,
    TeamListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
