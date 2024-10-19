import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

form:FormGroup=new FormGroup({
  username:new FormControl(''),
  password:new FormControl('')
})

router =inject(Router)

saveLogin(){
  const formvalue=this.form.value;
  if(formvalue.username =='admin' && formvalue.password == '112233'){
   this.router.navigateByUrl('dashboard')
  }else{
    alert('Wrong Credentials')
  }
}

}
