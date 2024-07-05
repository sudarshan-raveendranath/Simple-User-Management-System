package org.wsrd.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
    private String empName;

    private String empContactNumber;

    private String empAddress;

    private String empGender;

    private String empDepartment;

    private String empSkills;
}
