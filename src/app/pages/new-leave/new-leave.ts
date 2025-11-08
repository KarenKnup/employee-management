import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { APIResponse, EmployeeClass, LeaveRequest, LeaveType } from '../../model/master';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-leave',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe,DatePipe],
  templateUrl: './new-leave.html',
  styleUrl: './new-leave.css'
})

export class NewLeave implements OnInit{

  leaveForm: FormGroup = new FormGroup({});
  masterSrv = inject(MasterService);
  leaveTypeList: LeaveType[] = [];
  requstList:LeaveRequest []= [];
  empoloyee$: Observable<EmployeeClass[]> = new Observable<EmployeeClass[]>();

  constructor() {
    this.initializeForm();
    this.empoloyee$ =  this.masterSrv.GetAllEmployees();
  }

  initializeForm() {
    this.leaveForm =  new FormGroup({
      leaveId: new FormControl(0),
      employeeId: new FormControl(0), //this.masterSrv.loggedUserData.employeeId
      leaveTypeId: new FormControl(0),
      startDate: new FormControl(""), 
      endDate: new FormControl(""),
      status: new FormControl("Pendente"),
      reason: new FormControl(""),
      requestDate: new FormControl(new Date()),
      employeeName: new FormControl(''),
      contactNo: new FormControl(''),
      typeName: new FormControl(''),
    })
    debugger;

    if(this.masterSrv.loggedUserData.role == 'Employee') {
      this.leaveForm.controls['employeeId'].disable();
    }
  }

  ngOnInit(): void {
    this.getLeaveType();
    this.getGriData();
  }

  getGriData() {
    if(this.masterSrv.loggedUserData.role == "Employee") {
      this.getData()
    } else {
      this.getAllData()
    }
  }

  getData() {
   /*
 this.masterSrv.getAllLeaveRequestByEmpId(this.masterSrv.loggedUserData.employeeId).subscribe((res:APIResponse)=>{
      this.requstList = res.data;
    })*/
  }

  getAllData() {
    this.masterSrv.getAllLeaveRequest().subscribe((res:LeaveRequest[])=>{
          this.requstList = res;
        })
  }

  onEmployeeChange(event: any): void {
    const select = event.target as HTMLSelectElement;
    const selectedOption = select.options[select.selectedIndex];
    const nomeSelecionado = selectedOption?.dataset?.['name'] ?? '';
    const contatoSelecionado = selectedOption?.dataset?.['contact'] ?? '';

    this.leaveForm.get('employeeName')?.setValue(nomeSelecionado); // guarda o nome em uma variável
    this.leaveForm.get('contactNo')?.setValue(contatoSelecionado); // guarda o contato em uma variável
    //console.log('Nome do funcionário selecionado:', this.nomeEmployee);
  }

  onLeaveTypeChange(event: any): void {
    const select = event.target as HTMLSelectElement;
    const selectedOption = select.options[select.selectedIndex];
    const typeNameSelected = selectedOption?.dataset?.['name'] ?? '';

    this.leaveForm.get('typeName')?.setValue(typeNameSelected); // guarda o tipo em uma variável
  }

  getLeaveType() {
    //Carrega a lista de departamentos filhos
    this.masterSrv.getAllLeaveType().subscribe((res:LeaveType[])=>{
      this.leaveTypeList = res;
      //alert(JSON.stringify(this.childDepartmentList));
    })
  }

  onSave() {
    //Cadastrar nova solicitação de licença
    if (      
      !this.leaveForm.value.leaveTypeId ||
      !this.leaveForm.value.startDate ||
      !this.leaveForm.value.endDate ||
      !this.leaveForm.value.employeeId ||
      !this.leaveForm.value.reason 
        ) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    this.masterSrv.getAllLeaveRequest().subscribe({
      next: (list) => {
        const lastId = list.length > 0 ? Math.max(...list.map(emp => emp.leaveId)) : 0;
        const id = lastId + 1;

        //console.log('Último ID de licença ganho:', id); 
        //return;

        // Atualiza o campo leaveId do formulário
        this.leaveForm.get('leaveId')?.setValue(id);

        // Envia os dados do formulário corretamente
        this.masterSrv.createLeaveRequest(this.leaveForm.value).subscribe({
          next: () => {
            alert('Solicitação de licença cadastrada com sucesso!');

            // Reinicializa o formulário para o estado padrão
            this.initializeForm();

            // Atualiza o título e a lista
            //this.formTitle = 'Cadastrar licenças de um funcionário';

            // Atualiza a lista sem recarregar a página
            if(this.masterSrv.loggedUserData.role == "Employee") {
              this.getData();
            } else {
              this.getAllData();
            }
          },
          error: (err) => {
            console.error(err);
            alert(err.message);
          }
        });
      },
      error: (err) => console.error('Erro ao buscar último ID:', err)
    });
    
  }

  changeStatusApprove(item: any) {
    //console.log('Aprovando item:', item);

    const updatedLeave = { ...item, status: 'Aprovado' };

    // garante que o id do path é o leaveId correto
    const id = Number(item.leaveId);

    this.masterSrv.updateLeaveRequest(id, updatedLeave).subscribe({
      next: () => {
        alert('Solicitação aprovada com sucesso!');
        if(this.masterSrv.loggedUserData.role == "Employee") {
              this.getData();
            } else {
              this.getAllData();
          }
      },
      error: (err) => {
        console.error('Erro ao aprovar:', err);
        alert(err?.message || 'Erro ao aprovar solicitação. Verifique o console e a aba Network.');
      }
    });
    
    //Se o typeName for "Licença médica", diminui -1 do totalSickEarnedLeaves de earnedleave, senão diminui -1 do totalEarnedLeaves de earnedleave
    if(item.typeName === "Licença médica" || item.typeName === "Licença Médica") {
      this.masterSrv.getEarnedLeaveByEmpId(item.employeeId).subscribe({
        next: (earnedLeave) => {
          //console.log('EarnedLeave antes da atualização:', earnedLeave); return;
          const updatedEarnedLeave = {
            ...earnedLeave,
            totalSickEarnedLeaves: earnedLeave.totalSickEarnedLeaves - 1
          };
          this.masterSrv.updateEarnedLeave(earnedLeave.earnedLeaveId, updatedEarnedLeave).subscribe({
            next: () => {
              console.log('Total de licenças médicas atualizadas com sucesso!');
            },
            error: (err) => {
              console.error('Erro ao atualizar total de licenças médicas:', err);
            }
          });
        }
      });
    } else {
      this.masterSrv.getEarnedLeaveByEmpId(item.employeeId).subscribe({
        next: (earnedLeave) => {
          //console.log('EarnedLeave antes da atualização:', earnedLeave); return;
          const updatedEarnedLeave = {
            ...earnedLeave,
            totalEarnedLeaves: earnedLeave.totalEarnedLeaves - 1
          };
          this.masterSrv.updateEarnedLeave(earnedLeave.earnedLeaveId, updatedEarnedLeave).subscribe({
            next: () => {
              console.log('Total de licenças atualizadas com sucesso!');
            },
            error: (err) => {
              console.error('Erro ao atualizar total de licenças:', err);
            }
          });
        }
      });
    } 
  }

  changeStatusReject(item: any) {
    const updatedLeave = { ...item, status: 'Reprovado' };

    // garante que o id do path é o leaveId correto
    const id = Number(item.leaveId);

    this.masterSrv.updateLeaveRequest(id, updatedLeave).subscribe({
      next: () => {
        alert('Solicitação reprovada com sucesso!');
        if(this.masterSrv.loggedUserData.role == "Employee") {
              this.getData();
            } else {
              this.getAllData();
            }
      },
      error: (err) => {
        console.error('Erro ao reprovar:', err);
        alert(err?.message || 'Erro ao reprovar solicitação. Verifique o console e a aba Network.');
      }
    });

  }

  changeStatusPending(item: any) {
    const updatedLeave = { ...item, status: 'Pendente' };

    // garante que o id do path é o leaveId correto
    const id = Number(item.leaveId);
    this.masterSrv.updateLeaveRequest(id, updatedLeave).subscribe({
      next: () => {
        alert('Solicitação alterada para pendente com sucesso!');
        if(this.masterSrv.loggedUserData.role == "Employee") {
              this.getData();
            } else {
              this.getAllData();
            }
      },
      error: (err) => {
        console.error('Erro ao alterar para pendente:', err);

        alert(err?.message || 'Erro ao alterar solicitação. Verifique o console e a aba Network.');
      }
    });

    if(item.typeName === "Licença médica" || item.typeName === "Licença Médica") {
      this.masterSrv.getEarnedLeaveByEmpId(item.employeeId).subscribe({
        next: (earnedLeave) => {
          //console.log('EarnedLeave antes da atualização:', earnedLeave); return;
          const updatedEarnedLeave = {
            ...earnedLeave,
            totalSickEarnedLeaves: earnedLeave.totalSickEarnedLeaves + 1
          };
          this.masterSrv.updateEarnedLeave(earnedLeave.earnedLeaveId, updatedEarnedLeave).subscribe({
            next: () => {
              console.log('Total de licenças médicas atualizadas com sucesso!');
            },
            error: (err) => {
              console.error('Erro ao atualizar total de licenças médicas:', err);
            }
          });
        }
      });
    } else {
      this.masterSrv.getEarnedLeaveByEmpId(item.employeeId).subscribe({
        next: (earnedLeave) => {
          //console.log('EarnedLeave antes da atualização:', earnedLeave); return;
          const updatedEarnedLeave = {
            ...earnedLeave,
            totalEarnedLeaves: earnedLeave.totalEarnedLeaves + 1
          };
          this.masterSrv.updateEarnedLeave(earnedLeave.earnedLeaveId, updatedEarnedLeave).subscribe({
            next: () => {
              console.log('Total de licenças atualizadas com sucesso!');
            },
            error: (err) => {
              console.error('Erro ao atualizar total de licenças:', err);
            }
          });
        }
      });
    } 
  } 

  deleteLeaveRequest(leaveId: number) {
    if (confirm('Tem certeza que deseja deletar esta solicitação de licença?')) {
      this.masterSrv.deleteLeaveRequest(leaveId).subscribe({
        next: () => {
          alert('Solicitação de licença deletada com sucesso!');
          if(this.masterSrv.loggedUserData.role == "Employee") {
            this.getData();
          } else {
            this.getAllData();
          }
        },
        error: (err) => {
          console.error('Erro ao deletar solicitação:', err);
          alert(err?.message || 'Erro ao deletar solicitação. Verifique o console e a aba Network.');
        }
      });
    }
  }
}