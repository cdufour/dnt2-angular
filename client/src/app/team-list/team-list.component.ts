import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { Player } from '../models/player';
import { TeamService} from '../team.service';
import { PlayerService} from '../player.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams:Team[] = [];
  private players:Player[];

  constructor(
    private teamService:TeamService,
    private playerService:PlayerService
  ) { }

  ngOnInit() {
    this.teamService.getTeams()
      .map(data => data.json())
      .subscribe(data => {
        this.teams = data;
      });

    if (this.playerService.players.length == 0) {
      this.playerService.getPlayers3()
        .subscribe(data => this.players = data);
    }
  }

  getTeamPlayers(team:string):Player[] {
    let players:Player[] = [];
    if (this.playerService.players.length > 0) {
      players = this.playerService.players;
    } else {
      players = this.players;
    }
    return players.filter(p => p.team == team);
  }

}
