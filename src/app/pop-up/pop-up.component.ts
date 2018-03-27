import {Component, Input, ViewChild, OnInit } from '@angular/core';
import { IDisplayComponent, DisplayComponent } from '../dynamic-display/IDisplayComponent';
import { DynamicComponent } from '../dynamic-display/DynamicComponent';
import { DynamicDirective } from '../dynamic-display/DynamicContent.directive';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  @Input() tabs: DynamicComponent[];
  @Input() Title: string;
  @ViewChild(DynamicDirective) tabDirective: DynamicDirective;
  selectedTabName = null;

  constructor() { }
  
  loadComponents() {
    const viewContainerRef = this.tabDirective.viewContainerRef;
    viewContainerRef.clear();
    let isFirst = true;
    for (const tabcomp of this.tabs) {
      tabcomp.CreateComponent(viewContainerRef);            
      if (isFirst) {
        this.selectedTabName = tabcomp.getName();
        tabcomp.Show();
        isFirst = false;
      }
      
    }
  }

  selectTab(tab: DynamicComponent) {
    this.tabs.map((tab) => {
      tab.Hide();
    });
    tab.Show();
    this.selectedTabName = tab.getName();    
  }

  ngOnInit() {
    this.loadComponents();
  }
}
