import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {FadeInImage} from '../components/FadeInImage';
import {PokemonDetails} from '../components/PokemonDetails';
import {usePokemon} from '../hooks/usePokemon';
import {RootStackParams} from '../navigator/Navigator';

interface Props
  extends NativeStackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {pokemon, color} = route.params;
  const {id, name, picture} = pokemon;
  const {top} = useSafeAreaInsets();

  const {isLoading, pokemon: pokemonFull} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      {/* Header Container */}
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{...styles.backBtn, top: top + 5}}>
          <Icon name="arrow-back-outline" size={35} color="white" />
        </TouchableOpacity>

        {/* Pokemon Name */}
        <Text style={{...styles.pokemonName, top: top + 45}}>
          {name + '\n'} #{id}
        </Text>

        <Image
          source={require('../assets/white-pokeball.png')}
          style={styles.pokeball}
        />

        <FadeInImage uri={picture} style={styles.pokemonImg} />
      </View>

      {/* Loading and Details */}
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemonFull} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backBtn: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImg: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
