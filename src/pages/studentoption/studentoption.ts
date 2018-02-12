import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the StudentoptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'Studentoption/:eventId/:homeworkId'

})

@Component({
  selector: 'page-studentoption',
  templateUrl: 'studentoption.html',
})
export class StudentoptionPage {
  public currentEvent: any = {};

  constructor(public navCtrl: NavController,public eventProvider: EventProvider,  public navParams: NavParams) {  
  }
   
  ionViewDidLoad() {
    this.eventProvider
      .getEventDetail(this.navParams.get("eventId"))
      .on("value", eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
  }
   
  goToEventDetail(eventId): void {
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }

  goToList(): void {
    this.navCtrl.push('PhotoListPage');
  }
}
