import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';

enum ChangeDirection {
  UP = 0.5,
  DOWN = -0.5,
}

const style = StyleSheet.create({
  element: {
    width: 48,
    paddingVertical: 16,
    margin: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    alignItems: 'center',
  },
});

const App = () => {
  const [val, setVal] = React.useState(10);
  const [timer, setTimer] = React.useState<number | null>(null);

  useEffect(() => {
    return () => {
      endChange();
    };
  }, []);

  const doChange = (changeDirection: ChangeDirection) => {
    setVal((v) => v + changeDirection);
  };

  function startChange(changeDirection: ChangeDirection) {
    doChange(changeDirection);

    setTimer(
      setInterval(() => {
        doChange(changeDirection);
      }, 300),
    );
  }

  function endChange() {
    timer && clearInterval(timer);
    setTimer(null);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={style.element}
            onPressIn={() => startChange(ChangeDirection.DOWN)}
            onPressOut={() => endChange()}>
            <Text>-</Text>
          </TouchableHighlight>

          <View style={[style.element]}>
            <Text>{val}</Text>
          </View>

          <TouchableHighlight
            style={style.element}
            onPressIn={() => startChange(ChangeDirection.UP)}
            onPressOut={() => endChange()}>
            <Text>+</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
