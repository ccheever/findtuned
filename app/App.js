import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";

import search, { searchTracksFromQuery } from "./search";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    text: "",
    data: []
  };

  _updateResults(query) {
    let tracks = searchTracksFromQuery(query);
    let data = tracks.slice(0, 100);
    this.setState({ data, text: query });
  }

  componentDidMount() {
    this._updateResults(this.state.text);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 100
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10
            }}
          >
            <Image
              source={require("./assets/duet.png")}
              style={{
                height: 32,
                width: 32,
                alignSelf: "center",
                marginBottom: 3,
                marginRight: 6
              }}
            />
            <Text style={styles.header}>FindTuned</Text>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Search by Song or Artist"
              value={this.state.text}
              onChangeText={text => {
                this._updateResults(text);
              }}
            />
          </View>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor="#eeeeee"
              onPress={() => {
                // console.log("Touched " + item.id);
                Linking.openURL(item.url);
              }}
            >
              <View key={item.id} style={styles.searchResult}>
                <Image
                  source={{
                    uri: item.image
                  }}
                  style={{
                    height: 32,
                    width: 32,
                    margin: 4
                  }}
                />

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.trackName}>{item.name}</Text>
                  <Text style={styles.artistName}>{item.artist}</Text>
                </View>

                {/*
                <Text style={styles.duration}>
                  {msToMinSecs(item.duration)}
</Text> */}
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

function msToMinSecs(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const styles = StyleSheet.create({
  trackName: {
    color: "#222222",
    fontSize: 18,
    fontWeight: "500",
    width: width - 40,
    height: 24
  },
  artistName: {
    color: "#aaaaaa",
    fontSize: 15,
    fontWeight: "400"
  },
  duration: {
    fontSize: 18,
    color: "#bbbbbb",
    fontWeight: "400",
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 5
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 40
  },
  header: {
    fontWeight: "bold",
    fontSize: 36,
    color: "black"
    // marginHorizontal: 10
  },
  textInputContainer: {
    width: width,
    backgroundColor: "transparent",
    height: 42,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  textInput: {
    flex: 1,
    borderRadius: 0,
    fontSize: 24,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginHorizontal: 10
  },
  searchResult: {
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    width: width,
    justifyContent: "space-between",
    marginTop: 5,
    paddingBottom: 5
  }
});
