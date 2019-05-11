import React from 'react'
import {View, Text, Alert } from 'react-native'
import {Button, ListItem, Icon} from 'react-native-elements'
import {colors } from '../shared/colors'

class Premium extends React.Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Avantages Premium'
    }

    componentDidMount() {
    }

    // handle Refs
    handleViewRef = ref => this.view = ref

    // bounce = () => this.view.bounce(1000).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

    render () {
        return (

            <View style={{padding:16}} >
                <ListItem
                    key={1}
                    title='Pas de publicité'
                    leftIcon={<Icon name='check' />}
                    bottomDivider={true}
                    chevron={true}
                />
                <ListItem
                    key={2}
                    title='+ 500 questions supplémentaires'
                    leftIcon={<Icon name='check' />}
                    bottomDivider={true}
                    chevron={true}
                     
                />

                <ListItem
                    key={3}
                    title='Jouer par catégorie de chansons'
                    leftIcon={<Icon name='check' />}
                    bottomDivider={true}
                    chevron={true}
                     
                />

                <Button
                    title='Activer Version Premium'
                    onPress={() => {Alert.alert("Bientôt disponible"); /*this.props.navigation.navigate('Membership')*/}}
                    buttonStyle={{marginTop: 32, width: 200, alignSelf:'center', backgroundColor: colors.secondary}}
                />
            </View>
            
        )
    }
}

export default Premium