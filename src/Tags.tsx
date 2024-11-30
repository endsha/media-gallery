import Colors from '@constants/colors';
import CommonStyles from '@constants/styles';
import { Post } from '@customTypes/post';
import { CollectionTag, Tag } from '@customTypes/tag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';

const pageSize = 10;

export default function Tags(): JSX.Element {
  const navigation = useNavigation<any>();

  const [ip, setIp] = React.useState<string>('');
  const [port, setPort] = React.useState<string>('');
  const [source, setSource] = React.useState<string>();
  const [tags, setTags] = React.useState<CollectionTag[]>([]);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [cannotLoadMore, setCannotLoadMore] = React.useState<boolean>(true);
  const [loadingMore, setLoadingMore] = React.useState<boolean>(false);

  const [page, setPage] = React.useState<number>(1);

  const url = React.useMemo(() => {
    let filterTag = '?';
    if (source) {
      filterTag += `source=${encodeURI(source)}&`;
    }

    return `${ip}${port ? ':' + port : ''}/api/all-tags${filterTag}`;
  }, [ip, port, source]);

  React.useEffect(() => {
    console.log('React.useEffect', url);
    handleRefresh(url);
  }, [url]);

  const refreshTags = async (url: string) => {
    setLoading(true);
    setTags([]);
    try {
      console.log('URL: ', url);

      const response = await fetch(`${url}page=1&page_size=${pageSize}`);

      if (response.status === 200) {
        const data = await response.json();
        console.log('RESPONSE: ', data);
        setTags(data.data);
        setCannotLoadMore(false);
      }
    } catch (error) {
      console.log('Error loading tags', error);
      setTags([]);
    }
    setLoading(false);
  };

  const loadMoreTags = React.useCallback(async () => {
    console.log('Load more tags: ', page, loadingMore);
    try {
      if (!loading && !loadingMore && !cannotLoadMore) {
        setLoadingMore(true);
        // Load more tags
        const response = await fetch(
          `${url}page=${page + 1}&page_size=${pageSize}`,
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log('RESPONSE: ', data);
          setTags(tags => [...tags, ...data.data]);
          if (data.data.length < pageSize) {
            setCannotLoadMore(true);
          }
        }
        setPage(page => page + 1);
        setLoadingMore(false);
      }
    } catch (error) {
      setLoadingMore(false);
      console.log('Error loading more tags', error);
      Alert.alert('Error', 'Error loading more tags');
    }
  }, [loading, loadingMore, cannotLoadMore, tags, page, url]);

  const handleRefresh = async (url: string) => {
    const storedIp = await AsyncStorage.getItem('ip');
    const storedPort = await AsyncStorage.getItem('port');

    if (storedIp) {
      setIp(storedIp);
    }
    if (storedPort) {
      setPort(storedPort);
    }
    setPage(1);
    await refreshTags(url);
  };

  const renderItem = (tag: CollectionTag) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.push('PostsByTag', { tagId: tag.id, name: tag.name });
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: tag.first_post.thumbnail }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.postNameContainer}>
            <Text style={styles.postName}>{tag.name}</Text>
          </View>
        </View>

        {/* <View style={styles.tagContainer}>
          {item.tags.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.tag}
              onPress={() => handleFilterTag(item.id, item.name)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View> */}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        removeClippedSubviews
        windowSize={5}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        data={tags}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        onRefresh={() => handleRefresh(url)}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        onEndReached={async () => {
          await loadMoreTags();
        }}
        onEndReachedThreshold={0.2}
        ListFooterComponent={() => (
          <View style={{ ...CommonStyles.flexCol.center, height: 56 }}>
            {loadingMore && (
              <ActivityIndicator size="large" color={Colors.black} />
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={CommonStyles.flexCol.center}>
            <View style={{ height: 96 }} />
            <Text>No collection tags</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    width: screenWidth - 32,
    height: screenHeight * 0.3,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  postNameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
  },
  postName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  tagContainer: {
    ...CommonStyles.flexRow.wrap,
    gap: 4,
  },
  tag: {
    backgroundColor: Colors.border,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 32,
  },
});
