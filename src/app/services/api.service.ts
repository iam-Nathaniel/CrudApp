import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //creating the post service
  postProduct(data: any){
  //the json server has been setup already
    return this.http.post<any>('http://localhost:3000/productList/', data);
  }

  //creating the get service
  getProduct(){ 
  //the json server has been setup already
    return this.http.get<any>('http://localhost:3000/productList/'); 
  }

  putProduct(data:any, id:number){
    //update a specific item in the list of items. we do this by passing the id of the item in  the list
    return this.http.put<any>('http://localhost:3000/productList/' + id, data);
  }

  deleteProduct(id:number){
    //delete a specific item in the list of items. we do this by passing the id of the item in the list
    return this.http.delete<any>('http://localhost:3000/productList/' + id);
  }
}
