import React, {FunctionComponent} from 'react';
import {Formik} from "formik";
import {createStyles, TextField, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {addNewStudent} from "../StudentDataService";
import {useSnackbar} from "notistack";

interface OwnProps {
    onSuccess: () => void
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
        },
    }),
);

const AddStudentForm: FunctionComponent<Props> = (props) => {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            initialValues={{email: '', firstName: '', lastName: '', gender: ''} as FormValues}
            validate={newStudent => {
                const errors = {} as FormErrors;
                if (!newStudent.firstName) {
                    errors.firstName = 'Required';
                }

                if (!newStudent.lastName) {
                    errors.lastName = 'Required'
                }

                if (!newStudent.gender) {
                    errors.gender = 'Required'
                } else if (!['MALE', 'male', 'FEMALE', 'female'].includes(newStudent.gender)) {
                    errors.gender = 'Gender must be (MALE, male, FEMALE, female)'
                }

                if (!newStudent.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newStudent.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(newStudent, {setSubmitting}) => {

                addNewStudent(newStudent).then(result => {
                    setSubmitting(false);
                    props.onSuccess();
                    console.log(result);
                }).catch(error => {
                    setSubmitting(false);
                    enqueueSnackbar("Error " + error.data.message, {variant: "error"})
                    console.log(error);
                });
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
                        type="email"
                        name="email"
                        label="E-Mail"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && touched.email && errors.email}

                    <TextField
                        type="firstName"
                        name="firstName"
                        label="First Name"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                    />
                    {errors.firstName && touched.firstName && errors.firstName}

                    <TextField
                        type="lastName"
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                    />
                    {errors.lastName && touched.lastName && errors.lastName}

                    <TextField
                        type="gender"
                        name="gender"
                        label="Gender"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gender}
                    />
                    {errors.gender && touched.gender && errors.gender}
                    <Button type="submit" disabled={isSubmitting || (touched && !isValid)}>
                        Submit
                    </Button>
                </form>
            )}

        </Formik>
    );

};

export default AddStudentForm;
