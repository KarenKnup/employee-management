import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { APIResponse, DashboardValues, EarnedLeaveClass, EmployeeClass } from '../../model/master';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-earned-leave',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe,DatePipe,FormsModule],
  templateUrl: './earned-leave.html',
  styleUrl: './earned-leave.css'
})

export class EarnedLeave implements OnInit {
  form: FormGroup = new FormGroup({});
  masterSrv = inject(MasterService);
  empoloyee$: Observable<EmployeeClass[]> = new Observable<EmployeeClass[]>();
  earnedLeaves: EarnedLeaveClass[] = []
  searchText: string = '';
  formTitle: string = 'Cadastrar licenças de um funcionário';

  constructor() {
    this.initializeForm();
    
    this.empoloyee$ =  this.masterSrv.GetAllEmployees();
  }
  
  ngOnInit(): void {
    this.getData();
  }

  initializeForm() {
    this.form =  new FormGroup({
      earnedLeaveId: new FormControl(0),
      totalSickEarnedLeaves: new FormControl(0),
      employeeId: new FormControl(0),
      totalEarnedLeaves: new FormControl(0),
      lastUpdatedDate: new FormControl(new Date()),
      employeeName: new FormControl(''),
    })
  }

  getData() { 
   this.masterSrv.GetAllEarnedLeaves().subscribe((res:EarnedLeaveClass[])=>{
      this.earnedLeaves = res;
    })
  }

  get filteredEmployees() {
    if (!this.searchText) return this.earnedLeaves;

    const term = this.searchText.toString().toLowerCase();

    return this.earnedLeaves.filter(emp =>
      (emp.employeeName && emp.employeeName.toLowerCase().includes(term)) ||
      (emp.totalEarnedLeaves && emp.totalEarnedLeaves.toString().toLowerCase().includes(term)) //||
    // (emp.lastUpdatedDate && emp.lastUpdatedDate.toString().toLowerCase().includes(term))
    );
  }

  onEmployeeChange(event: any): void {
    const select = event.target as HTMLSelectElement;
    const selectedOption = select.options[select.selectedIndex];
    const nomeSelecionado = selectedOption?.dataset?.['name'] ?? '';

    this.form.get('employeeName')?.setValue(nomeSelecionado); // guarda o nome em uma variável
    //console.log('Nome do funcionário selecionado:', this.nomeEmployee);
  }

  addEarnedLeave(){
    this.formTitle = 'Cadastrar licenças de um funcionário';
    this.initializeForm();
  }

  onSave() {
    //Cadastrar a licença de um funcionário    
    if (      
      !this.form.value.totalEarnedLeaves ||
      !this.form.value.totalSickEarnedLeaves ||
      !this.form.value.lastUpdatedDate ||
      !this.form.value.employeeId 
    ) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    //exiba todo o conteúdo do formulário no console para depuração
    //console.log('Conteúdo do formulário:', this.form.value);
    //return;

    this.masterSrv.GetAllEarnedLeaves().subscribe({
      next: (list) => {
        const lastId = list.length > 0 ? Math.max(...list.map(emp => emp.earnedLeaveId)) : 0;
        const id = lastId + 1;

        //console.log('Último ID de licença ganho:', id); 
        //return;

        // Atualiza o campo earnedLeaveId do formulário
        this.form.get('earnedLeaveId')?.setValue(id);

        // Envia os dados do formulário corretamente
        this.masterSrv.createEarnedLeave(this.form.value).subscribe({
          next: () => {
            alert('Licença cadastrada com sucesso!');

            // Reinicializa o formulário para o estado padrão
            this.initializeForm();

            // Atualiza o título e a lista
            this.formTitle = 'Cadastrar licenças de um funcionário';

            // Atualiza a lista sem recarregar a página
            this.getData();
          },
          error: (err) => {
            console.error(err);
            alert(err.message);
          }
        });
      },
      error: (err) => console.error('Erro ao buscar último ID:', err)
    });

    this.updateCreatedLeaves();
        
  }

  updateCreatedLeaves(){
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
              totalEarnedLeaves: (current.totalEarnedLeaves ?? 0) + 1
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

  onDelete(earnedLeaveId: number) {
    if (confirm('Tem certeza que deseja deletar esta licença?')) {
      this.masterSrv.deleteEarnedLeave(earnedLeaveId).subscribe({
        next: () => {
          alert('Licença deletada com sucesso!');
          this.getData(); // Atualiza a lista imediatamente
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao deletar licença.');
        }
      });

      this.updateDeletedLeaves();
    }
  }

  updateDeletedLeaves(){
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
              totalEarnedLeaves: (current.totalEarnedLeaves ?? 0) - 1
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

  onEdit(item: EarnedLeaveClass) {
    // Preenche o formulário com os dados para edição
    this.formTitle = 'Atualizar dados de uma licença';
    this.form.setValue({ ...item }); // Faz uma cópia (não altera o original da lista)
  }

  onUpdateEarnedLeave(){
    //Atualiza os dados da licença
    if (!this.form.value.earnedLeaveId || this.form.value.earnedLeaveId === 0) {
      alert('Selecione uma licença para atualizar.');
      return;
    }

    //Atualiza a data de atualização para a data atual
    this.form.get('lastUpdatedDate')?.setValue(new Date());

    this.masterSrv.updateEarnedLeave(this.form.value.earnedLeaveId, this.form.value).subscribe({
      next: () => {
        alert('Licença atualizada com sucesso!');

        // Reinicializa o formulário para o estado padrão
        this.initializeForm();

        // Atualiza o título e a lista
        this.formTitle = 'Cadastrar licenças de um funcionário';
        this.getData();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar licença.');
      }
    });
  }

 
}