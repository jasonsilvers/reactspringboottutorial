import React, {FunctionComponent} from 'react';
import {Formik} from "formik";
import {createStyles, TextField, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {updateStudent} from "../data/StudentDataService";
import {useSnackbar} from "notistack";
import {Student} from "../../interface/api";

interface OwnProps {
    student: Student;
    onSuccess: () => void;
}

type Props = OwnProps;

interface FormValues {
    email: string,
    firstName: string,
    lastName: string,
    gender: string
}

type FormErrors = {
    email: string
    firstName: string
    lastName: string
    gender: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': {
                paddingBottom: theme.spacing(2),
            },
        }
    }),
);

const EditStudentForm: FunctionComponent<Props> = ({student, onSuccess}) => {

    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();

    return (
        <Formik
            initialValues={{firstName: student.firstName, lastName: student.lastName} as FormValues}
            validate={newStudent => {
                const errors = {} as FormErrors;
                if (!newStudent.firstName) {
                    errors.firstName = 'Required';
                }

                if (!newStudent.lastName) {
                    errors.lastName = 'Required'
                }
                return errors;
            }}
            onSubmit={(updatedStudent, {setSubmitting}) => {
                updateStudent(updatedStudent, student.studentId).then(result => {
                    onSuccess();
                    console.log(result);
                }).catch(error => {
                    enqueueSnackbar("Error " + error.data.message, {variant: "error"})
                    console.log(error);
                });

                setSubmitting(false);
            }}

        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  submitForm,
                  isValid
                  /* and other goodies */
              }) => (
                <form className={classes.form} onSubmit={handleSubmit}>

                    <TextField
                        error={!!(errors.firstName && touched.firstName)}
                        helperText={errors.firstName}
                        type="firstName"
                        name="firstName"
                        label="First Name"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                    />


                    <TextField
                        error={!!(errors.lastName && touched.lastName)}
                        helperText={errors.lastName}
                        type="lastName"
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}

                    />
                    <Button type="submit" disabled={isSubmitting || (touched && !isValid)}>
                        Submit
                    </Button>
                </form>
            )}

        </Formik>
    );

};

export default EditStudentForm;
