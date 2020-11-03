import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.scss']
})
export class Form3Component implements OnInit {
  thirdFormGroup: FormGroup;

  @Output("form") emitter = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.thirdFormGroup = this._formBuilder.group({
      form3RadioButtonCtrl: new FormControl('',[Validators.required]),
      form3NoOfPeopleExpected: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      form3NoOfSpecialGuests: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      form3SpecialGuests: ['', Validators.required],
      form3GuestName: ['', Validators.required],
      form3GuestsPictures: [[]],
      form3AdditionalInfoCtrl: [],
      form3ButtonToggleAuthorityCtrl: new FormControl('',[Validators.required]),
      form3AuthoritySelected: ['', Validators.required]
    });
    this.thirdFormGroup.get("form3NoOfPeopleExpected").setValue(100);
    this.thirdFormGroup.get("form3NoOfSpecialGuests").setValue(1);
    this.thirdFormGroup.get("form3NoOfPeopleExpected").updateValueAndValidity();
    this.thirdFormGroup.get("form3NoOfSpecialGuests").updateValueAndValidity();
    this.thirdFormGroup.patchValue({form3SpecialGuests: this.form3SpecialGuests});
    this.emitter.emit(this.thirdFormGroup);
  }

  get form3() { return this.thirdFormGroup.controls; }

  form3Restrictions: string[] = ['None', 'Children Only', 'Women Only', 'No children', "Event 18 +", "Senior Citizen"];

  get form3MatRadioButtonSelected(){
    return this.thirdFormGroup.get('form3RadioButtonCtrl');
  }

  form3NoOfPeopleExpected: number;
  form3OperationNoofPeopleExpected(getOperation: string){
    if (getOperation == "Minus") {
      if (this.form3NoOfPeopleExpected == 0) {
        this.form3NoOfPeopleExpected = 0;
      } else if (this.form3NoOfPeopleExpected < 0) {
        this.form3NoofPeopleExpectedError = true;
      } else {
        this.form3NoOfPeopleExpected = this.form3NoOfPeopleExpected -1;
      }
    } else if (getOperation == "Add") {
      this.form3NoOfPeopleExpected = this.form3NoOfPeopleExpected +1;
    }
    this.form3NoofPeopleExpectedError = false;
    console.log(this.form3NoOfPeopleExpected);
    this.thirdFormGroup.patchValue({form3NoOfPeopleExpected: this.form3NoOfPeopleExpected})
  }

  form3NoofPeopleExpectedError: boolean = false;
  form3NoofPeopleExpectedInputOnBlur(event){
    console.log(event.target.value);
    let form3PeopleSelected: number = Number(event.target.value);
    if (typeof(form3PeopleSelected) != 'number') {
      this.form3NoofPeopleExpectedError = true;
    } else if(form3PeopleSelected.toString() == "NaN") {
      this.form3NoofPeopleExpectedError = true;
    } else if(form3PeopleSelected < 0) {
      this.form3NoofPeopleExpectedError = true;
    }else {
      this.form3NoOfPeopleExpected = form3PeopleSelected;
      this.form3NoofPeopleExpectedError = false;
    }
    this.thirdFormGroup.patchValue({form3NoOfPeopleExpected: this.form3NoOfPeopleExpected})
  }

  form3NoOfSpecialGuests: number = 1;
  form3SpecialGuests: {index: number, name: string}[] = [{index:0, name: ""}];
  form3OperationNoOfSpecialGuests(getOperation: string){
    if (getOperation == "Minus") {
      if (this.form3NoOfSpecialGuests == 1 || this.form3NoOfSpecialGuests == 0) {
        this.form3NoOfSpecialGuests = 0;
        this.form3GuestNameError = false;
        this.form3SpecialGuests.pop();
        this.thirdFormGroup.get("form3GuestName").setValidators(null);
        console.log("No of guests: 0");
        this.thirdFormGroup.get("form3SpecialGuests").setValidators(null);
        this.thirdFormGroup.get("form3SpecialGuests").setValue(null);
      } else {
        this.form3NoOfSpecialGuests = this.form3NoOfSpecialGuests -1;
        this.form3SpecialGuests.pop();
      }
    } else if (getOperation == "Add") {
      this.form3NoOfSpecialGuests = this.form3NoOfSpecialGuests +1;
      const form3GuestDetails: any = [];
      form3GuestDetails.index = this.form3SpecialGuests.length;
      form3GuestDetails.name = this.thirdFormGroup.get("form3GuestName").value;
      console.log(form3GuestDetails);
      this.form3SpecialGuests.push(form3GuestDetails);
      this.form3GuestNameError = true;
      this.thirdFormGroup.get("form3GuestName").setValidators([Validators.required]);
      this.thirdFormGroup.get("form3SpecialGuests").setValidators([Validators.required]);
    }
    this.form3FileSize = this.form3NoOfSpecialGuests;
    console.log(this.form3SpecialGuests);
    this.thirdFormGroup.get("form3GuestName").updateValueAndValidity();
    this.thirdFormGroup.get("form3SpecialGuests").updateValueAndValidity();
    this.thirdFormGroup.patchValue({form3NoOfSpecialGuests: this.form3NoOfSpecialGuests});
    this.thirdFormGroup.patchValue({form3SpecialGuests: this.form3SpecialGuests});
  }

  form3GuestNameError: boolean = true;
  form3GuestNameInputOnBlur(event, guest){
    let form3NameSelected: string = "";
    form3NameSelected = event.target.value;
    console.log(form3NameSelected);
    if (form3NameSelected.trim() == "") {
      this.form3GuestNameError = true;
      this.thirdFormGroup.get("form3GuestName").setValue(null);
    } else {
      this.form3GuestNameError = false;
      let index = this.form3SpecialGuests.indexOf(guest);
      guest.name = form3NameSelected.trim();
      this.form3SpecialGuests[index] = guest;
      console.log(this.form3SpecialGuests);
    }
    this.thirdFormGroup.get("form3GuestName").updateValueAndValidity();
  }

  form3Files: any[] = [];

  //on file drop handler
  form3OnFileDropped($event) {
    this.form3PrepareFilesList($event);
  }

  //handle file from browsing
  form3FileBrowseHandler(files) {
    this.form3PrepareFilesList(files);
  }

  //Delete file from files list
  form3DeleteFile(index: number) {
    this.form3Files.splice(index, 1);
    if( this.form3Files.length == 0){
      this.thirdFormGroup.patchValue({form3GuestsPictures: []})
    }
  }

  form3FileSize: number = this.form3NoOfSpecialGuests;

  //Convert Files list to normal array list
  form3PrepareFilesList(files: Array<any>) {
    for (const item of files) {
      if (this.form3Files.length < this.form3FileSize) {
        var reader = new FileReader();
      // console.log(item);
      reader.readAsDataURL(item); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        item.picture = event.target.result as string;
        // console.log(item.picture);
      }
      this.form3Files.push(item);
      }
    }
     console.log(this.form3Files);
     this.thirdFormGroup.patchValue({form3GuestsPictures: this.form3Files})
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

  get form3MatButtonToggleAuthoritySelected(){
    return this.thirdFormGroup.get('form3ButtonToggleAuthorityCtrl');
  }

  form3AuthorityError: boolean = true;
  form3OperationMatButtonToggleAuthority(){
    if (this.form3.form3ButtonToggleAuthorityCtrl.value=='No') {
      this.form3AuthoritySelected = "";
      this.form3AuthorityError = false;
      this.thirdFormGroup.get("form3AuthoritySelected").setValidators(null);
      this.thirdFormGroup.get("form3AuthoritySelected").setValue(null);
    } else if (this.form3.form3ButtonToggleAuthorityCtrl.value=='Yes'){
      this.form3AuthorityError = true;
      this.thirdFormGroup.get("form3AuthoritySelected").setValidators([Validators.required]);
    }
    this.thirdFormGroup.get("form3AuthoritySelected").updateValueAndValidity();
    console.log(this.form3AuthorityError);
  }

  form3Authorties: string[] = ['Police', 'Fire Department', 'Traffic Control'];

  form3AuthoritySelected: string = "";
  form3ChangeAuthority(event){
    console.log(event.source.value);
    this.form3AuthoritySelected = event.source.value;
    this.form3AuthorityError = false;
    this.thirdFormGroup.patchValue({form3AuthoritySelected: this.form3AuthoritySelected});
  }

  form3ShowError: boolean;
  form3GoForward(){
    console.log(this.thirdFormGroup);
    if (this.thirdFormGroup.invalid) {
      console.log("Invalid");
      this.form3ShowError = true;
      console.log(this.form3ShowError);
    } else {
      if (this.form3NoofPeopleExpectedError == true || this.form3NoOfPeopleExpected < 0 ||
          this.form3GuestNameError == true || this.form3AuthorityError == true) {
            this.form3ShowError = true;
            console.log(this.form3ShowError);
            console.log("Problem variable");
      } else {
        // console.log(this.form3.form3RadioButtonCtrl.value);
        // console.log(this.form3.form3AdditionalInfoCtrl.value);
        this.form3ShowError = false;
        this.emitter.emit(this.thirdFormGroup);
      }
    }
  }

}
