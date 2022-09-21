import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'BultaMinds';
  userDetails:any=[]
  userForm: FormGroup = new FormGroup({})
  ngOnInit(): void {
    if(localStorage.getItem('userDetails')){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
    }
    this.userForm = new FormGroup({
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      phone:new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      address:new FormControl('',Validators.required),
    })
  }
  addUser(){
    if(this.userForm.invalid){
      Object.keys(this.userForm.controls).forEach((element:any) => {
        let control = this.userForm.controls[element]
       control.markAsTouched();
      });
    }else{
      this.userDetails.push(this.userForm.value)
      localStorage.setItem('userDetails',JSON.stringify(this.userDetails))    
      this.userForm.reset()
    }
   
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  exploreMore(index:any){
    this.userDetails[index]['active']=!this.userDetails[index]['active']
  }
  deleteDetails(index1:any){
    this.userDetails = this.userDetails.filter((item,index) => index !== index1)    
    localStorage.setItem('userDetails',JSON.stringify(this.userDetails))

  }
}
