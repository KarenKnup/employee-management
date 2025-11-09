import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})

export class Layout {
  loggedUserData: any;
  router = inject(Router);

  constructor(){
    const localData = localStorage.getItem("leaveUser");
    if(localData){
      this.loggedUserData = JSON.parse(localData);

      //exibir em alert o json de loggedUserData
      //alert(`Usuário logado: ${JSON.stringify(this.loggedUserData)}`);
    }
  }

  onLogoff(){
    localStorage.removeItem("leaveUser");
    this.router.navigateByUrl('login');
  }
}
