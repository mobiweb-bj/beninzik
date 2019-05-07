import React from 'react'
import {AdMobBanner} from 'expo'

class Ad extends React.Component {
    render() {
        return (
            
            <AdMobBanner
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={this.bannerError} 
            />
            
        )
    }
}

export default Ad