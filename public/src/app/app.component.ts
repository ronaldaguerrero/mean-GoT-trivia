import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

declare const myTest: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   // Set the attribute tasks to be an array.
   title = "GoT Trivia";
   users = [];
   reviews = [];
   user;
   img;
   pair = {name: '', img: ''}
   review = {cmt: '', rating: 0}
   constructor(
     private _httpService: HttpService,
     private _router: Router,
     private _route: ActivatedRoute){}
   // ngOnInit will run when the component is initialized, after the constructor method.
   ngOnInit(){
     this.pair = {name: '', img: ''}
    }

    onClickTest(){
      console.log('onclick test');
    }

    createUser(){
      // console.log('create');
      let observable = this._httpService.createUser(this.pair);
      observable.subscribe(data => {
        console.log("Task from component");
        console.log(this.pair);
        this.users.push(this.pair);
      });
      this._router.navigate(["/players"]);
    }
    
    createReview(id: any){
      let observable = this._httpService.createReview(id, this.review);
      observable.subscribe(data => {
        // console.log(this.review);
        this.allReviews();
      });
    }

    userToShow(id: any){
      // console.log('cake me');
      let observable = this._httpService.getUser(id);
       observable.subscribe(data => {
          this.user = data['data'];
       });
    }

    info(idx){
      console.log('info from component');
      this.user = this.users[idx];
      console.log('this user');
      console.log(this.user);
    }

    deleteReview(id: any){
      // console.log("Delete from component");
      let observable = this._httpService.deleteReview(id);
      observable.subscribe(data => {
          // console.log("Delete from component");
          this.allReviews();
      });
    }

    allReviews(){
       let observable = this._httpService.getReviews();
       observable.subscribe(data => {
          this.reviews = data['reviews'];
       });
    }
}
