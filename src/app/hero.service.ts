import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Hero } from './hero';
import {Heros} from './mock-heros';
import { MessageService } from './message.service';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {
  private heroApi: string = 'api/heroes';
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  private log(message: string){
    this.messageService.add('HeroService ' + message);
  }
  getHeros(): Observable<Hero[]>{
    this.messageService.add("HeroService: Fetched Heros");
    return this.httpClient.get<Hero[]>(this.heroApi).pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero>{
    this.messageService.add(`HeroService: Fetched Hero id = ${id}`);
    return of(Heros.find(x => x.id == id));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
