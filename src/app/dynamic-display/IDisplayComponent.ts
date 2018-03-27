import { Input, OnInit, OnDestroy } from '@angular/core';
import { IbaseBuilder } from '../DataBuilders';


export interface IDisplayComponent  {
  Source: IbaseBuilder;  
  getName(): string;
  Hide():void;
  Show():void;
}

export abstract class DisplayComponent<T extends IbaseBuilder> implements IDisplayComponent, OnInit, OnDestroy {
  @Input() Source: T; // This must be an input because the HTML loads with inputs before constructors
  Hidden: boolean = true;
  
  constructor() {   }
  
  ngOnInit() {
    console.log("init base class");
    this.loadData();
  }
  ngOnDestroy() {
    
  }
  
  protected abstract loadData():void;
  
  Hide():void {
    this.Hidden = true;
  }
  Show():void {
    this.Hidden = false;
  }
  
  getName():string {
    return this.Source.getName();
  }
  
  
}
