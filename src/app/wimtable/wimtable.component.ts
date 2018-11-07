import { Component, OnInit } from '@angular/core';
import {BehaviorSubject,Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import {minBy,maxBy} from 'lodash';

import {columnNames,membersDictionary} from './data';

@Component({
  selector: 'app-wimtable',
  templateUrl: './wimtable.component.html',
  styleUrls: ['./wimtable.component.css']
})
export class WimtableComponent implements OnInit {
  private members$ = new BehaviorSubject<{[name: string]: any}>(membersDictionary);
  minMax$:Observable<any>;
  dataSource$:Observable<any[]>;
  columns = columnNames;
  constructor() { }

  ngOnInit() {
    this.dataSource$ = this.members$.pipe(map(v=>Object.values(v)));
 
    this.minMax$ = this.members$.pipe(
      map(v=>{
      const values = Object.values(v);
      const max = maxBy(values,'beer').name;
      const min = minBy(values,'beer').name;
      return {min,max};
      })
      );
  }
  DrankWater(Name:string){
    const updatedMember = this.members$.value[Name];
    updatedMember.beer--;
    updatedMember.water++;
    this.updateMember(updatedMember);
    }
    
    DrankBeer(Name:string){
    const updatedMember = this.members$.value[Name];
    updatedMember.beer++;
    this.updateMember(updatedMember);
    }
    
    Slept(Name:string){
    const updatedMember = this.members$.value[Name];
    updatedMember.beer=0;
    updatedMember.water=0;
    this.updateMember(updatedMember);
    }
    
    private updateMember(memberdata:any){
    //spread syntax
    const newMemberData={...this.members$.value,[memberdata.name]:memberdata};
    this.members$.next(newMemberData);
    }

}
