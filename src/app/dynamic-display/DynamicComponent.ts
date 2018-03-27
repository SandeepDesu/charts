import { Type,ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { IbaseBuilder } from '../DataBuilders';
import { IDisplayComponent } from './IDisplayComponent';

export class DynamicComponent implements IDisplayComponent {
  
  protected componentType:Type<IDisplayComponent>;
  Source: IbaseBuilder;
  component: IDisplayComponent;
  
  constructor(comptype:Type<IDisplayComponent>, data:IbaseBuilder, private componentFactoryResolver: ComponentFactoryResolver) {    
    // this constructor looks goofy but the type has to come in because it doesn't exist until runtime...
    this.componentType = comptype;
    this.Source = data;    
  }
  
  getName(): string {
    return this.Source.getName();
  }  
  Hide():void {
    this.component.Hide();
  }
  Show():void {
    this.component.Show();
  }
  
  CreateComponent(viewref:ViewContainerRef): ComponentRef<IDisplayComponent> {
    // get a resolver to instantiate the component    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
    // The viewref will create the component and append it to the DOM 
    const componentRef = viewref.createComponent(componentFactory);
    
    // finish up by setting our local variable and return the completed component
    this.component = (<IDisplayComponent>componentRef.instance);
    this.component.Source = this.Source;
    
    return componentRef;
    
  }
  
  
  
  
}
