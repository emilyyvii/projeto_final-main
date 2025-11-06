export default function Food(){
    return(
        <View>
            <View>
                <Pressable style={styles.arrowBack} onPress={() => router.navigate("/home")}>
                <Ionicons name="arrow-back" size={24} color="#FFD400" />
                </Pressable>
                <Text style={styles.title}>Meus Pets</Text>
            </View>
            
        </View>
    )
}