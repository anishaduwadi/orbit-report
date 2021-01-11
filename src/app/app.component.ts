import { Component } from '@angular/core';
import { Satellite } from './satellite'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sourceList: Satellite[];
  displayList: Satellite[]
  searchTerm: string;
  constructor() {
    this.sourceList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
    window.fetch(satellitesUrl).then(function(response) {
       response.json().then(function(data) {
          let fetchedSatellites = data.satellites;
          console.log(fetchedSatellites);
          for(let sat of fetchedSatellites) {
            this.sourceList.push(new Satellite(sat.name, sat.type, sat.launchDate, sat.orbitType, sat.operational, sat.type.toLowerCase() === "space debris" ? true : false))
            // data.satellites =  sat.type.toLowerCase() === "space debris" ? true : false
          }
          this.sourceList  = data.satellites
          console.log(this.sourceList)
          this.displayList = this.sourceList.slice(0);
       }.bind(this));
    }.bind(this));
 }
 search(searchTerm: string): void {
   console.log(searchTerm)
  let matchingSatellites: Satellite[] = [];
  searchTerm = searchTerm.toLowerCase();
  for(let i=0; i < this.sourceList.length; i++) {
     let name = this.sourceList[i].name.toLowerCase();
     if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
     }
  }
  // assign this.displayList to be the array of matching satellites
  // this will cause Angular to re-make the table, but now only containing matches
  this.displayList = matchingSatellites;
}
}
