import { Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux'
import { BluetoothDevice } from '../utils/bluetooth';
import { toCamelCase } from '../utils/string-helper';

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
    mainCard:{
        marginBottom: theme.spacing(2)
    },
    card: {
        backgroundColor: "#DCDCDC",
        padding: 0,
        paddingTop:theme.spacing(2)
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
    }
})
class GeneralBluetoothInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bluetoothDevice: new BluetoothDevice()
        }
    }

    getBluetoothDevice = () => {
        // Check if bluetooth is enabled, if not enabled dont render anything
        if(!this.props.bluetoothStatus)
            return;
        
        if (this.props.device !== undefined && this.props.device !== null && !this.props.device.gatt.connected) {
            this.props.device.gatt.connect()
                .then(server => {
                    return server.getPrimaryServices()
                })
                .then(services => {
                    let queue = Promise.resolve();
                    services.forEach(service => {
                        queue = queue.then(_ => {
                            service.getCharacteristics().then(characteristics => {
                                let bluetoothDevice = new BluetoothDevice();
                                bluetoothDevice.put("general", "id", this.props.device.id);
                                bluetoothDevice.put("general", "name", this.props.device.name);
                                bluetoothDevice.put("characteristics", "uuid", service.uuid);
                                bluetoothDevice.put("characteristics", "isPrimary", "" + service.isPrimary);
                                characteristics.forEach(characteristic => {
                                    for (const property in characteristic.properties) {
                                        bluetoothDevice.put("properties", property, "" + characteristic.properties[property]);
                                    }
                                });
                                this.setState({ bluetoothDevice: bluetoothDevice });
                            });

                        })
                    })
                });
        }
    }

    constructRows(attributes) {
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

    constructRowsWithCategory(category, attributes) {
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

    constructTable(classes) {
        // Check if bluetooth is enabled, if not enabled dont render anything
        if(!this.props.bluetoothStatus)
            return;
        const properties = this.state.bluetoothDevice.getProperties();
        const mainCategory = this.state.bluetoothDevice.getMainCategoryList();
        const tables = [];
        mainCategory.forEach((category) => {
            tables.push(
                <Card key={category} className={classes.mainCard}>
                    <CardContent className={classes.card}>
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
            );
        });
        return tables;
    }
    render() {
        const { classes } = this.props;
        this.getBluetoothDevice();
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item lg={4} md={6} sm={12}>
                        { this.constructTable(classes) }
                    </Grid>
                    {/* <Grid item lg={4} md={6} sm={12}>
                        <Card>Testing</Card>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12}>
                        <Card>Testing</Card>
                    </Grid> */}
                </Grid>
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

const mapStateToProps = state => ({ device: state.bluetoothReducer.device, bluetoothStatus: state.bluetoothReducer.bluetoothStatus })

export default withStyles(useStyles)(connect(mapStateToProps)(GeneralBluetoothInfo));