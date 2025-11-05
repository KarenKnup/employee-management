import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIResponse, EarnedLeaveClass, EmployeeClass, LeaveRequest, ParentDept, ChildDept } from '../model/master';


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

  createEarnedLeave(earnedLeave: EarnedLeaveClass): Observable<any> {
    return this.http.post(this.apiUrl + "EarnedLeave/Create", earnedLeave);
  }

  deleteEarnedLeave(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}EarnedLeave/Delete/${id}`);
  }

  updateEarnedLeave(id: number, earnedLeave: any): Observable<any> {
    return this.http.put(`${this.apiUrl}EarnedLeave/Update/${id}`, earnedLeave);
  }

}