import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedMenu :string;
  selectMenu(pText: string) {
    this.selectedMenu = pText;
    console.log(this.selectedMenu);
  }

  avatarClick(){
    console.log("Avatar clicked");
  }

  searchItem: string;
  searchforItem(){
    console.log(this.searchItem);
  }

}
