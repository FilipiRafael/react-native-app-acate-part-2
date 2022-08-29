import { View, Text, Dimensions, StyleSheet, SafeAreaView, ScrollView, Image, Modal, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';

import Api from '../services/api';
import { ICharacter } from '../types/index';

const RMCharacters: React.FC = () => {

    const [characters, setCharacters] = useState<ICharacter[]>();
    const [showModal, setShowModal] = useState(false);
    const [characterSelected, setCharacterSelected] = useState<any>();

    useEffect(() => {
        Api.get('character')
        .then(res => setCharacters(res.data.results))
        .catch(err => console.error(err));
    })
    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    {characters?.map((character) => (
                        <Pressable
                            onPress={() => {
                                setCharacterSelected({
                                    id: character.id,
                                    name:  character.name,
                                    image: character.image,
                                    specie: character.species,
                                    gender: character.gender
                                });
                                setShowModal(true);
                            }}
                            key={character.id}
                            style={styles.card}
                        >
                            <Modal
                                animationType='slide'
                                visible={showModal}
                            >
                                <View
                                    style={styles.modal}
                                >
                                    {characterSelected && (
                                        <View>
                                            <Text>{characterSelected.name}</Text>
                                            <Text>{characterSelected.specie}</Text>
                                            <Text>{characterSelected.gender}</Text>
                                        </View>
                                    )}
                                    <Pressable
                                        style={styles.modalButtonClose}
                                        onPress={() => setShowModal(false)}
                                    >
                                        <Text
                                            style={styles.text}
                                        >
                                            Close Modal
                                        </Text>
                                    </Pressable>
                                </View>
                            </Modal>
                            <Image
                                source={{ uri: character.image }}
                                style={styles.avatar}
                            />
                            <Text
                                style={styles.textName}
                            >
                                {character.name}
                            </Text>
                            <Text
                                style={styles.text}
                            >
                                Specie: {character.species}
                            </Text>
                            <Text
                                style={styles.text}
                            >
                                Gender: {character.gender}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    modal: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').height - 600,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    card: {
        marginVertical: 20,
        paddingBottom: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
        width: Dimensions.get('window').width - 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textName: {
        textAlign: 'center',
        color: '#f1f1f1',
        fontWeight: 'bold',
        marginVertical: 12,
        fontSize: 22
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        marginVertical: 2
    },
    modalButtonClose: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 20,
        borderRadius: 5,
    }
});

export default RMCharacters;