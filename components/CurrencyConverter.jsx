import React, { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from './styles';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        const currencyAr = ['USD'];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        setCurrencies(currencyAr);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => {
          const rate = response.data.rates[toCurrency];
          setResult((amount * rate).toFixed(2));
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={text => setAmount(text)}
      />
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => setFromCurrency(value)}
          items={currencies.map(currency => ({ label: currency, value: currency }))}
          value={fromCurrency}
          style={pickerSelectStyles}
        />
      </View>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => setToCurrency(value)}
          items={currencies.map(currency => ({ label: currency, value: currency }))}
          value={toCurrency}
          style={pickerSelectStyles}
        />
      </View>
      {result && (
        <Text style={styles.result}>{amount} {fromCurrency} = {result} {toCurrency}</Text>
      )}
    </View>
  );
}

export default CurrencyConverter;