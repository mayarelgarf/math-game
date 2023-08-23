import { Directive,ElementRef,OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import{map,filter} from 'rxjs/operators'

@Directive({
  selector: '[appAnswerHightlight]'
})
export class AnswerHightlightDirective {

  constructor(private el:ElementRef,private controlName:NgControl) {

   }

  ngOnInit(){
    this.controlName.control?.parent?.valueChanges.pipe(
      map(({a,b,answer})=>Math.abs((a+b-answer)/(a+b)))
    ).subscribe(value =>
      {
        if(value<0.2){
          this.el.nativeElement.classList.add('close');
        }
        else{
          this.el.nativeElement.classList.remove('close')
        }
      })
  }

}
