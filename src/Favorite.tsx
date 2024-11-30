import CustomModal from '@components/CustomModal';
import Colors from '@constants/colors';
import CommonStyles from '@constants/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Gallery from 'react-native-awesome-gallery';

export default function Favorite(): JSX.Element {
  const [favoritePics, setFavoritePics] = React.useState<string[]>([]);

  const [galleryInitialIndex, setGalleryInitialIndex] =
    React.useState<number>(0);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const data = React.useMemo(() => {
    return favoritePics.map(pic => ({ url: pic, id: pic }));
  }, [favoritePics]);

  const loadFavoritePics = async () => {
    const pics = await AsyncStorage.getItem('favoritePics');
    if (pics) {
      console.log('pics', pics);
      setFavoritePics(JSON.parse(pics));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFavoritePics();
    }, []),
  );

  const handleModalClose = () => {
    setModalVisible(false);
    setGalleryInitialIndex(0);
  };
  const handleModalOpen = (index: number) => {
    setGalleryInitialIndex(index);
    setModalVisible(true);
  };

  const handleChangeIndex = (index: number) => {};

  const onRemoveFavorite = async () => {
    handleModalClose();

    const newFavoritePics = favoritePics.filter(
      (_, index) => index !== galleryInitialIndex,
    );

    setFavoritePics(newFavoritePics);
    await AsyncStorage.setItem('favoritePics', JSON.stringify(newFavoritePics));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleModalOpen(index)}>
            <Image
              source={{ uri: item.url }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListHeaderComponent={() => <View style={{ height: 16 }} />}
        ListFooterComponent={() => <View style={{ height: 56 }} />}
      />
      <CustomModal
        animationType="fade"
        visible={modalVisible}
        onClose={handleModalClose}>
        <>
          <View style={styles.modalContainer}>
            <Gallery
              loop
              data={data.map((image: any) => image.url)}
              keyExtractor={(_, index) => data[index].id}
              initialIndex={galleryInitialIndex}
              onIndexChange={handleChangeIndex}
              onSwipeToClose={() => handleModalClose()}
              containerDimensions={{
                width: screenWidth,
                height: screenHeight,
              }}
              style={{ backgroundColor: Colors.black }}
            />
            <View style={styles.galleryIndexContainer}>
              <Text style={styles.galleryIndex}>
                {galleryInitialIndex + 1} / {data.length}
              </Text>
              <TouchableOpacity
                style={styles.favoriteBtn}
                onPress={onRemoveFavorite}>
                <Text style={{ color: Colors.white }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </CustomModal>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    ...CommonStyles.flexCol.alignCenter,
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: screenWidth - 32,
    height: screenHeight - 300,
    overflow: 'hidden',
    backgroundColor: Colors.border,
    borderRadius: 8,
  },
  modalContainer: {
    width: screenWidth,
    height: screenHeight,
  },
  galleryIndexContainer: {
    ...CommonStyles.flexRow.center,
    position: 'absolute',
    top: 72,
    zIndex: 10,
    width: '100%',
  },
  galleryIndex: {
    color: 'white',
  },
  favoriteBtn: {
    position: 'absolute',
    right: 20,
  },
  favoriteAlert: {
    ...CommonStyles.flexRow.center,
    position: 'absolute',
    backgroundColor: Colors.border,
    width: screenWidth - 200,
    borderRadius: 4,
    paddingVertical: 4,
  },
});
