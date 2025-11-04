import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponse, ChildDept, EmployeeClass, ParentDept } from '../../model/master';
import { MasterService } from '../../services/master.service';


@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css'],
})

export class Employee implements OnInit {
  employeeObj: EmployeeClass = new EmployeeClass();
  parentDeptId: string = '';
  masterSrv = inject(MasterService);
  parentDepartmentList: ParentDept[] = [];
  childDepartmentList: ChildDept[] = [];
  employeeList: EmployeeClass[] = [];
  formTitle: string = 'Cadastrar um Funcionário';

  ngOnInit(): void {
    this.loadParentDept();
    this.loadEmployee();
    this.getAllChild();
  }

  loadEmployee(){
    this.masterSrv.GetAllEmployees().subscribe((res:EmployeeClass[])=>{
      this.employeeList = res;
    })
  }

 loadParentDept() {
    this.masterSrv.getDepartment().subscribe((res: ParentDept[]) => {
      this.parentDepartmentList = res;
      //alert(JSON.stringify(this.parentDepartmentList));
    });
  }

  getAllChild() {
    this.masterSrv.GetAllChildDepartment().subscribe((res:ChildDept[])=>{
      this.childDepartmentList = res;
      //alert(JSON.stringify(this.childDepartmentList));
    })
  }

  

  onEdit(item: EmployeeClass) {
    this.formTitle = 'Atualizar um Funcionário';
    this.employeeObj = item;
    this.getAllChild();
  }
  

  onSaveEmployee(){
    if (
      !this.employeeObj.employeeName ||
      !this.employeeObj.contactNo ||
      !this.employeeObj.emailId ||
      !this.employeeObj.password ||
      !this.employeeObj.gender ||
      !this.employeeObj.deptId
    ) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    this.masterSrv.GetAllEmployees().subscribe({
      next: (list) => {
        const lastId = list.length > 0 ? Math.max(...list.map(emp => emp.employeeId)) : 0;
        this.employeeObj.employeeId = lastId + 1;
        this.employeeObj.role = 'Employee'; // role padrão

        this.masterSrv.createEmployee(this.employeeObj).subscribe({
          next: (res) => {
            alert('Funcionário cadastrado com sucesso!');
            this.employeeObj = new EmployeeClass(); // limpa o form

            // Atualiza a lista (sem recarregar o site)
            this.loadEmployee();
          },
          error: (err) => {
            console.error(err);
            alert('Erro ao cadastrar funcionário.');
          }
        });
      },
      error: (err) => console.error('Erro ao buscar último ID:', err)
    });
  }

  addEmployee(){
    this.formTitle = 'Cadastrar um Funcionário';
    this.employeeObj = new EmployeeClass();
  }

  onUpdateEmployee() {
  if (!this.employeeObj.employeeId || this.employeeObj.employeeId === 0) {
    alert('Selecione um funcionário para atualizar.');
    return;
  }

  this.masterSrv.updateEmployee(this.employeeObj.employeeId, this.employeeObj).subscribe({
    next: () => {
      alert('Funcionário atualizado com sucesso!');
      this.employeeObj = new EmployeeClass(); // 🔹 Limpa o formulário
      this.loadEmployee(); // Atualiza a lista sem recarregar a página
    },
    error: (err) => {
      console.error(err);
      alert('Erro ao atualizar funcionário.');
    }
  });
}

   onDelete(employeeId: number) {
  if (confirm('Tem certeza que deseja deletar este funcionário?')) {
    this.masterSrv.deleteEmployee(employeeId).subscribe({
      next: () => {
        alert('Funcionário deletado com sucesso!');
        this.loadEmployee(); // Atualiza a lista imediatamente
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao deletar funcionário.');
      }
    });
  }
}


}
