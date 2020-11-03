import { DatePipe } from '@angular/common';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.component.html',
  styleUrls: ['./form4.component.scss']
})
export class Form4Component implements OnInit {
  summaryFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.summaryFormGroup = this._formBuilder.group({
      summaryTermConditionRadioButtonCtrl: new FormControl('',[Validators.required])
    });
  }

  get summaryTermConditionRadioButtonSelected(){
    return this.summaryFormGroup.get('summaryTermConditionRadioButtonCtrl');
  }

  summaryShowError: boolean;
  summaryGoForward(){
    if (this.summaryFormGroup.invalid) {
      console.log("Invalid");
      this.summaryShowError = true;
      console.log(this.summaryShowError);
    } else {
      this.summaryShowError = false;
      console.log("Done");
      console.log(this.form1);
      console.log(this.form2);
      console.log(this.form3);
    }
  }

  @Input() form1: FormGroup;
  @Input() form2: FormGroup;
  @Input() form3: FormGroup;

}
