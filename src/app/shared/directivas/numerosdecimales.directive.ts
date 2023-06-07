import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumerosdecimales]'
})
export class NumerosdecimalesDirective {

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  

  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  /**
   * This is a constructor function that takes in an ElementRef object as a parameter and assigns it to
   * a private property.
   * @param {ElementRef} el - The "el" parameter is an instance of the ElementRef class, which is used
   * to access the native element of the component in which it is injected. It allows you to manipulate
   * the DOM element directly, which can be useful for tasks such as setting styles, adding or removing
   * classes, or accessing properties of
   */
  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])

 /**
  * This function prevents the user from entering invalid characters in an input field based on a
  * regular expression.
  * @param {KeyboardEvent} event - KeyboardEvent - an object that represents an event that occurs when
  * a user interacts with the keyboard.
  * @returns If the pressed key is included in the `specialKeys` array, nothing is returned. Otherwise,
  * the function checks if the resulting string after adding the pressed key (replacing 'Decimal' with
  * '.') matches the regular expression `regex`. If it does not match, the event is prevented from its
  * default behavior (e.g. preventing a non-numeric character from being added to an input field).
  * However
  */
  onKeyDown(event: KeyboardEvent) {    
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
