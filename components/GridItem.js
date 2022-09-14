import React from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

const GridItem = ({ item, onSelected}) => {
    return (
        <View style={styles.gridItem}>
            <TouchableOpacity
                onPress={() => onSelected(item)}
                style={{...styles.container, backgroundColor: item.color}}
            >
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 6,
    },
    container: {
        flex: 1,
        borderRadius: 6,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 8,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontFamily: 'OpenSansBold',
    }
})

export default GridItem