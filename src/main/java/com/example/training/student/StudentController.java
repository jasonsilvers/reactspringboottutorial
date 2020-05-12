package com.example.training.student;

import com.example.training.course.StudentCourse;
import com.example.training.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@CrossOrigin("*")
@RequestMapping("api/v1/students")
@RestController
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getStudents() {
//      return new ArrayList<Student>();
//      throw new ApiRequestException("Oops cannot get all students");
        return this.studentService.getAllStudents();

    }

    @GetMapping("{studentId}/courses")
    public List<StudentCourse> getStudentCourses(@PathVariable UUID studentId) {
        System.out.println(studentId);
//      return new ArrayList<>();
//      throw new ApiRequestException("Oops cannot get student courses");
        return studentService.getStudentCourses(studentId);
    }

    @PostMapping
    public void addNewStudent(@RequestBody @Valid Student student) {

        System.out.println(student.toString());
//      throw new ApiRequestException("Error adding student");
        studentService.addNewStudent(student);

    }

    @DeleteMapping("{studentId}")
    public void deleteStudent(@PathVariable UUID studentId) {
        studentService.deleteStudent(studentId);
    }
}
