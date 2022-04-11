import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {PokemonCard} from '../components/PokemonCard';
import {usePokemonsPaginated} from '../hooks/usePokemonsPaginated';
import {styles} from '../theme/appTheme';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {simplePokemonList, loadPokemons} = usePokemonsPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokeball.png')}
        style={styles.pokeballBg}
      />

      <View
        style={{
          alignItems: 'center',
        }}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={() => (
            <Text
              style={[
                styles.title,
                {top: top + 20, marginBottom: top + 20, paddingBottom: 10},
                styles.globalMargin,
              ]}>
              Pokedex
            </Text>
          )}
          renderItem={({item}) => {
            return <PokemonCard pokemon={item} />;
          }}
          // Infinite Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} color="gray" size={20} />
          }
        />
      </View>
    </>
  );
};
