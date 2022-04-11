import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ImageColors from 'react-native-image-colors';

import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  const getBgColor = async () => {
    const result = await ImageColors.getColors(pokemon.picture, {
      fallback: 'grey',
    });

    if (!isMounted.current) return;

    if (result.platform === 'android') {
      setBgColor(result.dominant || 'grey');
    } else {
      setBgColor(result.platform === 'ios' ? result.background : 'grey');
    }
  };

  useEffect(() => {
    // iOS: background
    // Android: dominant
    getBgColor();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const onPressCard = () => {
    navigation.navigate('PokemonScreen', {
      pokemon,
      color: bgColor,
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPressCard}>
      <View
        style={{
          ...styles.cardContainer,
          backgroundColor: bgColor,
          width: windowWidth * 0.4,
        }}>
        {/* Pokemon ID - Name */}
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokeballContainer}>
          <Image
            source={require('../assets/white-pokeball.png')}
            style={styles.pokeball}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImg} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokeballContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
  pokeball: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImg: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
});
