import { Directive, HostListener, ElementRef, Renderer, OnInit, Input, Output, OnChanges } from "@angular/core";

@Directive({
  selector: '[number-only-field]',
  exportAs: 'numberonlyfield',
  providers: []
})
export class NumberOnlyField implements OnInit, OnChanges {

  @Input('dat') value: number = null;

  private pattern: string = "[0-9]";

  constructor(private el: ElementRef, private renderer: Renderer) {}

  ngOnChanges(changes: any) {
    this.value = changes.value.currentValue;
    this.el.nativeElement.value = this.value;
  }

  ngOnInit() {
    this.renderer.setElementClass(this.el.nativeElement, 'text-right', true);
    this.el.nativeElement.value = this.value;
  }

  @HostListener('keypress', ['$event', '$event.key'])
  onKeyPress(e : KeyboardEvent, value: string) {
    return this.validatePattern(value);
  }

  private validatePattern(value: string) : boolean {
    return (new RegExp(this.pattern).test(value))
  }
}
