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
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  private log(message: string){
    this.messageService.add('HeroService ' + message);
  }
  getHeros(): Observable<Hero[]>{
    this.messageService.add("HeroService: Fetched Heros");
    return this.httpClient.get<Hero[]>(this.heroApi).pipe(
      tap(heroes => this.log("Fetched Heroes")),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero>{
    this.messageService.add(`HeroService: Fetched Hero id = ${id}`);
    return this.httpClient.get<Hero>(this.heroApi + `/${id}`).pipe(
      tap(_ => this.log(`Fetched Hero Id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero ${id}`))
    );
  }

  addHero(hero:Hero): Observable<Hero>{
    this.messageService.add(`HeroService: Add Hero name= ${hero.name}`);

    return this.httpClient.post<Hero>(this.heroApi, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Added hero`)),
      catchError(this.handleError<any>(`add hero ${hero.name}`))
    )
  }

  updateHero(hero:Hero): Observable<Hero>{

    this.messageService.add(`HeroService: Updated Hero id = ${hero.id}`);

    return this.httpClient.put<Hero>(this.heroApi, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated Hero Id: ${hero.id}`)),
      catchError(this.handleError<Hero>(`updateHero ${hero.id}`))
    );
  }

  deleteHero(hero:Hero | number): Observable<any>{

    const id = typeof hero === 'number' ? hero : hero.id; 
    const heroAddress =  `${this.heroApi}/${id}`;

    this.messageService.add(`HeroService: Delete Hero id = ${id}`);
    return this.httpClient.delete<Hero>(heroAddress, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted Hero Id: ${id}`)),
      catchError(this.handleError<any>(`delete hero: ${hero}`))
    );
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
