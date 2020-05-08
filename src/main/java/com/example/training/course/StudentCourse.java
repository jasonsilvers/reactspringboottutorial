package com.example.training.course;

import org.apache.tomcat.jni.Local;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

public class StudentCourse {
    private final UUID courseId;
    private final String name;
    private final String description;
    private final String department;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String teacher_name;
    private final int grade;

    public StudentCourse(UUID courseId, String name, String description, String department, LocalDate startDate, LocalDate endDate, String teacher_name, int grade) {
        this.courseId = courseId;
        this.name = name;
        this.description = description;
        this.department = department;
        this.startDate = startDate;
        this.endDate = endDate;
        this.teacher_name = teacher_name;
        this.grade = grade;
    }

    public int getGrade() {
        return grade;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public UUID getCourseId() {
        return courseId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getDepartment() {
        return department;
    }

    public String getTeacher_name() {
        return teacher_name;
    }

    @Override
    public String toString() {
        return "Course{" +
                "course_id=" + courseId +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", department='" + department + '\'' +
                ", teacher='" + teacher_name + '\'' +
                '}';
    }
}
