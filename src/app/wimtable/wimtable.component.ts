import { Component, OnInit } from '@angular/core';
import {Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import {minBy,maxBy} from 'lodash';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { FirebaseDatabase, FirebaseOptionsToken } from 'angularfire2';

@Component({
  selector: 'app-wimtable',
  templateUrl: './wimtable.component.html',
  styleUrls: ['./wimtable.component.css']
})
export class WimtableComponent implements OnInit {
  private datasource$:AngularFireList<any>;
  public members$:Observable<any> =null;
  minMax$:Observable<any>;
  columns = [
    'Name',
    'BeerCount',
    'Beer',
    'Water',
    'Sleep'
    ];
  constructor( private db:AngularFireDatabase) { }

  ngOnInit() {
    this.datasource$ =  this.db.list('users',ref=>ref.orderByChild('beercount'));
    this.members$ = this.datasource$.valueChanges().pipe(map(v=>Object.values(v).sort((a, b) => {
      return a.beercount>b.beercount ? -1 : a.beercount<b.beercount ? 1 : 0;
    })));

      this.minMax$ = this.members$.pipe(
      map(v=>{
      const values = Object.values(v);
      const max = maxBy(values,'beercount').name;
      const min = minBy(values,'beercount').name;
      return {min,max};
      })
      );
  }
  DrankWater(updatedMember:any){
      if (updatedMember.beercount >0){
          updatedMember.beercount-= 0.5;
          this.updateMember(updatedMember);
      }
    }
    
    DrankBeer(updatedMember:any){
      updatedMember.beercount++;
      this.updateMember(updatedMember);
    }
    
    Slept(updatedMember:any){
      updatedMember.beercount=0;
      this.updateMember(updatedMember);
    }
    
    private updateMember(memberdata:any){
      let ref = memberdata;
      this.db.object('users/'+memberdata.id)
      .update({'beercount':memberdata.beercount});
    }

}
