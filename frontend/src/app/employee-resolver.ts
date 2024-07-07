import { Observable, of } from "rxjs";
import { EmployeeService } from "./employee.service";
import { Employee } from "./employee.model";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";

export const EmployeeResolver: ResolveFn<any> = 
(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot, 
    employeeService: EmployeeService = inject(EmployeeService)) :Observable<Employee> => {

        const empId = route.paramMap.get("empId");

        if(empId) {
            return employeeService.getEmployee(Number(empId));
        }else {
            const employee: Employee = {
                empId: 0,
                empName: '',
                empContactNumber: '',
                empAddress: '',
                empGender: '',
                empDepartment: '',
                empSkills: ''
              };

            return of(employee);  
        }
    }