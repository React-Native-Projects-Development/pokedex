import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Platform, Text, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';

import {SearchInput} from '../components/SearchInput';
import {usePokemonsSearch} from '../hooks/usePokemonSearch';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {styles} from '../theme/appTheme';

const {width} = Dimensions.get('window');

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonsSearch();

  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(searchTerm))) {
      setPokemonFiltered(
        simplePokemonList.filter(pokemon =>
          pokemon.name
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(
        pokemon => pokemon.id === searchTerm,
      );

      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [searchTerm]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={(value: string) => setSearchTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: width - 40,
          top: Platform.OS === 'ios' ? top : top + 30,
        }}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={pokemon => pokemon.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={() => (
          <Text
            style={[
              styles.title,
              {
                paddingBottom: 10,
                marginTop: Platform.OS === 'ios' ? top + 60 : top + 30,
              },
              styles.globalMargin,
            ]}>
            {searchTerm}
          </Text>
        )}
        renderItem={({item}) => {
          return <PokemonCard pokemon={item} />;
        }}
      />
    </View>
  );
};
