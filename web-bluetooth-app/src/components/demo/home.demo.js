import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography, withStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';
import YoutubeDemo from './youtube.demo';


const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },

    lightgreenBackground: {
        backgroundColor: 'lightgreen'
    }
});

class Demo extends React.Component {
    
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Accordion className={classes.lightgreenBackground} style={{display : this.props.bluetoothStatus ? 'block' : 'none'}}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography className={classes.accordionHeading}>Demo Application</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            <YoutubeDemo></YoutubeDemo>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }
}

const makeStateToProps = state => ({ bluetoothStatus : state.bluetoothReducer.bluetoothStatus})
export default withStyles(useStyles)(connect(makeStateToProps)(Demo));