import { withStyles } from '@material-ui/core';
import React from 'react';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },

    lightgreenBackground: {
        backgroundColor: 'lightgreen'
    }
});

class YoutubeDemo extends React.Component {
    
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>

            </div>
        )
    }
}

/*const makeStateToProps = state => ({ bluetoothStatus : state.bluetoothReducer.bluetoothStatus})
export default withStyles(useStyles)(connect(makeStateToProps)(Demo));*/
export default withStyles(useStyles)(YoutubeDemo);