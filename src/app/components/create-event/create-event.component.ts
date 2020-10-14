import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      form1ButtonToggleCtrl: new FormControl('',[Validators.required]),
      form1DropDown1Ctrl: ['', Validators.required],
      form1DropDown2Ctrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    console.log(this.form1Categories);
  }

  get form1() { return this.firstFormGroup.controls; }

  form1Categories: { category: string, icon: string, subCategory: string[] }[] = [
    { "category": "Music", "icon": "album", "subCategory": ['Alternative Music', 'Blues', 'Classical Music', 'Country Music', 'Dance Music', 'Electronic Music', 'Hip Hop / RAP', 'Latin Music', 'Jazz', 'Opera', 'POP'] },
    { "category": "Food & Drink", "icon": "restaurant", "subCategory": ['Meat, Poultry & Seafood ', 'Fast Food', 'Fruits ', 'Vegetables'] },
    { "category": "Arts & Culture", "icon": "brush", "subCategory": ['Animation Art', 'Architecture', 'Body Art', 'Drawing', 'Graphic Art‎', 'Painting‎', 'Poster Art', 'Sculpture'] },
    { "category": "Parties & Nightlife", "icon": "cake", "subCategory": ['Dance Clubs', 'Live Music Venue', 'Sports-Themed Nightclubs‎', 'Dueling Piano Bars‎', 'Comedy Clubs‎', 'Adult Clubs‎'] },
    { "category": "Sports & Welness", "icon": "sports", "subCategory": ['Ball Sports', 'Endurance and Track', 'Combat and Strength Sports', 'Man Best Friends', 'Water, Ice and Snow', 'Gymnastics'] },
    { "category": "Networking & Classess", "icon": "laptop_windows", "subCategory": ['Industry-Specific Events', 'Round Tables', 'Work Breakfasts', 'After-Hours Events', 'Online Networking'] }
];

  form1CatetogorySelected: string = null;
  form1SubCategories: any = null;
  form1CategoryChosen(category: string){
    this.form1CatetogorySelected = category;
    console.log(this.form1CatetogorySelected);
    this.form1SubCategories = this.form1Categories.filter(e => e.category == this.form1CatetogorySelected);
    console.log(this.form1SubCategories);
  }

  form1SubCategorySelected: string = null;
  form1SubCategoryChosen(subcategory: string){
    this.form1SubCategorySelected = subcategory;
    console.log(this.form1SubCategorySelected);
  }

  get form1MatButtonToggleSelected(){
    return this.firstFormGroup.get('form1ButtonToggleCtrl');
  }

  form1DropDown1: any = [
    {value: 'Daily-0', viewValue: 'Daily', "dropDown2": ['Daily']},
    {value: 'Weekly-1', viewValue: 'Weekly', "dropDown2": ['Monday', 'Tuesday', 'Wesnesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']},
    {value: 'Monthly-2', viewValue: 'Monthly', "dropDown2": ['Every 1st day of the month', 'Every 15th day of the month', 'Every 29th day of the month']},
    {value: 'Yearly-3', viewValue: 'Yearly', "dropDown2": ['Every January', 'Every February', 'Every March', 'Every April', 'Every October', 'Every November', 'Every December']}
  ];

  form1DropDown1Selected: string = null;
  form1DropDown2: any = null;
  form1DropDown1OnSelectionChanged(event){
    if(event.isUserInput){
      // console.log(event.source.viewValue, event.source.selected);
      this.form1DropDown1Selected = event.source.viewValue;
      console.log(this.form1DropDown1Selected);
      this.form1DropDown2 = this.form1DropDown1.filter(e => e.viewValue == this.form1DropDown1Selected);
      console.log(this.form1DropDown2);
    }
  }

  form1DropDown2Selected: string = null;
  form1DropDown2OnSelectionChanged(event){
    if(event.isUserInput){
      this.form1DropDown2Selected = event.source.viewValue;
      console.log(this.form1DropDown2Selected);
    }
  }

  checkIfForm1Ok(){
    if (this.firstFormGroup.invalid) {
      console.log("Something Wrong!");
    } else {
      console.log("Public or Private? "+this.form1.form1ButtonToggleCtrl.value);
    }
  }

}
