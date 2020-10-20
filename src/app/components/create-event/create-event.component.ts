import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      form1ButtonToggleCtrl: new FormControl('',[Validators.required]),
      form1DropDown1Ctrl: ['', Validators.required],
      form1DropDown2Ctrl: ['', Validators.required],
      form1EventTitleCtrl: ['', Validators.required],
      form1EventAboutCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      form2AddressCtrl: [],
      form2ButtonTogglePriceCtrl: new FormControl('',[Validators.required])
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
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
    console.log(this.form1StartTime);
  }

  form1EndTime: string;
  form1EndTimeEvent(endTime: string){
    this.form1EndTime = endTime;
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
  }

  //format bytes
  form1FormatBytes(bytes, decimals) {
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
  form1GoForward(stepper: MatStepper){
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
        stepper.next();
      }
    }
  }

  get form2() { return this.secondFormGroup.controls; }

  form2Cities: { city: string, venues: string[] }[] = [
    { "city": "Music", "venues": ['Alternative Music', 'Blues', 'Classical Music', 'Country Music', 'Dance Music', 'Electronic Music', 'Hip Hop / RAP', 'Latin Music', 'Jazz', 'Opera', 'POP'] }
  ];

  form2DropDown1CitySelected: string = null;
  form2DropDown1CityOnSelectionChanged(event){
    if(event.isUserInput){
      // console.log(event.source.viewValue, event.source.selected);
      this.form2DropDown1CitySelected = event.source.value;
      if (this.form2DropDown1CitySelected == undefined) {
        this.form2DropDown1CitySelected = null;
      }
      console.log(this.form2DropDown1CitySelected);
      this.form2Venues = [];
      this.form2DropDown2VenueSelected = null;
      this.form2Venues = this.form2Cities.filter(e => e.city == this.form2DropDown1CitySelected);
      console.log(this.form2Venues);
    }
  }

  form2Venues: any = []
  form2DropDown2VenueSelected: string = null;
  form2DropDown2VenueOnSelectionChanged(event){
    if(event.isUserInput){
      this.form2DropDown2VenueSelected = event.source.value;
      if (this.form2DropDown2VenueSelected == undefined) {
        this.form2DropDown2VenueSelected = null;
      }
      console.log(this.form2DropDown2VenueSelected);
    }
  }

  get form2MatButtonTogglePriceSelected(){
    return this.secondFormGroup.get('form2ButtonTogglePriceCtrl');
  }

  noOfPricing: number = 0;
  form2OperationMatButtonTogglePrice(){
    if (this.form2.form2ButtonTogglePriceCtrl.value=='Free') {
      this.noOfPricing = 0;
      this.form2PricingItems = [];
    } else if (this.form2.form2ButtonTogglePriceCtrl.value=='Paid'){
      this.noOfPricing = 1;
      const form2PriceItemDetails: any = [];
      form2PriceItemDetails.index = this.form2PricingItems.length;
      form2PriceItemDetails.ticketName = "";
      form2PriceItemDetails.price = 0;
      form2PriceItemDetails.currency = "";
      this.form2PricingItems.push(form2PriceItemDetails);
    }
  }

  form2PricingItems: {index: number, ticketName: string, price: number, currency: string}[] = [];

  form2OperationNoofPricing(getOperation: string){
    if (getOperation == "Minus") {
      if (this.noOfPricing == 1) {
        this.noOfPricing = 1;
      } else {
        this.noOfPricing = this.noOfPricing -1;
        this.form2PricingItems.pop();
      }
    } else if (getOperation == "Add") {
      this.noOfPricing = this.noOfPricing +1;
      const form2PriceItemDetails: any = [];
      form2PriceItemDetails.index = this.form2PricingItems.length;
      form2PriceItemDetails.ticketName = "";
      form2PriceItemDetails.price = 0;
      form2PriceItemDetails.currency = "";
      console.log(form2PriceItemDetails);
      this.form2PricingItems.push(form2PriceItemDetails);
    }
    console.log(this.noOfPricing);
    console.log(this.form2PricingItems);
  }

  form2PriceCurrencies: { currency: string}[] = [
    { "currency": "Mauritian rupee" },
    { "currency": "Indian rupee" },
    { "currency": "Euro" },
    { "currency": "United States dollar" },
    { "currency": "Singapore dollar" },
    { "currency": "Canadian dollar" }
  ];

  form2DropDown3CurrencyOnSelectionChanged(event, item){
    let form2DropDown3CurrencySelected: string = "";
    if(event.isUserInput){
      form2DropDown3CurrencySelected = event.source.value;
      // console.log(form2DropDown3CurrencySelected);
      let index = this.form2PricingItems.indexOf(item);
      item.currency = form2DropDown3CurrencySelected;
      this.form2PricingItems[index] = item;
      console.log(this.form2PricingItems);
    }
  }

  form2TicketNameInputOnBlur(event: any, item){
    let form2TicketNameSelected: string = "";
    form2TicketNameSelected = event.target.value;
    let index = this.form2PricingItems.indexOf(item);
    item.ticketName = form2TicketNameSelected;
    this.form2PricingItems[index] = item;
    console.log(this.form2PricingItems);
  }

  form2PriceInputOnBlur(event: any, item){
    let form2PriceSelected: number = 0;
    form2PriceSelected = event.target.value;
    let index = this.form2PricingItems.indexOf(item);
    item.price = form2PriceSelected;
    this.form2PricingItems[index] = item;
    console.log(this.form2PricingItems);
  }







  form2ShowError: boolean;
  form2GoForward(stepper: MatStepper){
    if (this.secondFormGroup.invalid) {
      console.log("Invalid");
      this.form2ShowError = true;
      console.log(this.form2ShowError);
    } else {
      if (this.form2DropDown1CitySelected == null && (this.form2.form2AddressCtrl.value == "" || this.form2.form2AddressCtrl.value == null)) {
          this.form2ShowError = true;
          console.log(this.form2ShowError);
          console.log("Problem variable");
      } else if(this.form2DropDown1CitySelected != null && this.form2DropDown2VenueSelected == null) {
          this.form2ShowError = true;
          console.log(this.form2ShowError);
          console.log("Problem variable");
      } else {
        // console.log(this.form1.form1EventTitleCtrl.value);
        this.form2ShowError = false;
        console.log(this.form2PricingItems);
        stepper.next();
      }
    }
  }

}
