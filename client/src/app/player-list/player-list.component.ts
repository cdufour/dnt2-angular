import { Component, OnInit } from '@angular/core';
import { Player} from '../models/player';
import { PlayerService } from '../player.service';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  message:string = "";
  playersLoaded:boolean = false;
  players:Player[] = [];

  constructor(private playerService:PlayerService) {}

  addPlayer(player: Player) {
    if (!player.photo) player.photo = 'assets/img/avatar.jpg';

    // if (player.num != -1) {
    //   // un numéro a été sélectionné
    //   this.players.push(player);
    //   this.message = "Joueur ajouté avec succès";
    // } else {
    //   this.message = "Veuillez choisir un numéro de maillot";
    // }
    this.playerService.addPlayer(player)
      .subscribe(player => this.players.push(player));
  }

  deletePlayer(player: Player) {
    //let i:number = -1;

    // this.players.forEach((p, index) => {
    //   let cond1:boolean = p.lastname == player.lastname;
    //   let cond2:boolean = p.firstname == player.firstname;
    //   if (cond1 && cond2) i = index;
    // });

    // si le joueur a été trouvé dans le tableau on le retire
    //if (i != -1) this.players.splice(i,1);

    let playersFiltered:Player[] =
      this.players.filter(p => {return player.lastname != p.lastname});

    // mise à jour du tableau players
    this.players = playersFiltered;
  }

  ngOnInit() {
    //this.players = this.playerService.getPlayers();
    this.playerService
      .getPlayers3()
      .delay(1000)
      .subscribe((players:Player[]) => {
        this.players = players;
        this.playerService.players = players;
        this.playersLoaded = true;
      });

    //console.log(this.playerService.getPlayers2());
    // this.playerService.getPlayers2()
    // .map(data => data.json())
    // .subscribe(data => {
    //   this.players = data;
    // });

    //this.players = this.playerService.getPlayers1();
  }

}
