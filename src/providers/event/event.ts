import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';

@Injectable()
export class EventProvider {
  public eventListRef: Reference;
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  createEvent(
    studentName: string,
    studentId: number
  ): ThenableReference {
    return this.eventListRef.push({
      name: studentName,
      Id: studentId * 1,
    });
  }

  getEventList(): Reference {
    return this.eventListRef;
  }

  getEventDetail(eventId: string): Reference {
    return this.eventListRef.child(eventId);
  }

  addGuest(guestName: string, eventId: string, guestPicture: string = null
  ): PromiseLike<any> {
    return this.eventListRef
      .child(`${eventId}/guestList`)
      .push({ guestName })
      .then(newGuest => {
        this.eventListRef.child(`${eventId}/guestList`).push({
          guestName: guestName,
          eventId: eventId,
          guestPicture: guestPicture
        });
        if (guestPicture != null) {
          firebase
            .storage()
            .ref(`/guestProfile/${newGuest.key}/profilePicture.png`)
            .putString(guestPicture, 'base64', {
              contentType: 'image/png',
            })
            .then(savedPicture => {
              this.eventListRef
                .child(`${eventId}/guestList/${newGuest.key}/profilePicture`)
                .set(savedPicture.downloadURL);
            });
        }

      });
  }

}