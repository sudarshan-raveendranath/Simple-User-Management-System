import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  isCreateEmployee: boolean = true;

  employee: any;

  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.employee = this.activatedRoute.snapshot.data['employee'];
    console.log(this.employee);

    if (this.employee && this.employee.empId > 0) {
      this.isCreateEmployee = false;
      if (this.employee.empSkills != '') {
        this.skills = [];
        this.skills = this.employee.empSkills.split(',');
      }
    } else {
      this.isCreateEmployee = true;
    }
  }

  selectGender(gender: string): void {
    this.employee.empGender = gender;
  }

  skills: string[] = [];

  onSkillChange(event: any) {
    if (event.checked) {
      this.skills.push(event.source.value);
    } else {
      this.skills.forEach(
        (item, index) => {
          if (item === event.source.value) {
            this.skills.splice(index, 1);
          }
        }
      )
    }
    this.employee.empSkills = this.skills.toString();
  }

  saveEmployee(employeeForm: NgForm): void {

    if (this.isCreateEmployee) {
      this.employeeService.saveEmployee(this.employee).subscribe(
        {
          next: (res: Employee) => {
            console.log(res);
            employeeForm.reset();
            this.employee.empGender = '';
            this.skills = [];
            this.employee.empSkills = '';
            this.router.navigateByUrl("/employee-list")
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      );
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe(
        {
          next: (res: Employee) => {
            this.router.navigateByUrl("/employee-list")
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      )
    }
  }

  checkSkills(skill: string) {
    return this.employee.empSkills != null && this.employee.empSkills.includes(skill);
  }

}
