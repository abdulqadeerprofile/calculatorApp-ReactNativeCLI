import { View, Text, Switch, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [result, setResult] = useState('');
  const { width, height } = Dimensions.get('window');

  const colors = {
    dark: '#22252D',
    dark1: '#292B36',
    dark2: '#272B33',
    light: '#FFF',
    light1: 'rgb(220, 220, 220)',
    light2: '#F7F7F7',
    teal: '#43A5BE',
    navyBlue: '#1E3A5F',
  };

  const calculate = (title) => {
    if (title === 'C') {
      setResult('');
    } else if (title === 'DL') {
      setResult(result.substring(0, result.length - 1));
    } else if (title === '=') {
      try {
        const ans = Number(eval(result).toFixed(3)).toString();
        setResult(ans);
      } catch (e) {
        setResult('Error');
      }
    } else {
      setResult(result + title);
    }
  };

  const Btn = ({ title, type }) => (
    <TouchableOpacity
      onPress={() => calculate(title)}
      style={[
        styles.button,
        { backgroundColor: getBtnColor(type), height: width * 0.2, width: width * 0.2, margin: width * 0.02 },
      ]}
    >
      <Text style={[styles.buttonText, { fontSize: width * 0.08, color: getBtnTextColor(type) }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const getBtnColor = (type) => {
    if (type === 'top') {
      return colors.teal;
    } else if (type === 'right') {
      return colors.navyBlue;
    } else if (type === 'number') {
      return getColor(colors.dark, colors.light);
    }
    return getColor(colors.dark, colors.light);
  };

  const getBtnTextColor = (type) => {
    if (type === 'number') {
      return getColor(colors.light, colors.dark);
    }
    return getColor(colors.dark, colors.light);
  };

  const getColor = (light, dark) => (darkTheme ? dark : light);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: getColor(colors.light, colors.dark) }]}>
      <Switch
        value={darkTheme}
        onValueChange={() => setDarkTheme(!darkTheme)}
        trackColor={{ true: colors.light2, false: colors.dark2 }}
        thumbColor={getColor(colors.dark, colors.light)}
      />
      <Text style={[styles.resultText, { fontSize: width * 0.1, color: getColor(colors.dark, colors.light) }]}>
        {result}
      </Text>
      <View style={[styles.buttonContainer, { backgroundColor: getColor(colors.light1, colors.dark1) }]}>
        <Btn title="C" type="top" />
        <Btn title="DL" type="top" />
        <Btn title="/" type="top" />
        <Btn title="%" type="top" />
        <Btn title="7" type="number" />
        <Btn title="8" type="number" />
        <Btn title="9" type="number" />
        <Btn title="*" type="right" />
        <Btn title="4" type="number" />
        <Btn title="5" type="number" />
        <Btn title="6" type="number" />
        <Btn title="+" type="right" />
        <Btn title="1" type="number" />
        <Btn title="2" type="number" />
        <Btn title="3" type="number" />
        <Btn title="-" type="right" />
        <Btn title="00" type="number" />
        <Btn title="0" type="number" />
        <Btn title="." type="number" />
        <Btn title="=" type="right" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  resultText: {
    width: '100%',
    textAlign: 'right',
    paddingRight: 20,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    elevation: 7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    padding: 5,
    position: 'absolute',
    bottom: 0,
  },
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    fontSize: 24,
  },
});
