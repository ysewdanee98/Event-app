import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../providers/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  eventList: any = [];
  isServiceLoaded: boolean;

  constructor(private service: EventService, private router: Router) { }

  ngOnInit(): void {
    this.isServiceLoaded=false;
    this.service.getEventData().subscribe((dataM: any) => {
      this.eventList = dataM;
      console.log(this.eventList);
      this.isServiceLoaded=true;
      this.eventIdSelected = null;
      this.eventSel = [];
    });
  }

  eventIdSelected: number;
  eventSel: any;
  eventChosen(id: number){
    this.eventIdSelected = id;
    console.log(this.eventIdSelected);
    this.eventSel = this.eventList.filter(e => e.eventId == this.eventIdSelected);
    console.log(this.eventSel);
  }

  navigateToCreate(){
    console.log("Clicked");
    this.router.navigateByUrl('/createEvent');
  }

}
