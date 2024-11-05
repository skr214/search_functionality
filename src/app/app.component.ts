import { AfterViewInit, Component, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { SearchServiceService } from './search-service.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchItem } from './models/search.item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,HttpClientModule,CommonModule],
  providers : [SearchServiceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  
  title = 'search_functionality';

  searchList: SearchItem[]=[];

  @ViewChild('serchForm')
  serchForm!: NgForm;

  constructor(private _searchServices:SearchServiceService){}

  ngAfterViewInit(): void {

    const formValue = this.serchForm.valueChanges;

    formValue?.pipe(
     //filter(()=> this.serchForm.invalid),
      map(data=>data['searchTerm']),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(data=> this._searchServices.getSearchResult(data))
    ).
    subscribe(res=>{
      console.log(res);
      this.searchList = res;
    }) 
  }
}
