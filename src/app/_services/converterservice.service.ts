import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterserviceService {

  constructor() { }

  public listHistory:any=[];

 public getListHistory(){
    return this.listHistory;
  }

  public unshiftHistory(item:any){
    this.listHistory.unshift(item);
  }

  public clearHistory(){
    this.listHistory=[] as any;
  }
}
