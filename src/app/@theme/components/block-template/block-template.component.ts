import { Component } from '@angular/core';

@Component({
  selector: 'block-temp',
  styles: [`
  @-webkit-keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-moz-keyframes spin{0%{-moz-transform:rotate(0)}100%{-moz-transform:rotate(360deg)}}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.spinners{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1003;background: #00000000;overflow:hidden}  .spinners div:first-child{display:block;position:relative;left:50%;top:50%;width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:50%;box-shadow:0 3px 3px 0 rgba(255,56,106,1);transform:translate3d(0,0,0);animation:spin 2s linear infinite}  .spinners div:first-child:after,.spinners div:first-child:before{content:'';position:absolute;border-radius:50%}  .spinners div:first-child:before{top:5px;left:5px;right:5px;bottom:5px;box-shadow:0 3px 3px 0 rgb(255, 228, 32);-webkit-animation:spin 3s linear infinite;animation:spin 3s linear infinite}  .spinners div:first-child:after{top:15px;left:15px;right:15px;bottom:15px;box-shadow:0 3px 3px 0 rgba(61, 175, 255,1);animation:spin 1.5s linear infinite}
  `],
  template: `
    <div class="spinners">
      <div></div>
    </div>
  `
})
export class BlockTemplateComponent {
  message:any;
  constructor() {}
}