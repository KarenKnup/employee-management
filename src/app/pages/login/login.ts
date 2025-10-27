import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  loginObj: any = {
    "userName": '', //hradmin@gmail.com
    "password": '' //112233
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin(){
    this.http.post("https://projectapi.gerasim.in/api/EmployeeManagement/login", this.loginObj).subscribe((res:any)=>{
      if(res.result){ //se result for true
        localStorage.setItem("leaveUser", JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard');
      } else {
        alert(res.message);
      }
    });
  }

}
