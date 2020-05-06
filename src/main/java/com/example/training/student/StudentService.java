package com.example.training.student;

import com.example.training.exception.ApiRequestException;
import com.example.training.utils.ValidateEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentDataAccessService studentDataAccessService;
    private final ValidateEmail validateEmail;

    @Autowired
    public StudentService(StudentDataAccessService studentDataAccessService, ValidateEmail validateEmail) {
        this.studentDataAccessService = studentDataAccessService;
        this.validateEmail = validateEmail;
    }

    List<Student> getAllStudents() {
        return this.studentDataAccessService.selectAllStudents();
    }

    void addNewStudent(Student student) {
        addNewStudent(null, student);
    }

    void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());

        //TODO: Verify that email is valid
        //TODO: Verify that email is not taken
        Boolean validEmail = validateEmail.test(student.getEmail());

        if (!validEmail) {
            throw new ApiRequestException(student.getEmail() + " is not valid");
        }

        if (studentDataAccessService.isEmailTaken(student.getEmail())) {
            throw new ApiRequestException(student.getEmail() + " is taken");
        }

        studentDataAccessService.insertStudent(newStudentId, student);
    }
}
