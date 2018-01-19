import { Component, OnInit } from '@angular/core';
import * as firbase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    firbase.initializeApp({
      apiKey: "AIzaSyCRC4tRisQnX-Sr0HT_CcfOJ2oJLSTxuds",
      authDomain: "ng-recipe-book-ff6ea.firebaseapp.com"
    });
  }
}
