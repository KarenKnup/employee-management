import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import necessário para usar [(ngModel)]

@Component({
  selector: 'app-login',
  standalone: true, // Adiciona standalone se o componente for isolado (Angular 15+)
  imports: [FormsModule], // Importa o FormsModule para usar ngModel
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginObj: any = {
    emailId: '',  // exemplo: rafael.admin@empresa.com
    password: ''  // exemplo: admin123
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.http.get("https://localhost:7266/api/Employee").subscribe({
      next: (res: any) => {
        // Garante que o retorno seja um array
        const employees = Array.isArray(res) ? res : [];

        // Procura o funcionário com email e senha correspondentes
        const employee = employees.find((e: any) => 
          e.emailId === this.loginObj.emailId && e.password === this.loginObj.password
        );

        if (employee) {
          localStorage.setItem("leaveUser", JSON.stringify(employee));
          alert(`Bem-vindo, ${employee.employeeName}!`);
          this.router.navigateByUrl('dashboard');
        } else {
          alert('Usuário ou senha incorretos.');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao conectar com o servidor. Verifique se a API está rodando.');
      }
    });
  }
  
}
