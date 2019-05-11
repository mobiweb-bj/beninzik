import React from 'react'
import {AdMobBanner} from 'expo'

class Ad extends React.Component {
    render() {
        return (
            
            <AdMobBanner
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-2830937295756721/6193048382" // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={this.bannerError} 
            />
            
        )
    }
}

export default Ad