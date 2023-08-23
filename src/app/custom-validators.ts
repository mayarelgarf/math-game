import { AbstractControl } from "@angular/forms";

export class CustomValidators {
static addition(target :string,sourceOne:string,sourceTwo:string){
  return(form:AbstractControl)=>{
    const sum = form.value[target];
    const NumberOne = form.value[sourceOne]
    const NumberTwo = form.value[sourceTwo]

  if (NumberOne+NumberTwo=== parseInt(sum)){
    return null
  }

  return {addition :true}
  }

}
}
