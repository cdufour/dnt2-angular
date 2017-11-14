import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Player } from '../models/player';
import { PlayerService } from '../player.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  player: Player = new Player('','',-1);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    //this.route.paramMap.map((x) => {console.log('ok')});
    //console.log(this.route.params);
    //this.route.params.subscribe(x => console.log(x.lastname));

    // let p:string;
    // this.route.params.subscribe(x => p = x.lastname);
    // console.log(p);
    // console.log(this.playerService.test);
    // console.log(this.playerService.getPlayer(p));

    this.route.params.subscribe(params => {
      if (this.playerService.players.length > 0) {
        this.player = this.playerService.getPlayer(params.lastname);
      } else {
        this.playerService.getPlayerAjax(params.lastname)
          .map(data => data.json())
          .subscribe(data => {
            this.player = data;
          });
      }

    });

    // this.player$ = this.route.params.switchMap((params:Params) =>
    //   this.playerService.getPlayer(params.lastname));

  }

}
