import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import { RequestOption, BluetoothAPI, REQUEST_OPTION_NAME } from '../utils/bluetooth';
import { ADD_BLUETOOTH, CHECKED, REMOVE_BLUETOOTH, UNCHECKED } from '../constants/action.types';
import { connect } from 'react-redux';

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
    
    add = (bluetooth) => {
        this.props.dispatch({type : ADD_BLUETOOTH, payload: bluetooth});   
        this.props.dispatch({type : CHECKED });
    }

    remove = (bluetooth) => {
        this.props.dispatch({type : REMOVE_BLUETOOTH })
        this.props.dispatch({type : UNCHECKED })
    }
    
    toggleChecked = () => {
        this.setState({ checked: !this.state.checked },()=>{
            if (this.state.checked) {
                this.requestDevice();
            } else{
                this.remove();
            }
        });
    }

    requestDevice = () => {
        this.bluetoothAPI.requestDevice(new RequestOption(REQUEST_OPTION_NAME.ALL))
            .then(device => {
                this.add(device);
            }).catch(exception=>{
                this.props.dispatch({type : UNCHECKED });
                this.toggleChecked();
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static" className={classes.root}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>React Bluetooth POC</Typography>
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