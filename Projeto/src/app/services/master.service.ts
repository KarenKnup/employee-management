import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIResponse, EarnedLeaveClass, EmployeeClass, LeaveRequest, ParentDept, ChildDept, LeaveType, DashboardValues } from '../model/master';


@Injectable({
  providedIn: 'root'
})

export class MasterService {
  apiUrl: string = "https://localhost:7266/api/";
  loggedUserData: any;

  constructor(private http: HttpClient) {
    const localData = localStorage.getItem("leaveUser");
    if(localData) {
      this.loggedUserData = JSON.parse(localData);
    }
   }

  getDepartment(): Observable<ParentDept[]> {
    return this.http.get<ParentDept[]>(this.apiUrl + "ParentDept");
  }

  GetAllEmployees() : Observable<EmployeeClass[]> {
    return this.http.get<EmployeeClass[]>(this.apiUrl + "Employee")
  }

   GetAllChildDepartment() : Observable<ChildDept[]> {
    return this.http.get<ChildDept[]>(this.apiUrl + "ChildDept")
  }

  createEmployee(employee: EmployeeClass): Observable<any> {
    return this.http.post(this.apiUrl + "Employee/Create", employee);
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}Employee/Update/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Employee/Delete/${id}`);
  }

  GetAllEarnedLeaves() : Observable<EarnedLeaveClass[]> {
    return this.http.get<EarnedLeaveClass[]>(this.apiUrl + "EarnedLeave")
  }

  getEarnedLeaveByEmpId(employeeId: number): Observable<EarnedLeaveClass> {
    return this.http.get<EarnedLeaveClass>(`${this.apiUrl}EarnedLeave/Employee/${employeeId}`);
  }

  createEarnedLeave(earnedLeave: EarnedLeaveClass): Observable<any> {
    return this.http.post(this.apiUrl + "EarnedLeave/Create", earnedLeave);
  }

  deleteEarnedLeave(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}EarnedLeave/Delete/${id}`);
  }

  updateEarnedLeave(id: number, earnedLeave: any): Observable<any> {
    return this.http.put(`${this.apiUrl}EarnedLeave/Update/${id}`, earnedLeave);
  }

  getAllLeaveRequest(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl + "LeaveRequest");
  }

  getAllLeaveType(): Observable<LeaveType[]> {
    return this.http.get<LeaveType[]>(this.apiUrl + "LeaveType");
  }

  createLeaveRequest(leaveRequest: LeaveRequest): Observable<any> {
    return this.http.post(this.apiUrl + "LeaveRequest/Create", leaveRequest);
  }

  updateLeaveRequest(id: number, leaveRequest: any): Observable<any> {
    return this.http.put(`${this.apiUrl}LeaveRequest/Update/${id}`, leaveRequest);
  }

  deleteLeaveRequest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}LeaveRequest/Delete/${id}`);
  }
  
  getDashboardValues() : Observable<DashboardValues[]> {
    return this.http.get<DashboardValues[]>(this.apiUrl + "DashboardValues")
  }

  updateDashboardValues(id: number, dashboard: any): Observable<any> {
    return this.http.put(`${this.apiUrl}DashboardValues/Update/${id}`, dashboard);
  }

  getDashboardValue(id: number): Observable<DashboardValues[]> {
    return this.http.get<DashboardValues[]>(`${this.apiUrl}DashboardValues/${id}`);
  }


}