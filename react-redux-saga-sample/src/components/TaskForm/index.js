import React, {Component} from 'react';
import { withStyles } from "@material-ui/styles";
import styles from './styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

class TaskForm extends Component {
    render() {
        const { open, onClose } = this.props;
        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Add Task</DialogTitle>
                <DialogContent>
                    <TextField
                        id=""
                        label="Title"
                        margin="normal"
                    />
                    <TextField
                        id=""
                        label="Description"
                        multiline
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={onClose}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(TaskForm);