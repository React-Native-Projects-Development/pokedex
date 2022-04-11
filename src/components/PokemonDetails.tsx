import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      style={{...StyleSheet.absoluteFillObject}}
      showsVerticalScrollIndicator={false}>
      <View style={{...styles.container, marginTop: 370}}>
        <Text style={styles.title}>Types</Text>
        {/* Types and Weight */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {pokemon.types.map(({type}) => (
            <Text
              key={type.name}
              style={{...styles.regularText, marginRight: 10}}>
              {type.name}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.regularText}>{pokemon.weight}kg</Text>
      </View>
      {/* Sprites */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Sprites</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicStripe}
        />

        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicStripe}
        />

        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicStripe}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicStripe}
        />
      </ScrollView>

      {/* Abilities */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Abilities</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {pokemon.abilities.map(({ability}) => (
            <Text
              key={ability.name}
              style={{...styles.regularText, marginRight: 10}}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Moves */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Abilities</Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          {pokemon.moves.map(({move}) => (
            <Text
              key={move.name}
              style={{...styles.regularText, marginRight: 10}}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map(({stat, base_stat}) => (
            <View
              key={stat.name}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{...styles.regularText, marginRight: 10, width: 150}}>
                {stat.name}
              </Text>
              <Text style={{...styles.regularText, fontWeight: 'bold'}}>
                {base_stat}
              </Text>
            </View>
          ))}
        </View>

        {/* Final Sprite */}
        <View style={{marginBottom: 20, alignItems: 'center'}}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicStripe}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  },
  basicStripe: {
    width: 100,
    height: 100,
  },
});
