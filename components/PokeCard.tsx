import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';

const PokeCard: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    useEffect(() => alert(`Count Changed: ${count}`), [count]);
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
                onPress={() => setCount(count + 1)}
            >
                <Text>Click me</Text>
            </Pressable>
        </View>
    )
}

export default PokeCard;