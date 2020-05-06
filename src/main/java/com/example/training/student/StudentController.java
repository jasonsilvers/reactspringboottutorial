package com.example.training.student;

import com.example.training.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@CrossOrigin("*")
@RequestMapping("students")
@RestController
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getStudents() {
//          return new ArrayList<Student>();
        return this.studentService.getAllStudents();
//        throw new ApiRequestException("Oops cannot get all students");
    }

    @PostMapping
    public void addNewStudent(@RequestBody @Valid Student student) {

        System.out.println(student.toString());
        studentService.addNewStudent(student);


    }
}
