package com.example.training.student;

import com.example.training.course.StudentCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public class StudentDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @SuppressWarnings("ConstantConditions")
    boolean isEmailTaken(String email) {

        String sql = "SELECT EXISTS(SELECT 1 from student where email = ?)";

        return jdbcTemplate.queryForObject(sql,
                new Object[]{email},
                (resultSet, i) -> resultSet.getBoolean(1));

    }

    public List<StudentCourse> selectAllCoursesByStudentId(UUID studentId) {
        String sql = "select course_id, name, description, department, teacher_name, start_date, end_date, grade from course " +
                "inner join student_course using (course_id) " +
                "where  student_id = ?";

        return jdbcTemplate.query(sql, getCourseRowMapper(), new Object[]{studentId});
    }

    private RowMapper<StudentCourse> getCourseRowMapper() {
        return (resultSet, i) -> {
            String courseIdStr = resultSet.getString("course_id");
            UUID courseId = UUID.fromString(courseIdStr);

            String name = resultSet.getString("name");
            String description = resultSet.getString("description");
            String department = resultSet.getString("department");
            String teacher_name = resultSet.getString("teacher_name");
            LocalDate start_date = resultSet.getDate("start_date").toLocalDate();
            LocalDate end_date = resultSet.getDate("end_date").toLocalDate();
            int grade = resultSet.getInt("grade");

            return new StudentCourse(courseId, name, description, department, start_date, end_date, teacher_name, grade);
        };
    }

    public List<Student> selectAllStudents() {

        String sql = "Select * from student";

        return jdbcTemplate.query(sql, mapStudentFromDb());

    }

    int insertStudent(UUID newStudentId, Student student) {

        String sql = "" +
                "INSERT INTO student " +
                "(student_id, first_name, last_name, email, gender)  " +
                "VALUES(?, ?, ?, ?, ?::gender)";
        return jdbcTemplate.update(sql, newStudentId, student.getFirstName(), student.getLastName(), student.getEmail(), student.getGender().name().toUpperCase());
    }

    private RowMapper<Student> mapStudentFromDb() {
        return (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);

            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");
            String genderStr = resultSet.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);

            return new Student(
                    studentId,
                    firstName,
                    lastName,
                    email,
                    gender
            );

        };
    }


}
