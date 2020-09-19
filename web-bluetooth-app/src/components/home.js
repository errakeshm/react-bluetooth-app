import { LinearProgress, Snackbar, withStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { unsetStatus } from '../actions/application.action';
import GeneralBluetoothInfo from './general';
import Header from './header';


const useStyles = (theme) => ({
    statusMessage : {
        width: '40%'
    }
});

class Home extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className="Header">
                <Header></Header>
                <div className="body">
                    { this.showLinearProgress() }
                    <GeneralBluetoothInfo></GeneralBluetoothInfo>
                </div>
                { this.constructSnackbarMessage(classes)}
            </div>
        )
    }

    showLinearProgress = () => {
        console.log(this.props.contentLoadInProgress)
        if(this.props.contentLoadInProgress){
            return <LinearProgress />
        }
        return;
    }

    handleCLose = () => {
        this.props.dispatch(unsetStatus());
    }

    constructSnackbarMessage = (classes) => {
        console.log(this.props.status.flag)
        return (
            <Snackbar className={classes.statusMessage} open={this.props.status.flag} autoHideDuration={1000} anchorOrigin={{ vertical :'top', horizontal :'center' }}>
                <Alert severity={this.props.status.code}
                    action={
                        <Close onClick={this.handleCLose}></Close>
                    }>{this.props.status.message}</Alert>
            </Snackbar>
        )
    }
}

const mapStateToProps = state => ({ status: state.applicationReducer.status, contentLoadInProgress: state.applicationReducer.contentLoadInProgress })
export default withStyles(useStyles)(connect(mapStateToProps)(Home));