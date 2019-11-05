import React, {Component} from 'react';
import { withStyles } from "@material-ui/styles";
import styles from './styles';
import { TextField } from '@material-ui/core'

class SearchBox extends Component {
    render() {
        const { handleChange } = this.props;
        return (
            <form noValidate autoComplete="off">
                <TextField
                    autoComplete="off"
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Search..."
                />
            </form>
        )
    }
}

export default withStyles(styles)(SearchBox);