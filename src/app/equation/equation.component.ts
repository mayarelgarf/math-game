import { Component ,OnInit} from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { delay,filter ,scan} from 'rxjs';
import { CustomValidators } from '../custom-validators';


@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution =0
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  },[CustomValidators.addition('answer','a','b')])

  get a(){
    return this.mathForm.value.a
  }
  get b(){
    return this.mathForm.value.b
  }

  randomNumber(){
    return Math.floor(Math.random()*10)
  }

  ngOnInit() {
      this.mathForm.statusChanges.pipe(
        filter(value => value =='VALID'),
        delay(400),
        scan((acc,value)=>{
          return{
            numberSolved:acc.numberSolved+1,
            startTime: acc.startTime
          }

        },{numberSolved:0,startTime:new Date()}
        )).subscribe(({numberSolved,startTime})=>{
          numberSolved++;
          this.secondsPerSolution = (
            new Date().getTime() - startTime.getTime()
          )/numberSolved/1000;


        this.mathForm.patchValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer:''
        }

        )
      }
        )
  }



}
