import React from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { PlainText } from '../PlainText'

/**
 * A simple loading component that displays a loading gif and an optional text.
 * This component is useful when waiting for data to load or an action to complete.
 *
 * @param {object} props - The component props.
 * @param {object} props.containerStyle - Optional. The additional styles to be applied to the main container.
 * @param {string} props.text - Optional. The text to be displayed below the loading gif. Defaults to "Please Wait".
 * @returns {JSX.Element} The SimpleLoading component.
 */
export default function SimpleLoading({containerStyle, text}) {
    const style = StyleSheet.create({
        image:{
            height: 100,
            width: 100,
        },
        mainContainerStyle:{
            alignItems:'center',
            justifyContent:"center",
            ...containerStyle,
        },
    })
  return (
    <View style={style.mainContainerStyle}>
        {/* Display the loading gif */}
        <FastImage source={require("../../../assets/AppImages/Loading.gif")} style={style.image} resizeMode={FastImage.resizeMode.stretch}/>
        {/* Display the optional text */}
        <PlainText text={text ? text : "Please Wait"}/>
    </View>
  )
}

