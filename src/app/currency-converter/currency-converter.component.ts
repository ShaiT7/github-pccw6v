import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConverterserviceService } from '../_services/converterservice.service';
import { NgModule } from '@angular/core';
import { FormControl , FormGroup, FormsModule, FormGroupDirective, NgForm, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ApiServiceExchangeData } from '../_services/api.service.GetExchangeData';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

// app
import { browserRefresh } from '../app.component';

/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})

export class CurrencyConverterComponent implements OnInit {
  
  form!: FormGroup;

  public browserRefresh!: boolean;

  inputValueFC = new FormControl('', [Validators.required]);
  ddCurrencyFrom = new FormControl('', [Validators.required]);
  ddCurrencyTo = new FormControl('', [Validators.required]);

  // matcher = new MyErrorStateMatcher();

  // !!!
  // form = new FormGroup({
  //   inputValueFC: new FormControl('', [Validators.required]),
  //   ddCurrencyFrom: new FormControl('', [Validators.required]),
  //   ddCurrencyTo: new FormControl('', [Validators.required]),
  // });

  constructor(private fb:FormBuilder, private http:HttpClient, private ConverterService:ConverterserviceService, private api: ApiServiceExchangeData) { }

  numCur: number = 1;

  config: any;
  JsonCurrencyData: any;
  fromList: any;
  toList: any;

  listHistory: any = [];
  result:any={
    value:"",
    from:"",
    to:"",
    total:""
  };
  fromChoosen: string = "";
  toChoosen: string = "";

  ngOnInit(): void {

    this.browserRefresh = browserRefresh;
    
    this.form = this.fb.group({
      inputValueFC: ['', [Validators.required]],
      ddCurrencyFrom: ['', [Validators.required]],
      ddCurrencyTo: ['', [Validators.required]],
    })

    // very old read from api
    // this.getConfig().subscribe((data:any) => {
    //   this.config={...data};
    //   this.getJson().subscribe((data: any) => {
    //     this.JsonCurrencyData ={... data};
    //     this.getFromList();
    //     this.getToList();
    //   });
    // },
    //   (error:HttpErrorResponse)=>{console.log("Error"); this.showWarning();}
    // );

    // old api
    // this.api.get('users?page=1').subscribe((res: any) => {
    //   this.users = res;
    //   console.log('data response', this.users);
    // });

    this.api.get().subscribe((res: any) => {

      //console.log('data response', res);

      this.JsonCurrencyData ={...res};
      this.getFromList();
      this.getToList();

    });

    if (browserRefresh == false) {

      // Memory

      try {
        this.form.get('inputValueFC')!.setValue(localStorage.getItem("value"));
        this.form.get('ddCurrencyFrom')!.setValue(localStorage.getItem("fromChoosen"));
        this.form.get('ddCurrencyTo')!.setValue(localStorage.getItem("toChoosen"));
        this.fromChoosen = localStorage.getItem("fromChoosen")!.toString();
        this.toChoosen = localStorage.getItem("toChoosen")!.toString();
      }
      catch (e){}

    } else {

        try {
          localStorage.removeItem("value");

          this.form.get('inputValueFC')!.setValue("");

          // if we need memory of Currencies
          this.form.get('ddCurrencyFrom')!.setValue(localStorage.getItem("fromChoosen"));
          this.form.get('ddCurrencyTo')!.setValue(localStorage.getItem("toChoosen"));
          this.fromChoosen = localStorage.getItem("fromChoosen")!.toString();
          this.toChoosen = localStorage.getItem("toChoosen")!.toString();
        }
        catch (e){}

    }

  }

  configUrl = 'assets/configConverterService.json';
 
  showWarning() {
      alert("Error communication to API");
  }

  getConfig() {
    return this.http.get<any>(this.configUrl);
  }

  getJson(){
    console.log(this.config["url"]);
    return this.http.get<any>(this.config["url"]);
  }

  getFromList(){
    this.fromList=[];
    // this.fromList = [this.JsonCurrencyData.base];
    Object.keys(this.JsonCurrencyData.rates).forEach(key => {
      this.fromList.push(key);
    });
  };

  getToList(){
    this.toList=[];
    Object.keys(this.JsonCurrencyData.rates).forEach(key => {
      this.toList.push(key);
    });
    // console.log(this.toList);
  };

  // clearHistory() {

  //   //this.listHistory = [] as any;

  //   this.result={
  //     value:"",
  //     from:"",
  //     to:"",
  //     total:""
  //   };

  // }

  inputOnChange(value:string) {
    let ChosCur:number;
    let total:number;

    if (this.fromChoosen != this.JsonCurrencyData.base){
      total =parseInt(value)/this.JsonCurrencyData.rates[this.fromChoosen]* this.JsonCurrencyData.rates[this.toChoosen];
    }
    else{
     ChosCur = this.JsonCurrencyData.rates[this.toChoosen];
     total = ChosCur * parseInt(value);
    }

    // this.listHistory.push({
    //   value:event.target.value,
    //   from:this.fromChoosen,
    //   to:this.toChoosen,
    //   total:total
    // });

    if (isNaN(total)) {
        //alert("please choose Currency");
    } else {

      this.result={
        value:value,
        from:this.fromChoosen,
        to:this.toChoosen,
        total:total
      };

      // this.listHistory.unshift(this.result);
      this.ConverterService.unshiftHistory(this.result);

      // Memory
      localStorage.setItem('value', value);
      localStorage.setItem('fromChoosen', this.fromChoosen);
      localStorage.setItem('toChoosen', this.toChoosen);

    }

  }
  
  // onSubmit(){
  //   //checks if form is valid
  //      if( this.form.valid){
  //         alert("form is nvalid");
  //       }
  // }

  public sendEmail(e: Event) {
    
    //e.preventDefault();
    emailjs.sendForm('service_fkgnt8b', 'template_cql03f9', e.target as HTMLFormElement, "user_tiH12CLi34Wa581kB00rG")
      .then((result: EmailJSResponseStatus) => {
        //console.log(result.text);
      }, (error) => {
        //console.log(error.text);
      });
  }

  findInvalidControls(value:string) {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
        if (!controls[name].valid) {
            //alert(name);
            invalid.push(name);
        }
    }
    console.log(invalid);

    if (invalid.length==0) {
      this.inputOnChange(value);
    }

    return invalid;
  }

}
