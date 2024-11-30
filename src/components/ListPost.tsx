import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';

import CommonStyles from '@constants/styles';
import Colors from '@constants/colors';

import { Post } from '@customTypes/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const pageSize = 10;

interface ListPostProps {
  isHot?: boolean;
  tagId?: string;
}

export default function ListPost(props: ListPostProps): JSX.Element {
  const { isHot = false, tagId } = props;

  const navigation = useNavigation<any>();

  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingMore, setLoadingMore] = React.useState<boolean>(false);
  const [cannotLoadMore, setCannotLoadMore] = React.useState<boolean>(true);
  const [source, setSource] = React.useState<string>();

  const [page, setPage] = React.useState<number>(1);

  const url = React.useMemo(() => {
    let filterTag = '?';
    if (tagId) {
      filterTag += `tag_id=${tagId}&`;
    }
    if (source) {
      filterTag += `source=${encodeURI(source)}&`;
    }

    if (isHot) {
      return `${Config.BASE_URL}/api/hots${filterTag}`;
    }
    return `${Config.BASE_URL}/api/load-posts${filterTag}`;
  }, [isHot, tagId, source]);

  React.useEffect(() => {
    console.log('React.useEffect', url);
    handleRefresh(url);
  }, [url]);

  const refreshPosts = async (url: string) => {
    setLoading(true);
    setPosts([]);
    try {
      console.log('URL: ', url);

      const isDev = Config.IS_DEV === 'true';

      const isDevFilter = isDev ? '&is_dev=true' : '';

      const response = await fetch(
        `${url}page=1&page_size=${pageSize}${isDevFilter}`,
      );

      console.log('RESPONSE: ', response);

      if (response.status === 200) {
        const data = await response.json();
        console.log('RESPONSE: ', data);
        setPosts(data.data);
        setCannotLoadMore(false);
      }
    } catch (error) {
      console.log('Error loading posts', error);
      setPosts([]);
    }
    setLoading(false);
  };

  const loadMorePosts = React.useCallback(async () => {
    try {
      if (!loading && !loadingMore && !cannotLoadMore && posts.length > 0) {
        setLoadingMore(true);

        const isDev = Config.IS_DEV === 'true';

        const isDevFilter = isDev ? '&is_dev=true' : '';

        // Load more posts
        const response = await fetch(
          `${url}page=${page + 1}&page_size=${pageSize}${isDevFilter}`,
        );

        if (response.status === 200) {
          const data = await response.json();
          setPosts(posts => [...posts, ...data.data]);
          if (data.data.length < pageSize) {
            setCannotLoadMore(true);
          }
        }
        setPage(page => page + 1);
        setLoadingMore(false);
      }
    } catch (error) {
      setLoadingMore(false);
      console.log('Error loading more posts', error);
      Alert.alert('Error', 'Error loading more posts');
    }
  }, [loading, loadingMore, cannotLoadMore, posts, page, url]);

  const handleRefresh = async (url: string) => {
    setPage(1);
    await refreshPosts(url);
  };

  const handleFilterTag = (tagId: string, name: string) => {
    navigation.push('PostsByTag', { tagId, name });
  };

  const renderItem = (item: Post) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PostDetail', { post: item });
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.postNameContainer}>
            <Text style={styles.postName}>{item.name}</Text>
          </View>
        </View>

        <View style={styles.tagContainer}>
          {item.tags.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.tag}
              onPress={() => handleFilterTag(item.id, item.name)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={{ marginVertical: 8, ...CommonStyles.flexRow.justifyBetween }}>
        <View style={CommonStyles.flexRow.center}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => {
              setSource('buondua.com');
            }}>
            <Text>buondua</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => {
              setSource('kiutaku.com');
            }}>
            <Text>kiutaku</Text>
          </TouchableOpacity>
        </View>
        <Text>Page: {page}</Text>
      </View>

      <FlatList
        data={posts}
        // data={Posts}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        onRefresh={() => handleRefresh(url)}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        onEndReached={loadMorePosts}
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
            <Text>No posts</Text>
          </View>
        )}
      />
    </>
  );
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {
    backgroundColor: Colors.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 32,
    marginHorizontal: 4,
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
