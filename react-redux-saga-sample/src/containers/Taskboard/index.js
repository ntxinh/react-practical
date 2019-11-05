import React, { Component, useCallback } from 'react';
import { withStyles } from "@material-ui/styles";
import styles from './styles';
import { Button, Grid, DialogTitle, Dialog, DialogContent, DialogActions, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { STATUSES } from './../../constants';
import TaskList from './../../components/TaskList'
import TaskForm from './../TaskForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from './../../actions/task';
import SearchBox from './../../components/SearchBox';
import * as modalActions from './../../actions/modal';

class Taskboard extends Component {

    state = {
        open: false,
    }

    componentDidMount() {
        const { taskActionCreators } = this.props;
        const { fetchListTask } = taskActionCreators;
        fetchListTask();
    }

    renderBoard() {
        const { listTask } = this.props;
        let xhtml = null;
        xhtml = (
            <Grid container spacing={2}>
                {STATUSES.map(status => {
                    const taskFiltered = listTask.filter(task => task.status === status.value);
                    return <TaskList tasks={taskFiltered} status={status} key={status.value} />
                })}
            </Grid>
        )
        return xhtml;
    }

    // renderForm() {
    //     const { open } = this.state;
    //     let xhtml = null;
    //     xhtml = (
    //         <TaskForm open={open} onClose={this.handleClose} />
    //     )
    //     return xhtml;
    // }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    openForm = () => {
        const { modalActionCreators } = this.props;
        const { showModal, changeModalTitle, changeModalContent } = modalActionCreators;
        showModal();
        changeModalTitle('Add new task');
        changeModalContent(<TaskForm />);
    }

    loadData = () => {
        const { taskActionCreators } = this.props;
        const { fetchListTask } = taskActionCreators;
        fetchListTask();
    }

    handleFilter = (e) => {
        const { value } = e.target;
        const { taskActionCreators } = this.props;
        const { filterTask } = taskActionCreators;
        filterTask(value);
    }

    renderSearchBox = () => {
        let xhtml = null;
        xhtml = (
            <SearchBox handleChange={this.handleFilter} />
        )
        return xhtml;
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.loadData}>
                    Load Data
                </Button>
                <Button variant="contained" color="primary" onClick={this.openForm}>
                    <AddIcon />Add Task
                </Button>

                {this.renderSearchBox()}
                {this.renderBoard()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listTask: state.task.listTask
    }
};
const mapDispatchToProps = dispatch => {
    return {
        taskActionCreators: bindActionCreators(taskActions, dispatch),
        modalActionCreators: bindActionCreators(modalActions, dispatch),
    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Taskboard));