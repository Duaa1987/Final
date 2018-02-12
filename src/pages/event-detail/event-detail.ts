import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import * as firebase from 'firebase/app';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoPage } from '../photo/photo';
@IonicPage({
  segment: 'event-detail/:eventId/:homeworkId'
})
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  public currentEvent: any = {};
  public currenthomework: any = {};
  public guestName: string = '';
  public guestPicture: string = null;

  guestPicture1;
  loading;
  currentPhoto ;
  imgSource;
  filename: string;


  constructor(
    public loadingCtrl:LoadingController ,public camera:Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public cameraPlugin: Camera
  ) { }

  ionViewDidLoad() {
    this.eventProvider
      .getEventDetail(this.navParams.get('eventId'))
      .on('value', eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
  }

  takePicture(): void {
    this.cameraPlugin
      .getPicture({
        quality: 95,
        destinationType: this.cameraPlugin.DestinationType.DATA_URL,
        sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: this.cameraPlugin.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      })
      .then(
      imageData => {
        this.guestPicture = imageData;
      },
      error => {
        console.log("ERROR -> " + JSON.stringify(error));
      }
      );
  }



  gotophoto() {
    this.navCtrl.push('PhotoPage');
  }


  

  addGuest(guestName: string): void {
    this.eventProvider
      .addGuest(
      guestName,
      this.currentEvent.id,
      this.guestPicture1
      ).
      then(newGuest => {
        this.guestName = "";
        this.guestPicture = null;
      });
  }


  

}