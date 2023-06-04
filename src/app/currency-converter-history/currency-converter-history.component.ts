import { Component, OnInit } from '@angular/core';
import { ConverterserviceService } from '../_services/converterservice.service';

@Component({
  selector: 'app-currency-converter-history',
  templateUrl: './currency-converter-history.component.html',
  styleUrls: ['./currency-converter-history.component.css']
})
export class CurrencyConverterHistoryComponent implements OnInit {

  constructor(private ConverterService:ConverterserviceService) { }

  listHistory:any;

  ngOnInit(): void {
    this.listHistory = this.ConverterService.getListHistory();
  }

  clearHistory() {

    this.ConverterService.clearHistory();
    this.listHistory = this.ConverterService.getListHistory();
  }

}
