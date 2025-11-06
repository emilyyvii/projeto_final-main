import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export default function Tag(){
    return( 
        <View style={styles.container}>
            <Ionicons name="mail" size={20} color="#000"  />
            <Text>
                TAG
            </Text>
        </View>
        
    )}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#141496',
            alignItems: 'center',
            gap: 25,
            justifyContent: 'center'
        },
    })