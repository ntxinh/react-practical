import React, {Component} from 'react';
import { withStyles } from "@material-ui/styles";
import styles from './styles';
import { Grid, Box, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import TaskItem from '../TaskItem';

class TaskList extends Component {
    render() {
        const { tasks, status } = this.props;
        return (
            <Grid item md={4} xs={12} key={status.value}>
                <Box mt={2} mb={2}>
                    <div>{status.label}</div>
                </Box>
                <div>
                    {
                        tasks.map(task => {
                            return (
                                <TaskItem task={task} status={status} key={task.id}/>
                            )
                        })
                    }
                </div>
            </Grid>
        )
    }
}

export default withStyles(styles)(TaskList);