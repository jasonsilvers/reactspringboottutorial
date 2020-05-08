CREATE TABLE IF NOT EXISTS course
(
    course_id    UUID         not null primary key,
    name         VARCHAR(255) not null unique,
    description  text         not null,
    department   varchar(255),
    teacher_name varchar(100)
);

CREATE TABLE IF NOT EXISTS student_course
(
    student_id UUID NOT NULL REFERENCES student (student_id),
    course_id  UUID not null references course (course_id),
    start_date date not null,
    end_date   date not null,
    grade      int CHECK (grade >= 0 AND grade <= 100),
    UNIQUE (student_id, course_id)
);