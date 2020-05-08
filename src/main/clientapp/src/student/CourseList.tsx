import React, {FunctionComponent, Fragment} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {StudentCourse} from "../interface/api";

interface OwnProps {
    courses: StudentCourse[]
}

type Props = OwnProps;

const CourseList: FunctionComponent<Props> = ({courses}) => {
    console.log(courses)
    if (typeof courses === "string") {
        return null;
    }

    return (
        <List>
            {courses.map(course => {
                return (
                    <Fragment key={course.courseId}>
                        <ListItem alignItems="flex-start">
                            <ListItemText primary={
                                <Fragment>
                                    {course.name} - {course.teacher_name}
                                </Fragment>
                            } secondary={
                                <Fragment>
                                    {course.description}: {course.startDate} -- {course.endDate}
                                </Fragment>
                            }/>
                        </ListItem>
                        <Divider/>
                    </Fragment>
                )
            })}

        </List>
    )
};

export default CourseList;
