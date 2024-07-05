package org.wsrd.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.wsrd.backend.entity.Employee;
import org.wsrd.backend.repository.EmployeeRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return new ArrayList<>(employeeRepository.findAll());
    }

    public Employee getEmployee(Integer id) {
        return employeeRepository.findById(id).orElseThrow();
    }

    public String deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
        return "Employee deleted successfully";
    }

    public Employee updateEmployee(Employee employee) {
        employeeRepository.findById(employee.getEmpId()).orElseThrow();
        return employeeRepository.save(employee);
    }
}
