import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DashboardValues } from '../../model/master';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class DashboardComponent implements OnInit {

  masterSrv = inject(MasterService);
  dashboardData: DashboardValues[] = [];
  
  ngOnInit(): void { 
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
   /* this.masterSrv.getEmpDash(this.masterSrv.loggedUserData.employeeId).subscribe((res:any)=>{
      this.dashboardData = res;
    })*/
  }

  getAllData() {
    this.masterSrv.getDashboardValues().subscribe((res:DashboardValues[])=>{
      this.dashboardData = res;
      //alert(JSON.stringify(this.dashboardData));
    })
  }

}