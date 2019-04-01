import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
users = [];
user;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  	this.allUsers();
  }

  allUsers(){
       let observable = this._httpService.getUsers();
       observable.subscribe(data => {
          this.users = data['data'];
          // console.log('component');
          // console.log(data);
       });
    }

  deleteUser(id: any){
      let observable = this._httpService.deleteUser(id);
      observable.subscribe(data => {
          // console.log("Delete from component");
      });
      this.allUsers();
	    var src = 'https://upload-assets.vice.com/files/2016/07/06/1467830838GOT_ep_6_Uncle_Benjen_ont_rtick_pony.gif',
	        img = document.createElement('img');

	    img.src = src;
	    document.getElementById('temp').appendChild(img);
	    setTimeout(function(){
	    	document.getElementById('temp').removeChild(img);
	    }, 3000);
    }

}
