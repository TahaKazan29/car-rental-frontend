import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStroageService {

  localStorage:Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key:string){
    this.localStorage.getItem(key);
  }

  set(key:string,value:any){
    this.localStorage.setItem(key,value);
  }

  remove(key:string)
  {
    this.localStorage.removeItem(key);
  }

  clear()
  {
    this.localStorage.clear();
  }

}
