
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NoFavouriteIcon from '../../assets/images/icons/no-favourite';
import { BaseColors } from '../constants/colors';
import { typography } from '../constants/typography';
import { useRecipes } from '../context/recipes-context';

const Favourites = () => {
  const insets = useSafeAreaInsets();
  const { favourites } = useRecipes();

  const styles = StyleSheet.create({
    container: {
      paddingTop: insets.top,
      flex: 1,
      backgroundColor: BaseColors.neutralLightLight,
      paddingHorizontal: 16,
    },
    title: {
      ...typography.h1,
      color: BaseColors.neutralDarkDarkest,
      paddingTop: 24,
      marginBottom: 16,
    },
    noFavouriteContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    noFavouritesTitle: {
      ...typography.h3,
      color: BaseColors.neutralDarkDarkest,
      paddingTop: 22,
    },
    noFavouritesDescription: {
      ...typography.bodyM,
      color: BaseColors.neutralDarkDarkest,
      paddingTop: 12,
    },
    rightAction: { width: 50, height: 50, backgroundColor: 'purple' },
    separator: {
      width: '100%',
      borderTopWidth: 1,
    },
    swipeable: {
      width: '100%',
    },
  });

  return (
    <View testID="favourites-screen" style={styles.container}>
        <Text style={styles.title}>My Favourites</Text>
        {favourites.length === 0 && (
          <View style={styles.noFavouriteContainer}>
            <NoFavouriteIcon size={64} />
            <Text style={styles.noFavouritesTitle}>
              Your Favorites Are Empty
            </Text>
            <Text style={styles.noFavouritesDescription}>
              {"You haven't saved anything here yet"}
            </Text>
          </View>
        )}

        {favourites.map((fav) => (
          
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 16,
                }}
                key={Number(fav?.id)}
              >
                <Image
                  source={{ uri: fav?.image }}
                  style={{ width: 80, height: 72, borderRadius: 16 }}
                />
                <View style={{ flexDirection: 'column', flex: 1, gap: 6 }}>
                  <Text
                    style={{
                      ...typography.captionM,
                      color: BaseColors.highlightDark,
                    }}
                  >
                    {fav?.mealType?.join(', ')?.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      ...typography.h3,
                      color: BaseColors.neutralDarkDarkest,
                    }}
                    numberOfLines={2}
                  >
                    {fav?.name}
                  </Text>
                </View>
              </View>

                   ))}
      </View>
  );
};

export default Favourites;
