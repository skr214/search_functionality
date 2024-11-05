import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchItem } from './models/search.item';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  URL = "https://my-json-server.typicode.com/Uxtrendz/apis/videoList";

  constructor(private http:HttpClient) { }

  getSearchResult(searchedItem:string):Observable<SearchItem[]>{
    return this.http.get<SearchItem[]>(this.URL+'?q='+searchedItem);
  }
}
