import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { styles, pickerSelectStyles } from "./styles";

const CurrencyConverter = () => {
  // State variables
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrencies, setToCurrencies] = useState(["EUR"]);
  const [results, setResults] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Fetch available currencies on component mount
  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        const currencyAr = ["USD"];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        setCurrencies(currencyAr);
      })
      .catch((error) => {
        setError("Failed to fetch currency data. Please try again later.");
        console.error(error);
      });
  }, []);

  // Fetch conversion rates whenever amount, fromCurrency, or toCurrencies change
  useEffect(() => {
    if (amount === "" || amount === "0") {
      const newResults = {};
      toCurrencies.forEach((currency) => {
        newResults[currency] = "0.00";
      });
      setResults(newResults);
    } else if (amount && fromCurrency && toCurrencies.length > 0) {
      const fetchRates = async () => {
        try {
          const response = await axios.get(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
          );
          const newResults = {};
          toCurrencies.forEach((currency) => {
            const rate = response.data.rates[currency];
            newResults[currency] = (amount * rate).toFixed(2);
          });
          setResults(newResults);
        } catch (error) {
          setError("Failed to fetch conversion rates. Please try again later.");
          console.error(error);
        }
      };
      fetchRates();
    }
  }, [amount, fromCurrency, toCurrencies]);

  // Swap fromCurrency and toCurrency
  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrencies[0]);
    setToCurrencies([temp, ...toCurrencies.slice(1)]);
  };

  // Handle amount input change
  const handleAmountChange = (text) => {
    if (isNaN(text)) {
      setError("Please enter a valid number.");
    } else {
      setError(null);
      setAmount(text);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((previousState) => !previousState);
  };

  // Add a new target currency
  const addTargetCurrency = () => {
    setToCurrencies([...toCurrencies, ""]);
  };

  // Remove a target currency
  const removeTargetCurrency = (index) => {
    if (toCurrencies.length > 1) {
      const newToCurrencies = toCurrencies.filter((_, i) => i !== index);
      setToCurrencies(newToCurrencies);
    } else {
      setError("At least one target currency is required.");
    }
  };

  // Animate the component on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    // Main container with conditional styling based on dark mode
    <View
      style={[
        styles.screen,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Title */}
          <Text
            style={[
              styles.title,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Currency Converter
          </Text>

          {/* Dark mode toggle button */}
          <TouchableOpacity
            onPress={toggleDarkMode}
            style={[
              styles.modeButton,
              isDarkMode ? styles.darkModeButton : styles.lightModeButton,
            ]}
          >
            <Ionicons
              name={isDarkMode ? "sunny" : "moon"}
              size={24}
              color="#fff"
            />
            <Text style={styles.modeButtonText}>
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </Text>
          </TouchableOpacity>

          {/* Amount input field */}
          <TextInput
            style={[
              styles.input,
              isDarkMode ? styles.darkInput : styles.lightInput,
            ]}
            placeholder="Amount"
            placeholderTextColor={isDarkMode ? "#ccc" : "#666"}
            keyboardType="numeric"
            value={amount}
            onChangeText={handleAmountChange}
          />

          {/* Error message */}
          {error && <Text style={styles.error}>{error}</Text>}

          {/* From currency picker */}
          <View
            style={[
              styles.pickerContainer,
              isDarkMode
                ? styles.darkPickerContainer
                : styles.lightPickerContainer,
            ]}
          >
            <Text
              style={[
                styles.currencyCode,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}
            >
              {fromCurrency}
            </Text>
            <RNPickerSelect
              onValueChange={(value) => setFromCurrency(value)}
              items={currencies.map((currency) => ({
                label: `${currency}`,
                value: currency,
              }))}
              value={fromCurrency}
              style={
                isDarkMode ? pickerSelectStyles.dark : pickerSelectStyles.light
              }
            />
          </View>

          {/* Swap currencies button */}
          <TouchableOpacity
            onPress={swapCurrencies}
            style={[
              styles.swapButton,
              isDarkMode ? styles.darkButton : styles.lightButton,
            ]}
          >
            <Ionicons
              name="swap-vertical"
              size={24}
              color={isDarkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>

          {/* To currencies pickers */}
          {toCurrencies.map((currency, index) => (
            <View
              key={index}
              style={[
                styles.pickerContainer,
                isDarkMode
                  ? styles.darkPickerContainer
                  : styles.lightPickerContainer,
              ]}
            >
              <Text
                style={[
                  styles.currencyCode,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}
              >
                {currency}
              </Text>
              <RNPickerSelect
                onValueChange={(value) => {
                  const newToCurrencies = [...toCurrencies];
                  newToCurrencies[index] = value;
                  setToCurrencies(newToCurrencies);
                }}
                items={currencies.map((currency) => ({
                  label: `${currency}`,
                  value: currency,
                }))}
                value={currency}
                style={
                  isDarkMode
                    ? pickerSelectStyles.dark
                    : pickerSelectStyles.light
                }
              />
              {toCurrencies.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeTargetCurrency(index)}
                  style={[
                    styles.removeButton,
                    isDarkMode ? styles.darkRemoveButton : styles.lightRemoveButton,
                  ]}
                >
                  <Ionicons name="close-circle" size={24} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {/* Add target currency button */}
          <TouchableOpacity
            onPress={addTargetCurrency}
            style={[
              styles.addButton,
              isDarkMode ? styles.darkButton : styles.lightAddButton,
            ]}
          >
            <Text style={styles.addButtonText}>Add Target Currency</Text>
          </TouchableOpacity>

          {/* Conversion results */}
          {Object.keys(results).map((currency, index) => (
            <Animated.View key={index} style={{ opacity: fadeAnim }}>
              <Text
                style={[
                  styles.result,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}
              >
                {amount} {fromCurrency} = {results[currency]} {currency}
              </Text>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CurrencyConverter;