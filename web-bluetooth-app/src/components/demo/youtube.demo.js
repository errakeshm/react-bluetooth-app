import { Button, Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { setStatus, ytVideoDecrVolume, ytVideoForward, ytVideoIncrVolume, ytVideoPaused, ytVideoPlayed } from '../../actions/application.action';
import { ERROR } from '../../constants/application.constants';
import { BluetoothAPI } from '../../utils/bluetooth';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },

    lightgreenBackground: {
        backgroundColor: 'lightgreen'
    },

    roundButton:{
        borderRadius:'100%',
        padding:theme.spacing(2),
        backgroundColor:'yellow'
    },
    rightAlign:{
        textAlign:'right'
    }
});

class YoutubeVideoControlDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bleCharacteristic: null
        }
        this.bluetoothAPI = new BluetoothAPI();
        this.player = null;
        this.playerEvent = null;
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={2} lg={2}>
                        {this.establishNotification(classes)}
                        <Grid container spacing={3} justify="center" alignItems="center">
                            <Grid item xs={6} className={`${classes.rightAlign}`}>
                                <Button variant="contained" className={classes.roundButton}>1</Button>
                            </Grid>
                            <Grid item xs={6} >
                                Play Video
                            </Grid>
                            <Grid item xs={6}  className={`${classes.rightAlign}`}>
                                <Button variant="contained" className={classes.roundButton}>2</Button>
                            </Grid>
                            <Grid item xs={6}>
                                Pause Video
                            </Grid>
                            <Grid item xs={6}  className={`${classes.rightAlign}`}>
                                <Button variant="contained" className={classes.roundButton}>4</Button>
                            </Grid>
                            <Grid item xs={6}>
                                Increase Volume
                            </Grid>
                            <Grid item xs={6}  className={`${classes.rightAlign}`}>
                                <Button variant="contained" className={classes.roundButton}>5</Button>
                            </Grid>
                            <Grid item xs={6}>
                                Decrease Volume
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div id="player"></div>
                        {this.setupYoutubeVideo()}
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <b><u>INSTRUCTIONS</u></b>
                        <br/>
                        1 - Drag the slider to 1 and press notify. This will play the video
                        <br/>
                        2 - Drag the slider to 2 and press notify. This will pause the video
                        <br/>
                        3 - Drag the slider to 3 and press notify. This will increase the volume
                        <br/>
                        4 - Drag the slider to 4 and press notify. This will decrease the volume
                    </Grid>
                </Grid>
            </div>
        )
    }

    setupYoutubeVideo = () => {
        if (typeof (window.YT) == 'undefined' || typeof (window.YT.Player) == 'undefined') {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            //console.log(window.YT);
            this.player = new window.YT.Player('player', {
                videoId: '0m3hGZvD-0s',
                playerVars : {
                    html5 : 1
                },
                events: {
                    'onReady': (event) => {
                        this.playerEvent = event;
                    }
                }
            })
        }
        if(this.playerEvent != null) {
            //console.log('Status', this.props.ytVideo.playVideo)
            if(this.props.ytVideo.playVideo){
                this.playerEvent.target.playVideo();
            } else{
                this.playerEvent.target.pauseVideo();
            }
            /*if(this.props.ytVideo.forward !== 0){
                console.log(this.playerEvent.target.getDuration(), this.playerEvent.target.getCurrentTime());
                this.playerEvent.target.seekTo(this.playerEvent.target.getCurrentTime() + this.props.ytVideo.forward, true);
                this.props.dispatch(ytVideoForward(0));
            }*/
        }

    }

    establishNotification = (classes) => {
        if (this.props.device !== undefined && this.props.device !== null && !this.props.device.gatt.connected) {
            console.log('ENTERED NOTIFICATION')
            this.bluetoothAPI.getNotification(this.props.device).then(
                characteristic => {
                    this.setState({ bleCharacteristic: characteristic }, () => {
                        this.state.bleCharacteristic.startNotifications().then(
                            _ => {
                                this.state.bleCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
                                    let dataview = event.target.value;
                                    this.triggerAction(dataview.getUint8());            
                                });
                            }
                        )
                    });
                }
            ).catch(err => {
                this.props.dispatch(setStatus(ERROR, err.message));
          
            })
        }
    }

    triggerAction = (code)=>{
        if(code === 1){
            this.props.dispatch(ytVideoPlayed())
        } 
        else if(code ===2 ){
            this.props.dispatch(ytVideoPaused())
        }
        else if(code === 3){
            this.props.dispatch(ytVideoForward(10));
        }
        else if(code === 4){
            this.props.dispatch(ytVideoIncrVolume(10));
            console.log(this.props.ytVideo.volume)
            this.playerEvent.target.setVolume(this.props.ytVideo.volume);
        } 
        else if(code === 5){
            this.props.dispatch(ytVideoDecrVolume(10));
            this.playerEvent.target.setVolume(this.props.ytVideo.volume);
        }
    }
}

const makeStateToProps = state => ({
    bluetoothStatus: state.bluetoothReducer.bluetoothStatus,
    ytVideo : state.applicationReducer.ytVideo,
    device: state.bluetoothReducer.device
})
export default withStyles(useStyles)(connect(makeStateToProps)(YoutubeVideoControlDemo));