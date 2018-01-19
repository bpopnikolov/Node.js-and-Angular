
import { Directive, OnInit, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  @HostBinding('class.open') isOpen: boolean = false;

  constructor() {

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

}
