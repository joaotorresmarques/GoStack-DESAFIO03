import React, { useEffect, useState } from "react";
import api from './services/api'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
export default function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(proj => {
      setRepository(proj.data)
    })
  })
  async function handleLikeRepository(id, command) {
    const response = await api.post(`repositories/${id}/${command}/like`)
    const list = repository.map(repo => repo.id === id ? response.data : repo)
    setRepository(list)
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={repository}
          keyExtractor={repository => repository.id}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.repositoryContainer}>
              <Text style={styles.repository} key={item.id}>{item.title}</Text>
              <View style={styles.techsContainer}>
                {item.techs.map(tech => (
                  <Text key={tech} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
              </View>
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${item.id}`}
                >
                  {item.likes} curtidas
            </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(item.id, '+')}
                  testID={`like-button-${item.id}`}
                >
                  <Text style={[styles.buttonText, styles.buttonLike]}>Curtir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(item.id, '-')}
                  testID={`like-button-${item.id}`}
                >
                  <Text style={[styles.buttonText, styles.buttonDisLike]}>Dislike</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        {/*{repository.map(repo => (
          <View key={repo.id}  style={styles.repositoryContainer}>
            <Text style={styles.repository}>{repo.title}</Text>
            <View style={styles.techsContainer}>
              {repo.techs.map(tech => (
                <Text key={tech} style={styles.tech}>
                  {tech}
                </Text>
              ))}
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-${repo.id}`}
              >
                {repo.likes} curtidas
            </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(repo.id)}
              // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
              testID={`like-button-${repo.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>
              ))}*/}
      </SafeAreaView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center"
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    flex: 1
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row"
  },
  buttonLike: {
    backgroundColor: "#7159c1"
  },
  buttonDisLike: {
    backgroundColor: "#EC407A"
  }
});
