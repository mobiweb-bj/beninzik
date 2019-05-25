import React from 'react'
import {AdMobBanner} from 'expo'

class Ad extends React.Component {
    render() {
        return (
            
            <AdMobBanner
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-6801044127843086/3363014104" // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={this.bannerError} 
            />
            
        )
    }
}

export default Ad