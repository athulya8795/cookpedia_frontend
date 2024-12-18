import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm:FormGroup
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
    this.loginForm = this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    })
  }
  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      console.log(email,password);
      // api call
      this.api.loginApi({email,password}).subscribe({
        next:(res:any)=>{
          sessionStorage.setItem("user",JSON.stringify(res.user))
          sessionStorage.setItem("token",res.token)
          // call getChatData
          this.api.getChartData()
          this.loginForm.reset()
          if(res.user.role=="User"){
            this.router.navigateByUrl("/")
          }
          else{
            // admin panel
            this.router.navigateByUrl("/admin")
          }
        },
        error:(reason:any)=>{
          alert(reason.error)
        }
      })
    }
    else{
      alert("Invalid Form!!!")
    }
  }
}
