import React, { Component } from 'react';
import { withStyles } from "@material-ui/styles";
import styles from './styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Modal, Grid, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as modalActions from './../../actions/modal';
import renderTextField from '../../components/FormHelper/TextField';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';
import * as taskActions from './../../actions/task';

class TaskForm extends Component {

    handleSubmitForm = data => {
        const { taskActionCreators } = this.props;
        const { addTask } = taskActionCreators;
        const { title, description } = data;
        addTask(title, description);
    }

    // required = value => {
    //     let error = 'Please input title';
    //     if (value !== null && typeof value !== 'undefined' && value.trim() !== '') {
    //         error = null;
    //     }
    //     return error;
    // }

    // minLengths = value => {
    //     let error = null;
    //     if (value.length < 5) {
    //         error = 'Title must be more than 5 characters';
    //     }
    //     return error;
    // }

    render() {
        const { classes, modalActionCreators, handleSubmit, invalid, submitting } = this.props;
        const { hideModal } = modalActionCreators;
        return (
            <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                <Grid container>
                    <Grid item md={12}>
                        <Field
                            id="title"
                            label="Title"
                            margin="normal"
                            className={classes.textField}
                            name="title"
                            component={renderTextField}
                            // validate={[this.required, this.minLengths]}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Field
                            id="descripton"
                            label="Descripton"
                            margin="normal"
                            className={classes.textField}
                            name="descripton"
                            component={renderTextField}
                            multiline
                            rowsMax="4"
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Box display="flex" flexDirection="row-reverse" mt={2}>
                            <Button disabled={invalid || submitting} variant="contained" color="primary" type="submit">Save</Button>
                            <Button variant="contained" onClick={hideModal}>Cancel</Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        )
    }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
    modalActionCreators: bindActionCreators(modalActions, dispatch),
    taskActionCreators: bindActionCreators(taskActions, dispatch),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = 'TASK_MANAGEMENT';

const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate
})

export default compose(
    withStyles(styles),
    withConnect,
    withReduxForm,
)(TaskForm);