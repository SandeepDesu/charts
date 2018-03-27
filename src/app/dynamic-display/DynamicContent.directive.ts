import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-dynamic-content]'
})
export class DynamicDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }

}
