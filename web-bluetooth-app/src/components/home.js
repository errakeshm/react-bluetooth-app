import React from 'react';
import GeneralBluetoothInfo from './general';
import Header from './header';

class Home extends React.Component {
    render() {
        return (
            <div className="Header">
                <Header></Header>
                <div className="body">
                    <GeneralBluetoothInfo></GeneralBluetoothInfo>
                </div>
            </div>
        )
    }
}

export default Home;