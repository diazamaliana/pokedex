import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() searchModel: any;
  @Output() searchModelChange: EventEmitter<any> = new EventEmitter();
  
  faSearch = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

  updateSearchModel(value: any) {
    this.searchModel = value;
    this.searchModelChange.emit(this.searchModel);
  }
}
