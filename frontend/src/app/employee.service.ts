import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  api = "http://localhost:9090/api/v1/employee"

  public saveEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.api}/add`,employee)
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.api}/getall`)
  }

  public deleteEmployee(empId: number): Observable<any> {
    return this.httpClient.delete(`${this.api}/delete/${empId}`, { responseType: 'text' });
  }

  public getEmployee(empId: number) {
    return this.httpClient.get<Employee>(`${this.api}/get/${empId}`);
  }

  public updateEmployee(employee: Employee) {
    return this.httpClient.put<Employee>(`${this.api}/update`, employee);
  }
}
