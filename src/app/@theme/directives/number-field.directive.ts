import { Directive, HostListener, ElementRef, Renderer, OnInit, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { NumberUtils } from '../../@core/utils/number-utils.service';

@Directive({
  selector: '[number-field]',
  exportAs: 'numberfield',
  providers: []
})
export class NumberField implements OnInit, OnChanges {
  private oldValue: number;
  @Output('changeNumber') changeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input('dat') value: number = null;
  @Input('format') format: string = '0,0.00';
  @Input('allowNegative') allowNegative: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  ngOnChanges(changes: any) {
    this.value = changes.value.currentValue;
    this.el.nativeElement.value = NumberUtils.format(this.value, this.format);
  }

  ngOnInit() {
    this.renderer.setElementClass(this.el.nativeElement, 'text-right', true);
    this.el.nativeElement.value = NumberUtils.format(this.value, this.format);
  }

  reset() {
    this.value = this.oldValue;
    this.el.nativeElement.value = NumberUtils.format(this.value, this.format);
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string) {
    if (value) {
      this.oldValue = this.value;
      this.el.nativeElement.value = NumberUtils.parse((this.value || '').toString());
    } else {
      this.oldValue = null;
    }
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    if (value) {
      value = value.replace(/[ ]/g, '');
      this.value = (this.validatePattern(value)) ? NumberUtils.parse(value) : this.oldValue;
      this.el.nativeElement.value = NumberUtils.format(this.value, this.format);
    } else {
      this.value = null;
      this.el.nativeElement.value = '';
    }
    this.changeEvent.emit(this.value);

    this.oldValue = null;
  }

  @HostListener('keydown', ['$event', '$event.target.value'])
  onKeyUp(e: KeyboardEvent, value: string) {
    if ([8, 9, 13, 20, 37, 38, 39, 40, 46].indexOf(e.which) !== -1 || ((e.metaKey || e.ctrlKey) && e.key === 'v')) {
      if (e.which == 13) {
        this.onBlur(value);
      }
      return;
    }

    let selectionStart = this.el.nativeElement.selectionStart;
    let selectionEnd = this.el.nativeElement.selectionEnd;
    let newValue = [value.slice(0, selectionStart), e.key, value.slice(selectionStart)].join('');
    if (!this.validatePattern(newValue)) {
      e.preventDefault();
    }
  }

  private validatePattern(value: string): boolean {
    let [integer, fraction = ''] = this.format.split('.');
    let fractionSize = fraction.length;
    let pattern = '^' + (this.allowNegative ? '-?' : '') + '(,?\\d*)*' + (fractionSize > 0 ? '\\.?\\d{0,' + fractionSize + '}' : '') + '$';
    return (new RegExp(pattern).test(value));
  }
}
