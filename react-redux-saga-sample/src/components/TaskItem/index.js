import React, {Component} from 'react';
import { withStyles } from "@material-ui/styles";
import styles from './styles';
import { Card, CardContent, Grid, Typography, CardActions, Button, Fab, Icon } from '@material-ui/core';

class TaskItem extends Component {
    render() {
        const { task, status } = this.props;
        const { id, title, description } = task;
        return (
            <Card key={id}>
                <CardContent>
                    <Grid container justify="space-between">
                        <Grid item md={8}>
                            <Typography component="h2">
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item md={4}>
                            {status.label}
                        </Grid>
                    </Grid>
                    <p>{description}</p>
                </CardContent>
                <CardActions>
                    <Fab color="primary" aria-label="Edit" size="small">
                        <Icon fontSize="small">edit_icon</Icon>
                    </Fab>
                    <Fab color="primary" aria-label="Delete" size="small">
                        <Icon fontSize="small">delete_icon</Icon>
                    </Fab>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(TaskItem);