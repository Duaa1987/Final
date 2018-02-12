import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the PhotoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-list',
  templateUrl: 'photo-list.html',
})
export class PhotoListPage {
  galleryType = 'regular';
  currentImage = null;

  constructor(private camera: Camera, private emailComposer: EmailComposer,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoListPage');
  }


  captureImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
    }
 
    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = imageData;
    }, (err) => {
      // Handle error
      console.log('Image error: ', err);
    });
  }
 
  sendEmail() {
    let email = {
      to: 'saimon@devdactic.com',
      cc: 'max@mustermann.de',
      attachments: [
        this.currentImage
      ],
      subject: 'My Cool Image',
      body: 'Hey Simon, what do you thing about this image?',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }
 
}


