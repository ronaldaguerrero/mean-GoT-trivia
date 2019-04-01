import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 
  }
  getApiChar(){
    let data = this._http.get('https://api.got.show/api/characters/');
    data.subscribe((data) => console.log('Got char data from http services: ', data));
    return data;
  }

  getQuote(char){
    let data = this._http.get('https://got-quotes.herokuapp.com/quotes?char=' + char);
    data.subscribe((data) => console.log('Got quote data from http services: ', data));
    return data;
  }

  getUsers(){
    // Remove the lines of code where we make the variable 'tempObservable' and subscribe to it.copy
    // tempObservable = this._http.get('/tasks');
    // tempObservable.subscribe(data => console.log("Got our tasks!", data));
    // Return the observable to wherever the getTasks method was invoked.
    return this._http.get('/users');
  }
  getUser(id){
   return this._http.get('/user/'+id); 
  }
  getReviews(){
    return this._http.get('/reviews');
  }
  createUser(newData){
    // console.log('New task from service');
    // console.log(newTask);
    return this._http.post('/user', newData);
  }
  createReview(id, newReview){
   return this._http.post('/review/' + id, newReview); 
  }
  deleteUser(id){
    return this._http.delete('/' + id); 
  }
  deleteReview(id){
    // console.log('Delete from service');
    return this._http.delete('/review/' + id); 
  }

  editUser(id, edit){
    console.log('running edit http service');
    console.log(id);
    console.log(edit);
   return this._http.put('/user/'+ id, edit); 
  }
  // getTasks(){
  //     // Remove the lines of code where we make the variable 'tempObservable' and subscribe to it.copy
  //     // tempObservable = this._http.get('/tasks');
  //     // tempObservable.subscribe(data => console.log("Got our tasks!", data));
  //     // Return the observable to wherever the getTasks method was invoked.
  //     return this._http.get('/tasks');
  //   }
  // getTask(taskId){
  //   return this._http.get('/tasks/' + taskId);
  //   }
}
