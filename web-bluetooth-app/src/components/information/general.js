import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, withStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux'
import { contentLoadInProgress, contentLoadNotInProgress, setStatus } from '../../actions/application.action';
import { ERROR, SUCCESS } from '../../constants/application.constants';
import { BluetoothAPI, BluetoothDevice } from '../../utils/bluetooth';
import { toCamelCase } from '../../utils/string-helper';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    cardPaper: {
        backgroundColor: "#2196f3",
        height: theme.spacing(4),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        color: "white",
        padding: theme.spacing(1)
    },
    elementCard: {
        marginBottom: theme.spacing(2)
    },
    elementCardContent: {
        backgroundColor: "#DCDCDC",
        padding: 0,
        paddingTop: theme.spacing(2)
    },
    messageCard: {
        textAlign: 'center'
    },
    messageCardContent: {
        backgroundColor: "#DCDCDC",
        padding: theme.spacing(2),
        fontWeight: '600',
        height: '4rem',
        justifyContent: 'center',
    },
    table: {
        minWidth: '100%',
        height: '100%'
    },
    cardHeaderName: {
        fontSize: '1.2rem',
        fontWeight: 600
    },
    cardContainer: {
        margin: theme.spacing(2)
    },
    alignCenter: {
        display: 'flex',
        justifyContent: 'center',
        verticalAlign: 'middle',
        textAlign: 'center'
    },
    accordionHeading: {
        fontSize: '1rem',
        fontWeight:'bold'
    },
    orangeBackground: {
        backgroundColor: 'orange'
    }
});

class GeneralBluetoothInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bluetoothDevice: new BluetoothDevice()
        }
        this.bluetoothAPI = new BluetoothAPI();
    }

    linearLoading = (flag) => {
        if(flag){
            this.props.dispatch(contentLoadInProgress());
        } else{
            this.props.dispatch(contentLoadNotInProgress());
        }
    }
    getBluetoothDevice = () => {
        // Check if bluetooth is enabled, if not enabled dont render anything
        if (!this.props.bluetoothStatus)
            return;
        // Get all the properties of the bluetooth device
        if (this.props.device !== undefined && this.props.device !== null && !this.props.device.gatt.connected) {
            this.bluetoothAPI.getAllProperties(this.props.device)
                .then(device => {
                    this.setState({ bluetoothDevice: device });
                    this.props.dispatch(setStatus(SUCCESS, "Device has been paired"));
                    this.linearLoading(false);
                }).catch(err => {
                    this.props.dispatch(setStatus(ERROR, err.message));
                    this.linearLoading(false);
                });
        }

    }

    constructRows = (attributes) => {
        let rowList = [];
        for (const [key, value] of attributes.entries()) {
            rowList.push(
                <TableRow key={key}>
                    <TableCell align="left"><b>{key.substr(key.indexOf("#"))}</b></TableCell>
                    <TableCell align="right">{value}</TableCell>
                </TableRow>
            )
        }
        return rowList;
    }

    constructRowsWithCategory = (category, attributes) => {
        let rowList = [];
        for (const [key, value] of attributes.entries()) {
            if (category === key.substr(0, key.indexOf('#'))) {
                rowList.push(
                    <TableRow key={key}>
                        <TableCell align="left"><b>{key.substr(key.indexOf("#") + 1)}</b></TableCell>
                        <TableCell align="right">{value}</TableCell>
                    </TableRow>
                )
            }
        }
        return rowList;
    }

    constructTable = (classes) => {
        // Check if bluetooth is enabled, if not enabled dont render anything
        if (!this.props.bluetoothStatus)
            return;
        const properties = this.state.bluetoothDevice.getProperties();
        const mainCategory = this.state.bluetoothDevice.getMainCategoryList();
        const tables = [];
        mainCategory.forEach((category) => {
            tables.push(
                <Grid key={category} item lg={4} md={6} sm={12}>
                <Card key={category} className={classes.elementCard}>
                    <CardContent className={classes.elementCardContent}>
                        <div className={classes.cardContainer}>
                            <Paper elevation={3} className={classes.cardPaper} variant="outlined" square>{toCamelCase(category)}</Paper>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                        {this.constructRowsWithCategory(category, properties)}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </CardContent>
                </Card>
                </Grid>
            );
        });
        return tables;
    }

    constructNoDeviceConnected(classes) {
        if (!this.props.bluetoothStatus) {
            return (
                <Grid container spacing={0} direction="column" alignItems="center" justify="center" >
                    <Grid item style={{minWidth:'50%'}}>
                        <Card className={classes.messageCard}>
                            <CardContent className={classes.messageCardContent}>
                                No Device has been added
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )
        }
    }

    render() {
        const { classes } = this.props;
        this.getBluetoothDevice();
        return (
            <div className={classes.root}>
                <div className={` ${classes.alignCenter}`}>
                    {this.constructNoDeviceConnected(classes)}
                </div>
                <Accordion className={classes.orangeBackground} style={{display : this.props.bluetoothStatus ? 'block' : 'none'}}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography className={classes.accordionHeading}>Bluetooth Device Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {this.constructTable(classes)}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }

    getBluetoothAvailability = () => {
        this.bluetoothAPI.getBluetoothAvailability().then(available => {
            if (available) {
                console.log("Yes Available");
            } else {
                console.log("Not available");
            }
        })
    }

}

const mapStateToProps = state => ({
    device: state.bluetoothReducer.device,
    bluetoothStatus: state.bluetoothReducer.bluetoothStatus,
    status: state.applicationReducer.status
})

export default withStyles(useStyles)(connect(mapStateToProps)(GeneralBluetoothInfo));