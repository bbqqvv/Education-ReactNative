import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const FooterHome = () => {
    return (

        < View style={styles.footer} >
            <Image style={styles.image} source={require("@/assets/images/img-rm.png")} />
            <Text style={styles.footerText}>
                &copy; 2025 Trường THPT Trần Cao Vân. All rights reserved.
            </Text>
        </View >
    )
}

export default FooterHome

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        margin: "auto",
    },
    footer: {
        padding: 16,
        marginTop: 28,
    },
    footerText: {
        textAlign: "center",
        fontSize: 14,
        color: "#999999",
    },

})