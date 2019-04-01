import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	submit = {choice: '', points: 10};
  submitQuote = {choice: '', points: 10};
	score = 0;
  error;
	correct;
	charData;
  quoteData;
	titleOfCorrectAns;
	nameOfCorrectAns;
  nameOfCorrectQuoteAns;
	randomNum;
	choices = [];
  quoteChoices = [];
	message;
  wrong;
  wrongQuoteChar;
  wrongQuoteAns;
  img;
  name;
  winningSegment;
  show = false;
  wrongCounter = 0;
  gameover = false;
  gameoverMsg = 'You failed the throne... The game is over...';
  id;


  constructor(
  	private _httpService: HttpService,
  	private _router: Router,
  	private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
        // console.log(params['id'])
        this.id = params['id'];
      })
  	}

    // create getter to access user id via param
    // store user's points
    // save user's points on click

    // not using
    getApiChar(){
  		let observable = this._httpService.getApiChar();
       observable.subscribe(data => {
       	if(this.charData == null){
          this.charData = data;
          // console.log('ran getApiChar from gameComponent');
          // console.log(this.charData);
       	}
       	this.genA();
       });
    }

    // not using
    genA(){
      this.name = true;
      // console.log('this is the random num');
      this.randomNum = Math.floor(Math.random()*this.charData.length);
      this.titleOfCorrectAns = this.charData[this.randomNum].titles[0];
      this.nameOfCorrectAns = this.charData[this.randomNum].name;
      // console.log("this is the correct name -> correct title");
      // console.log(this.charData[this.randomNum]);
      // console.log(this.nameOfCorrectAns);
     //  console.log(this.titleOfCorrectAns);
      while(this.titleOfCorrectAns == null || this.titleOfCorrectAns == 'Ser'){
        if (this.titleOfCorrectAns == 'Ser' && this.charData[this.randomNum].titles.length > 1){
          this.titleOfCorrectAns = this.charData[this.randomNum].titles[1];
          this.nameOfCorrectAns = this.charData[this.randomNum].name;
          break;
        }
        this.randomNum = Math.floor(Math.random()*this.charData.length);
        this.titleOfCorrectAns = this.charData[this.randomNum].titles[0];
        this.nameOfCorrectAns = this.charData[this.randomNum].name;
        // console.log("this is the correct name from while statement");
        // console.log(this.nameOfCorrectAns);
      }
      this.choices.push(this.charData[this.randomNum].name);
      // console.log('this is the answer');
      // console.log(this.charData[this.randomNum].name);
      this.genWrong();
      this.genWrong();
      this.genWrong();
      this.shuffle(this.choices);
    }

    // not using
    genWrong(){
      this.randomNum = Math.floor(Math.random()*this.charData.length);
      this.wrong = this.charData[this.randomNum].name;
      while(this.choices.indexOf(this.wrong) != -1 || this.charData[this.randomNum].name == null){
          // console.log('while loop');
          this.randomNum = Math.floor(Math.random()*this.charData.length);
          this.wrong = this.charData[this.randomNum].titles[0];
      }
      // console.log(this.wrong);
      this.choices.push(this.wrong)  
    }

    // not using
    submitAns(){
      if(this.choices[this.submit.choice] == this.nameOfCorrectAns){
        this.message = 'Correct! Spin the wheel...';
        this.score += this.submit.points;
      } else {
         this.message = 'Off with your head! The rightful answer is ' +  this.nameOfCorrectAns + '! Spin the wheel...';
      }
    }

    getQuote(){
      this.message = null;
      this.winningSegment = localStorage.getItem('winningSegment')
      let observable = this._httpService.getQuote(this.winningSegment);
       observable.subscribe(data => {
          this.quoteData = data['character'];
          this.nameOfCorrectQuoteAns = data['quote'];
          // console.log(this.nameOfCorrectQuoteAns);
          this.quoteChoices.push(this.nameOfCorrectQuoteAns);
          this.genQuoteAnswers();
          this.genQuoteAnswers();
          this.genQuoteAnswers();
          this.show = true;
      });
     }

    genQuoteAnswers(){
      // not using, need to pass through this.winningSegment = localStorage.getItem('winningSegment');
      // remove chosen char from array
      // choose a random char
      // console.log('running gen quote function');
      this.winningSegment = localStorage.getItem('winningSegment');
      let array = ['Bronn', 'Brynden Tully', 'Cersei', 'The Hound', 'Jaime Lannister', 'Littlefinger', 'Olenna Tyrell', 'Renly Baratheon', 'Tyrion', 'Varys'];
      for(var i = 0; i < array.length; i++){
        if (array[i] == this.winningSegment){
          array.splice(i, 1);
        }
      };
      this.randomNum = Math.floor(Math.random()*array.length);
      // selects a random character
      this.wrongQuoteChar = array[this.randomNum];
      // call get request API for chosen random char 
      let observable = this._httpService.getQuote(this.wrongQuoteChar);
      observable.subscribe(data => {
         this.wrongQuoteAns = data['quote'];
         console.log('index of');
         console.log(this.quoteChoices.indexOf(this.wrongQuoteAns));
         while(this.quoteChoices.indexOf(this.wrongQuoteAns) > -1){
           console.log('quote exists');
             this.quoteChoices.push('You know nothing, Jon Snow.');
           break;
         }
         this.quoteChoices.push(this.wrongQuoteAns);
         this.shuffle(this.quoteChoices);
         })
      }
      // push random quote to choices
      

   submitQuoteAns(){
      if(this.quoteChoices[this.submitQuote.choice] == this.nameOfCorrectQuoteAns){
        this.message = 'Correct! Spin the wheel...';
        this.score += this.submitQuote.points;
      } else {
         console.log('this is the wrong counter');
         console.log(this.wrongCounter);
         if(this.wrongCounter >= 3){
            let obs = this._httpService.editUser(this.id, {score: this.score});
            obs.subscribe(data => {
          // console.log("Delete from component");
            });
            this.show = false;
            this.gameover = true;
            var src = 'https://wikiofthrones.com/static/uploads/2017/07/Game-Of-Thrones-season-7-GIFs-night-king.gif',
              img = document.createElement('img');
              img.src = src;
            document.getElementById('temp2').appendChild(img);
            setTimeout(function(){
              document.getElementById('temp2').removeChild(img);
            }, 3000);
         } else {
           this.message = 'Wrong! The correct answer is ' +  this.nameOfCorrectQuoteAns  + '! Spin the wheel...';
           this.wrongCounter++;
         }
      }
    }

    continuePlaying(){
      this.name = false;
      this.message = null;
      this.quoteChoices = [];
      this.quoteData = null;
      this.nameOfCorrectQuoteAns = null;
      this.getQuote();
    }

    // WIP
    getImage(){
      this.randomNum = Math.floor(Math.random()*this.charData.length);
      this.img = this.charData[this.randomNum].imageLink;
      // console.log(this.img);
      while(this.img == null){
        this.randomNum = Math.floor(Math.random()*this.charData.length);
        this.img = 'https://api.got.show/doc' + this.charData[this.randomNum].imageLink;
        // console.log(this.img);
      }
    }

    shuffle(array) {
	  // console.log('running shuffle');
    var currentIndex = array.length, temporaryValue, randomIndex;
    // console.log('array length');
    // console.log(array.length);
	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  return array;
	}
}
