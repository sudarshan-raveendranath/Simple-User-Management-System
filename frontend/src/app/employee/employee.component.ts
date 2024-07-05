import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employee: Employee = {
    empId: 0,
    empName: '',
    empContactNumber: '',
    empAddress: '',
    empGender: '',
    empDepartment: '',
    empSkills: ''
  };

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {

  }

  selectGender(gender: string): void {
    this.employee.empGender = gender;
  }

  skills : string[] = [];

  onSkillChange(event: any) {
    if(event.checked) {
      this.skills.push(event.source.value);
    }else {
      this.skills.forEach (
        (item, index) => {
          if(item === event.source.value) {
            this.skills.splice(index, 1);
          }
        }
      )
    }
    this.employee.empSkills = this.skills.toString();
  }

  saveEmployee(employeeForm: NgForm): void {
    this.employeeService.saveEmployee(this.employee).subscribe(
      {
        next: (res:Employee) => {
          console.log(res);
          employeeForm.reset();
          this.employee.empGender = '';
          this.skills = [];
          this.employee.empSkills = '';
        },
        error: (err:HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  checkSkills(skill: string) {
    return this.employee.empSkills != null && this.employee.empSkills.includes(skill);
  }

}
