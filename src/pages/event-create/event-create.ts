import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

@IonicPage()
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html'
})
export class EventCreatePage {
  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider
  ) {}

  createEvent(
    studentName: string,
    studentId: number
  ): void {
    this.eventProvider
      .createEvent(studentName, studentId)
      .then(newEvent => {
        this.navCtrl.pop();
      });
  }
}
