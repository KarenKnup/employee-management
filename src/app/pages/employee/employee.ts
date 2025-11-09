import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponse, ChildDept, DashboardValues, EmployeeClass, ParentDept } from '../../model/master';
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
  searchText: string = '';
  dashboardId = 1;

  ngOnInit(): void {
    //O que acontece ao carregar a página
    this.loadParentDept();
    this.loadEmployee();
    this.getAllChild();

   // this.updateTotalEmployee();
  }

  loadEmployee(){
    //Carrega a lista de funcionários
    this.masterSrv.GetAllEmployees().subscribe((res:EmployeeClass[])=>{
      this.employeeList = res;
    })
  }

 loadParentDept() {
  //Carrega a lista de departamentos pais
    this.masterSrv.getDepartment().subscribe((res: ParentDept[]) => {
      this.parentDepartmentList = res;
      //alert(JSON.stringify(this.parentDepartmentList));
    });
  }

  getAllChild() {
    //Carrega a lista de departamentos filhos
    this.masterSrv.GetAllChildDepartment().subscribe((res:ChildDept[])=>{
      this.childDepartmentList = res;
      //alert(JSON.stringify(this.childDepartmentList));
    })
  }

  get filteredEmployees() {
    // Filtro de funcionários baseado no texto de pesquisa
    if (!this.searchText) return this.employeeList;

    const term = this.searchText.toLowerCase();
    return this.employeeList.filter(emp =>
      emp.employeeName.toLowerCase().includes(term) ||
      emp.emailId.toLowerCase().includes(term) ||
      emp.contactNo.toLowerCase().includes(term) ||
      emp.gender.toLowerCase().includes(term)
    );
  }

  onEdit(item: EmployeeClass) {
    // Preenche o formulário com os dados do funcionário selecionado para edição
    this.formTitle = 'Atualizar dados de um Funcionário';
    this.employeeObj = { ...item }; // Faz uma cópia (não altera o original da lista)
    this.getAllChild();
  }
  

  onSaveEmployee(){
    //Cria um novo funcionário
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

    //Atualizar o totalEmployee na Dashboard
    this.updateTotalEmployee();
  }

  updateTotalEmployee(){
    // Atualizar o total na Dashboard
    this.masterSrv.getDashboardValues().subscribe({
      next: (antes) => {
        // O serviço pode retornar um array; usa o primeiro item ou o próprio objeto
        const current = Array.isArray(antes) ? antes[0] : antes;
        if (!current) {
          console.error('Dashboard value not found');
          return;
        }

        //console.log(current.admins); return;

        // Atualiza o total (exemplo: diminuindo 1 funcionário)
        const updatedTotal: DashboardValues = {
          ...current,
          totalEmployee: (current.totalEmployee ?? 0) + 1
        };

        // Usa o dashboardId correto no PUT
        this.masterSrv.updateDashboardValues(current.dashboardId, updatedTotal).subscribe({
          next: () => {
            console.log('Total atualizado com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar total:', err);
          }
        });
      },
      error: (err) => console.error('Erro ao buscar dashboard:', err)
    });
  }

  addEmployee(){
    //Prepara o formulário para adicionar um novo funcionário
    this.formTitle = 'Cadastrar um Funcionário';
    this.employeeObj = new EmployeeClass();
  }

  onUpdateEmployee() {
    //Atualiza os dados do funcionário
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
      //Deleta um funcionário
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
