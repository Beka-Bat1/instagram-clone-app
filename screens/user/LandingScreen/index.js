import React from 'react'
import { View, Button } from 'react-native'

const LandingScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
           <Button
           title="press me"
           onPress={() => {
            navigation.navigate('Register')
           }}

            />
        </View>
    )
}

export default LandingScreen
