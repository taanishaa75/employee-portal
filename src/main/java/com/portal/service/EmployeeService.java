package com.portal.service;

import com.portal.model.Employee;
import com.portal.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getById(Long id) {
        return employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found: " + id));
    }

    public Employee create(Employee employee) {
        employee.setStatus("ACTIVE");
        return employeeRepository.save(employee);
    }

    public Employee update(Long id, Employee updated) {
        Employee existing = getById(id);
        existing.setFirstName(updated.getFirstName());
        existing.setLastName(updated.getLastName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setDesignation(updated.getDesignation());
        existing.setDepartment(updated.getDepartment());
        return employeeRepository.save(existing);
    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }

    public List<Employee> search(String keyword) {
        return employeeRepository.searchEmployees(keyword);
    }
}