import React from 'react';
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import { RequestOption, BluetoothAPI, REQUEST_OPTION_NAME } from '../utils/bluetooth';
import { addBluetoothDevice, turnOnBluetooth, turnOffBluetooth, removeBluetoothDevice } from '../actions/bluetooth.action';
import { connect } from 'react-redux';
import { contentLoadInProgress, contentLoadNotInProgress } from '../actions/application.action';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor:"#1769AA"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
});

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
        this.bluetoothAPI = new BluetoothAPI();
    }
    
    addBluetooth = (bluetooth) => {
        this.props.dispatch(addBluetoothDevice(bluetooth));   
        this.props.dispatch(turnOnBluetooth());
    }

    removeBluetooth = (bluetooth) => {
        this.props.dispatch(removeBluetoothDevice())
        this.props.dispatch(turnOffBluetooth())
    }
    
        linearLoading = (flag) => {
        if(flag){
            this.props.dispatch(contentLoadInProgress());
        } else{
            this.props.dispatch(contentLoadNotInProgress());
        }
    }

    linearLoading = (flag) => {
        if(flag){
            this.props.dispatch(contentLoadInProgress());
        } else{
            this.props.dispatch(contentLoadNotInProgress());
        }
    }


    toggleChecked = () => {
        this.setState({ checked: !this.state.checked },()=>{
            if (this.state.checked) {
                this.linearLoading(true);
                this.requestDevice();
            } else{
                this.removeBluetooth();
            }
        });
    }

    requestDevice = () => {
        this.bluetoothAPI.requestDevice(new RequestOption(REQUEST_OPTION_NAME.ALL))
            .then(device => {
                this.addBluetooth(device);
                this.linearLoading(false);
            }).catch(exception=>{
                this.props.dispatch(turnOffBluetooth());
                this.toggleChecked();
                this.linearLoading(false);
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static" className={classes.root}>
                    <Toolbar>
                        {/* <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton> */}
                        <Typography variant="h6" className={classes.title}>BLE Web Controller</Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={this.state.checked} onChange={this.toggleChecked}></Switch>}
                                label="Bluetooth"
                                labelPlacement="start"
                            ></FormControlLabel>
                        </FormGroup>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = state => ({bluetoothDevice : state.bluetoothReducer.device})

export default withStyles(useStyles)(connect(mapStateToProps)(Header));