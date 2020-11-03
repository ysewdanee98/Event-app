import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss']
})
export class Form2Component implements OnInit {
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  @Output("form") emitter = new EventEmitter();

  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      form2DropDown1CitySelected: ['', Validators.required],
      form2DropDown2VenueSelected:  ['', Validators.required],
      form2AddressCtrl: ['', Validators.required],
      form2ButtonTogglePriceCtrl: new FormControl('',[Validators.required]),
      form2PricingItems: ['', Validators.required],
      form2TicketName: ['', Validators.required],
      form2TicketPrice: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      form2TicketCurrency: ['', Validators.required]
    });
    this.emitter.emit(this.secondFormGroup);
  }

  get form2() { return this.secondFormGroup.controls; }

  form2Cities: { city: string, venues: string[] }[] = [
    { "city": "Port Louis District", "venues": ['Mauritius Tourism Promotion Authority', 'Le Suffren Hotel & Marina', 'Labourdonnais Waterfront Hotel', 'Le Saint George Hotel', 'Royal Park'] },
    { "city": "Pamplemousses District", "venues": ['Mont Choisy Hotel', 'Angsana Balaclava Mauritius', 'Hotel Ravenala Attitude', 'Maritim Hotel Mauritius', 'Indian Resort & Spa'] },
    { "city": "Rivière du Rempart District", "venues": ['Villa Kreola', 'Lux Grand Gaube', 'Blumarine Attitude Hotel', 'Centara Grand Azuri Residence & Suites Mauritius', 'Zilwa Attitude'] },
    { "city": "Moka District", "venues": ['Trianon Convention Centre', 'Voila Bagatelle', 'Gold Crest Hotel', 'Hennessy Park Hotel', 'Mauritius Tourism Promotion Authority'] },
    { "city": "Plaines Wilhems District", "venues": ['El Monaco Hotel', 'Gold Crest Hotel', 'Trianon Convention Centre', 'Hennessy Park Hotel', 'Voila Bagatelle'] },
    { "city": "Black River District", "venues": ['Tamarin Hotel', 'Sands Resort & Spa', 'Lakaz Chamarel', 'Tamarina By Mauritius Boutique Hotel', 'Maradiva Villas Resort And Spa'] },
    { "city": "Savanne District", "venues": ['Shanti Maurice Resort', 'Sofitel So Mauritius', 'Outrigger Mauritius Resort and Spa - A KSL Resort', 'Heritage Awali Golf & Spa Resort', 'Villas Valriche'] },
    { "city": "Grand Port District", "venues": ['Holiday Inn Mauritius Mon Tresor', 'Preskil Beach Resort', 'Shandrani Beachcomber Resort & Spa', 'Anantara Iko Mauritius Resort & Villas', 'Blue Lagoon Beach Hotel'] }
  ];

  form2DropDown1CitySelected: string = null;
  form2DropDown1CityOnSelectionChanged(event){
    if(event.isUserInput){
      // console.log(event.source.viewValue, event.source.selected);
      this.form2DropDown1CitySelected = event.source.value;
      if (this.form2DropDown1CitySelected == undefined) {
        this.form2DropDown1CitySelected = null;
        this.secondFormGroup.get("form2AddressCtrl").setValidators([Validators.required]);
        this.secondFormGroup.get("form2DropDown1CitySelected").setValidators(null);
        this.secondFormGroup.get("form2DropDown2VenueSelected").setValidators(null);
        this.secondFormGroup.get("form2DropDown2VenueSelected").setValue(null);
      } else {
        this.secondFormGroup.get("form2AddressCtrl").setValidators(null);
        this.secondFormGroup.get("form2AddressCtrl").setValue(null);
        this.secondFormGroup.get("form2DropDown1CitySelected").setValidators([Validators.required]);
        this.secondFormGroup.get("form2DropDown2VenueSelected").setValidators([Validators.required]);
      }
      this.secondFormGroup.patchValue({form2DropDown1CitySelected: this.form2DropDown1CitySelected})
      console.log(this.form2DropDown1CitySelected);
      this.form2Venues = [];
      this.form2DropDown2VenueSelected = null;
      this.form2Venues = this.form2Cities.filter(e => e.city == this.form2DropDown1CitySelected);
      console.log(this.form2Venues);
    }
    this.secondFormGroup.get("form2AddressCtrl").updateValueAndValidity();
    this.secondFormGroup.get("form2DropDown1CitySelected").updateValueAndValidity();
    this.secondFormGroup.get("form2DropDown2VenueSelected").updateValueAndValidity();
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
      this.secondFormGroup.patchValue({form2DropDown2VenueSelected: this.form2DropDown2VenueSelected})
    }
  }

  form2AddressInputOnBlur(event) {
    let form2AddressSelected: string = "";
    form2AddressSelected = event.target.value;
    console.log(form2AddressSelected);
    if (form2AddressSelected.trim() != "") {
      this.secondFormGroup.get("form2AddressCtrl").setValidators([Validators.required]);
      this.secondFormGroup.get("form2DropDown1CitySelected").setValidators(null);
      this.secondFormGroup.get("form2DropDown2VenueSelected").setValidators(null);
      this.secondFormGroup.get("form2DropDown1CitySelected").setValue(null);
      this.secondFormGroup.get("form2DropDown2VenueSelected").setValue(null);
    }
    this.secondFormGroup.get("form2AddressCtrl").updateValueAndValidity();
    this.secondFormGroup.get("form2DropDown1CitySelected").updateValueAndValidity();
    this.secondFormGroup.get("form2DropDown2VenueSelected").updateValueAndValidity();
  }

  get form2MatButtonTogglePriceSelected(){
    return this.secondFormGroup.get('form2ButtonTogglePriceCtrl');
  }

  form2NoOfPricing: number = 0;
  form2OperationMatButtonTogglePrice(){
    if (this.form2.form2ButtonTogglePriceCtrl.value=='Free') {
      this.secondFormGroup.get("form2PricingItems").setValidators(null);
      this.secondFormGroup.get("form2PricingItems").setValue(null);
      this.secondFormGroup.get("form2TicketName").setValidators(null);
      this.secondFormGroup.get("form2TicketPrice").setValidators(null);
      this.secondFormGroup.get("form2TicketCurrency").setValidators(null);
      this.form2NoOfPricing = 0;
      this.form2PricingItems = [];
      this.form2TicketNameError = false;
      this.form2PriceError = false;
      this.form2CurrencyError = false;
    } else if (this.form2.form2ButtonTogglePriceCtrl.value=='Paid'){
      this.secondFormGroup.get("form2PricingItems").setValidators([Validators.required]);
      this.secondFormGroup.get("form2TicketName").setValidators([Validators.required]);
      this.secondFormGroup.get("form2TicketPrice").setValidators([Validators.required, Validators.pattern(/^[0-9]*$/)]);
      this.secondFormGroup.get("form2TicketCurrency").setValidators([Validators.required]);
      this.form2NoOfPricing = 1;
      this.form2PricingItems = [];
      // const form2PriceItemDetails: any = [];
      // form2PriceItemDetails.index = this.form2PricingItems.length;
      // form2PriceItemDetails.ticketName = "";
      // form2PriceItemDetails.price = 0;
      // form2PriceItemDetails.currency = "";
      // this.form2PricingItems.push(form2PriceItemDetails);
      this.addingItem();
      this.form2TicketNameError = true;
      // this.form2PriceError = true;
      this.form2CurrencyError = true;
      this.secondFormGroup.patchValue({form2PricingItems: this.form2PricingItems})
    }
    this.secondFormGroup.get("form2PricingItems").updateValueAndValidity();
    this.secondFormGroup.get("form2TicketName").updateValueAndValidity();
    this.secondFormGroup.get("form2TicketPrice").updateValueAndValidity();
    this.secondFormGroup.get("form2TicketCurrency").updateValueAndValidity();
  }

  form2PricingItems: {index: number, ticketName: string, price: number, currency: string}[] = [];

  form2OperationNoofPricing(getOperation: string){
    if (getOperation == "Minus") {
      if (this.form2NoOfPricing == 1) {
        this.form2NoOfPricing = 1;
      } else {
        this.form2NoOfPricing = this.form2NoOfPricing -1;
        this.form2PricingItems.pop();
      }
    } else if (getOperation == "Add") {
      this.form2NoOfPricing = this.form2NoOfPricing +1;
      // const form2PriceItemDetails: any = [];
      // form2PriceItemDetails.index = this.form2PricingItems.length;
      // form2PriceItemDetails.ticketName = "";
      // form2PriceItemDetails.price = 0;
      // form2PriceItemDetails.currency = "";
      // console.log(form2PriceItemDetails);
      // this.form2PricingItems.push(form2PriceItemDetails);
      this.addingItem();
      this.form2TicketNameError = true;
      // this.form2PriceError = true;
      this.form2CurrencyError = true;
    }
    console.log(this.form2NoOfPricing);
    console.log(this.form2PricingItems);
    this.secondFormGroup.patchValue({form2PricingItems: this.form2PricingItems})
  }

  addingItem(){
    const form2PriceItemDetails: any = [];
    form2PriceItemDetails.index = this.form2PricingItems.length;
    form2PriceItemDetails.ticketName = this.secondFormGroup.get("form2TicketName").value;
    form2PriceItemDetails.price = this.secondFormGroup.get("form2TicketPrice").value;
    form2PriceItemDetails.currency = this.secondFormGroup.get("form2TicketCurrency").value;
    console.log(form2PriceItemDetails);
    this.form2PricingItems.push(form2PriceItemDetails);
  }

  form2PriceCurrencies: { currency: string}[] = [
    { "currency": "Mauritian rupee" },
    { "currency": "Indian rupee" },
    { "currency": "Euro" },
    { "currency": "United States dollar" },
    { "currency": "Singapore dollar" },
    { "currency": "Canadian dollar" }
  ];

  form2CurrencyError: boolean = false;
  form2DropDown3CurrencyOnSelectionChanged(event, item){
    let form2DropDown3CurrencySelected: string = "";
    if(event.isUserInput){
      form2DropDown3CurrencySelected = event.source.value;
      console.log(form2DropDown3CurrencySelected);
      if (form2DropDown3CurrencySelected == undefined) {
        this.secondFormGroup.get("form2TicketCurrency").setValue(null);
        this.form2CurrencyError = true;
      } else {
        this.form2CurrencyError = false;
        let index = this.form2PricingItems.indexOf(item);
        item.currency = form2DropDown3CurrencySelected;
        this.form2PricingItems[index] = item;
        console.log(this.form2PricingItems);
      }
    }
    this.secondFormGroup.get("form2TicketCurrency").updateValueAndValidity();
  }

  form2TicketNameError: boolean = false;
  form2TicketNameInputOnBlur(event: any, item){
    let form2TicketNameSelected: string = "";
    form2TicketNameSelected = event.target.value;
    console.log(form2TicketNameSelected);
    if (form2TicketNameSelected.trim() == "") {
      this.form2TicketNameError = true;
      this.secondFormGroup.get("form2TicketName").setValue(null);
    } else {
      this.form2TicketNameError = false;
      let index = this.form2PricingItems.indexOf(item);
      item.ticketName = form2TicketNameSelected.trim();
      this.form2PricingItems[index] = item;
      console.log(this.form2PricingItems);
    }
    this.secondFormGroup.get("form2TicketName").updateValueAndValidity();
  }

  form2PriceError: boolean = false;
  form2PriceInputOnBlur(event: any, item){
    let form2PriceSelected: number = Number(event.target.value);
    // form2PriceSelected = event.target.value;
    if (typeof(form2PriceSelected) != 'number') {
      this.form2PriceError = true;
    } else if(form2PriceSelected.toString() == "NaN") {
      this.form2PriceError = true;
    } else {
      this.form2PriceError = false;
      let index = this.form2PricingItems.indexOf(item);
      item.price = form2PriceSelected;
      this.form2PricingItems[index] = item;
      console.log(this.form2PricingItems);
    }
  }

  form2ShowError: boolean;
  form2GoForward(){
    console.log(this.secondFormGroup);
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
      } else if(this.form2TicketNameError == true || this.form2PriceError == true || this.form2CurrencyError == true) {
        this.form2ShowError = true;
        console.log(this.form2ShowError);
        console.log("Problem variable");
      } else {
        this.form2ShowError = false;
        // console.log(this.form2PricingItems);
        this.emitter.emit(this.secondFormGroup);
      }
    }
  }

}
