import { Injectable } from '@angular/core';
import { Team } from './models/team';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { config } from './config';

@Injectable()
export class TeamService {
  teams:Team[];

  constructor(private http:Http) { }

  getTeams():Observable<any> {
    return this.http.get(`${config.urlServer}/teams`);
  }

}
