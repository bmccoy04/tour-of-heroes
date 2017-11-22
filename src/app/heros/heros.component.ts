import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Heros } from '../mock-heros';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  
  heros: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeros().subscribe(heros => this.heros = heros);
  }

  add(name:string){
    name.trim();
    if(!name)
      return;
    
    this.heroService.addHero({name} as Hero).subscribe(hero => this.heros.push(hero));

  }
  delete(hero:Hero){
    this.heros = this.heros.filter(x => x != hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
