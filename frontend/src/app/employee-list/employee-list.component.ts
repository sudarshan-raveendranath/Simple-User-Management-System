import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Name', 'Contact Number', 'Address', 'Department', 'Gender', 'Skills', 'Delete'];
  datasource: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
    this.getAllEmployees();
  }

  ngOnInit(): void {

  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      {
        next: (res: Employee[]) => {
          console.log(res);
          this.datasource = res;
        }, error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    )
  }

  deleteEmployee(empId: number): void {
    console.log(empId);
    this.employeeService.deleteEmployee(empId).subscribe(
      {
        next: (res) => {
          console.log('Delete response:', res);
          this.getAllEmployees();
        }, error: (err: HttpErrorResponse) => {
          console.log('Error occurred:', err);
          console.log('Error status:', err.status);
          console.log('Error message:', err.message);
          console.log('Error response body:', err.error);
        }
      }
    )
  }

}
