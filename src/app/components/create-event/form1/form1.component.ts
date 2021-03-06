import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss']
})
export class Form1Component implements OnInit {
  firstFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public datepipe: DatePipe) { }

  @Output("form") emitter = new EventEmitter();

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      form1Category: ['', Validators.required],
      form1SubCategory:['', Validators.required],
      form1ButtonToggleCtrl: new FormControl('',[Validators.required]),
      form1DropDown1Ctrl: ['', Validators.required],
      form1DropDown2Ctrl: ['', Validators.required],
      form1StartDate: ['', Validators.required],
      form1EndDate: ['', Validators.required],
      form1StartTime: ['', Validators.required],
      form1EndTime: ['', Validators.required],
      form1EventTitleCtrl: ['', Validators.required],
      form1EventAboutCtrl: ['', Validators.required],
      form1EventPictures: ['', Validators.required]
    });
    this.emitter.emit(this.firstFormGroup);
    this.form1ShowError = false;
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
    this.firstFormGroup.patchValue({form1Category: category})
    console.log(this.form1CatetogorySelected);
    this.form1SubCategories = this.form1Categories.filter(e => e.category == this.form1CatetogorySelected);
    console.log(this.form1SubCategories);
  }

  form1SubCategorySelected: string = null;
  form1SubCategoryChosen(subcategory: string){
    this.form1SubCategorySelected = subcategory;
    this.firstFormGroup.patchValue({form1SubCategory: subcategory})
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
  form1DropDown1OnSelectionChanged(event){
    if(event.isUserInput){
      // console.log(event.source.viewValue, event.source.selected);
      this.form1DropDown1Selected = event.source.viewValue;
      console.log(this.form1DropDown1Selected);
      this.form1DropDown2 = [];
      this.form1DropDown2Selected = null;
      this.form1DropDown2 = this.form1DropDown1.filter(e => e.viewValue == this.form1DropDown1Selected);
      console.log(this.form1DropDown2);
    }
  }

  form1DropDown2: any = []
  form1DropDown2Selected: string = null;
  form1DropDown2OnSelectionChanged(event){
    if(event.isUserInput){
      this.form1DropDown2Selected = event.source.viewValue;
      console.log(this.form1DropDown2Selected);
    }
  }

  form1StartDate: string;
  form1StartDateEvent(event: MatDatepickerInputEvent<Date>) {
    // console.log(`${event.value}`);
    if (`${event.value}` == 'null') {
      this.form1StartDate ="Invalid date";
    } else {
      this.form1StartDate =this.datepipe.transform(`${event.value}`, 'yyyy-MM-dd');
      this.firstFormGroup.patchValue({form1StartDate: this.form1StartDate})
    }
    console.log(this.form1StartDate);
    // this.getNoOfDatesBetween();
  }

  form1EndDate: string;
  form1EndDateEvent(event: MatDatepickerInputEvent<Date>) {
    // console.log(`${event.value}`);
    if (`${event.value}` == 'null') {
      this.form1EndDate ="Invalid date";
    } else {
      this.form1EndDate =this.datepipe.transform(`${event.value}`, 'yyyy-MM-dd');
      this.firstFormGroup.patchValue({form1EndDate: this.form1EndDate})
    }
    console.log(this.form1EndDate);
    // this.getNoOfDatesBetween();
  }

  // noOfDatesBetween: string = "";
  // getNoOfDatesBetween(){
  //   let start = new Date(this.form1StartDate);
  //   let end = new Date(this.form1EndDate);
  //   this.noOfDatesBetween = Math.floor((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()) ) /(1000 * 60 * 60 * 24)) +" days";
  //   // console.log(Math.floor((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()) ) /(1000 * 60 * 60 * 24)));
  // }

  form1StartTime: string;
  form1StartTimeEvent(startT: string){
    this.form1StartTime = startT;
    this.firstFormGroup.patchValue({form1StartTime: this.form1StartTime})
    console.log(this.form1StartTime);
  }

  form1EndTime: string;
  form1EndTimeEvent(endTime: string){
    this.form1EndTime = endTime;
    this.firstFormGroup.patchValue({form1EndTime: this.form1EndTime})
    console.log(this.form1EndTime);
  }

  // eventPicture: File;
  // urlEventPicture: string;
  // onFileChanged(event) {
  //   console.log(event);
  //   this.eventPicture = event.target.files[0];
  //   console.log(event.target.files[0]);
  //   // console.log(this.eventPicture.name);
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.urlEventPicture = event.target.result as string;
  //       console.log(event.target.result);
  //     }
  //   }
  // }

  form1Files: any[] = [];

  //on file drop handler
  form1OnFileDropped($event) {
    this.form1PrepareFilesList($event);
  }

  //handle file from browsing
  form1FileBrowseHandler(files) {
    this.form1PrepareFilesList(files);
  }

  //Delete file from files list
  form1DeleteFile(index: number) {
    this.form1Files.splice(index, 1);
    if( this.form1Files.length == 0){
      this.firstFormGroup.patchValue({form1EventPictures: null})
    }
  }

  form1FileSize: number = 4;

  //Convert Files list to normal array list
  form1PrepareFilesList(files: Array<any>) {
    for (const item of files) {
      if (this.form1Files.length < this.form1FileSize) {
        var reader = new FileReader();
      // console.log(item);
      reader.readAsDataURL(item); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        item.picture = event.target.result as string;
        // console.log(item.picture);
      }
      this.form1Files.push(item);
      }
    }
     console.log(this.form1Files);
     this.firstFormGroup.patchValue({form1EventPictures: this.form1Files})
    }

  //format bytes
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  form1ShowError: boolean;
  form1GoForward(){
    console.log(this.firstFormGroup);
    if (this.firstFormGroup.invalid) {
      console.log("Invalid");
      this.form1ShowError = true;
      console.log(this.form1ShowError);
    } else {
      if (this.form1CatetogorySelected == null || this.form1SubCategorySelected == null ||
          this.form1DropDown2Selected == null ||
          this.form1StartDate == null || this.form1StartDate == "Invalid date" ||
          this.form1EndDate == null || this.form1EndDate == "Invalid date" ||
          this.form1StartDate > this.form1EndDate ||
          this.form1StartTime == null || this.form1EndTime == null ||
          this.form1StartTime == "" || this.form1EndTime == "" ||
          this.form1Files.length == 0) {
            this.form1ShowError = true;
            console.log(this.form1ShowError);
            console.log("Problem variable");
      } else {
        // console.log(this.form1.form1EventTitleCtrl.value);
        this.form1ShowError = false;
        this.emitter.emit(this.firstFormGroup);
      }
    }
  }

}
