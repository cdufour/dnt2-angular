import { Injectable } from '@angular/core';
import { Player} from './models/player';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const urlServer = 'http://localhost:5000';

@Injectable()
export class PlayerService {
  test:string = "ok";

  // players:Player[] = [
  //   new Player('Michel', 'Platini', 10, 'Juventus', 'assets/img/platini.jpg'),
  //   new Player('Pavel', 'Nedved', 6, '', 'assets/img/nedved.jpg'),
  //   new Player('Thomas', 'Meunier', 4, 'PSG', 'assets/img/meunier.jpg')
  // ];

  players:Player[] = [];

  constructor(private http:Http) { }

  getPlayers():Player[] { return this.players; }

  getPlayers1():Player[] {
    let p:Player[];
    this.http.get(`${urlServer}/players`)
      .map(data => data.json())
      .subscribe(data => {
        //p = data;
        this.players = data;
      });
    return this.players;
  }

  getPlayers2():Observable<any> {
    return this.http.get(`${urlServer}/players`);
  }

  getPlayers3():Observable<Player[]> {
    return this.http.get(`${urlServer}/players`)
      .map((res:Response) => res.json());
  }



  getPlayer(lastname:string):Player {
    return this.players.filter(x => {return x.lastname == lastname})[0];
  }

  getPlayerAjax(lastname:string):Observable<any> {
    return this.http.get(`${urlServer}/players/${lastname}`);
  }

  addPlayer(body: Player):Observable<Player> {
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({headers:headers});
    let bodyString = JSON.stringify(body);
    return this.http.post(`${urlServer}/players`, bodyString, options)
      .map((res:Response) => res.json());
  }

}
