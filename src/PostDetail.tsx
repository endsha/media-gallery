import CustomModal from '@components/CustomModal';
import Colors from '@constants/colors';
import CommonStyles from '@constants/styles';
import { Post } from '@customTypes/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Gallery from 'react-native-awesome-gallery';

export default function PostDetail({ route, navigation }: any): JSX.Element {
  const { post } = route.params;

  const [galleryInitialIndex, setGalleryInitialIndex] =
    React.useState<number>(0);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [postDetail, setPostDetail] = React.useState<Post>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const favoriteAlertAnim = React.useRef(new Animated.Value(0)).current;

  const loadPostDetail = async (postId: string) => {
    setLoading(true);
    try {
      const ip = await AsyncStorage.getItem('ip');
      const port = await AsyncStorage.getItem('port');

      const response = await fetch(
        `${ip}${port ? ':' + port : ''}/api/post/${postId}`,
      );

      if (response.status === 200) {
        const data = await response.json();
        setPostDetail(data.data);
      }
    } catch (error) {
      console.log('Error loading post detail', error);
      setPostDetail(undefined);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    loadPostDetail(post.id);
  }, [post.id]);

  const handleModalClose = () => {
    setModalVisible(false);
    setGalleryInitialIndex(0);
  };
  const handleModalOpen = (index: number) => {
    setGalleryInitialIndex(index);
    setModalVisible(true);
  };

  const handleChangeIndex = (index: number) => {
    console.log('index', index);
    setGalleryInitialIndex(index);
  };

  const onLikePicture = async () => {
    showFavoriteAlert();

    if (postDetail) {
      console.log('like pic', postDetail.images[galleryInitialIndex].url);
      const favoritePics = await AsyncStorage.getItem('favoritePics');

      if (!favoritePics) {
        await AsyncStorage.setItem(
          'favoritePics',
          JSON.stringify([postDetail.images[galleryInitialIndex].url]),
        );
      } else {
        const parsedPics = JSON.parse(favoritePics);
        // Check if the picture is already in favorite
        if (!parsedPics.includes(postDetail.images[galleryInitialIndex].url)) {
          await AsyncStorage.setItem(
            'favoritePics',
            JSON.stringify([
              ...parsedPics,
              postDetail.images[galleryInitialIndex].url,
            ]),
          );
        }
      }
    }

    hideFavoriteAlert();
  };

  const showFavoriteAlert = () => {
    Animated.timing(favoriteAlertAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const hideFavoriteAlert = () => {
    Animated.timing(favoriteAlertAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    );
  }

  if (!postDetail) {
    return (
      <View style={styles.container}>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={postDetail.images}
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
        ListHeaderComponent={() => (
          <View
            style={{ ...CommonStyles.flexRow.alignCenter, marginBottom: 12 }}>
            <Text style={{ flex: 1, textAlign: 'center' }}>
              {postDetail?.name}
            </Text>
          </View>
        )}
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
              data={postDetail.images.map((image: any) => image.url)}
              keyExtractor={(_, index) => postDetail.images[index].id}
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
                {galleryInitialIndex + 1} / {postDetail.images.length}
              </Text>
              <TouchableOpacity
                style={styles.favoriteBtn}
                onPress={onLikePicture}>
                <Text style={{ color: Colors.white }}>Like</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Animated.View
            style={{
              ...styles.favoriteAlert,
              bottom: favoriteAlertAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 20],
              }),
            }}>
            <Text>Added to favorite</Text>
          </Animated.View>
        </>
      </CustomModal>
    </View>
  );
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
