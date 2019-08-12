import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  CheckBox,
  Alert
} from "react-native";
import { observer } from "mobx-react";
//import { CheckBox } from "react-native-elements";
import AddTodo from "../AddTodo";
@observer
class TodoItem extends Component {
  state = {
    isLongPressed: false
  };
  SampleFunction = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => this.props.todoStore.deleteTodo(this.props.item)
        }
      ],
      { cancelable: false }
    );
  };
  handleCheck = () => {
    this.props.item.toggleTaskStatus();
  };
  updateHandle = value => {
    this.props.item.updateTodoDescription(value);
    this.setState({
      isLongPressed: false
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.checktext}>
          <CheckBox
            value={this.props.item.taskStatus}
            onValueChange={() => this.props.item.toggleTaskStatus()}
          />

          {this.state.isLongPressed && (
            <AddTodo
              functionToCall={this.updateHandle}
              defaultText={this.props.item.todoDesc}
            />
          )}
          {!this.state.isLongPressed && (
            <TouchableOpacity
              onLongPress={() => this.setState({ isLongPressed: true })}
            >
              {this.props.item.taskStatus && (
                <Text style={styles.text}>{this.props.item.todoDesc}</Text>
              )}
              {!this.props.item.taskStatus && (
                <Text>{this.props.item.todoDesc}</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction}>
            <Image style={styles.deleteicon} source={require("./delete.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  deleteicon: {
    height: 30,
    width: 30
  },
  checktext: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    textDecorationLine: "line-through"
  }
});
export default TodoItem;
