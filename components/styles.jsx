import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Main screen container
  screen: {
    flex: 1,
  },
  // ScrollView container with padding and centered content
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // Main content container with centered items
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Light mode background color
  lightContainer: {
    backgroundColor: '#FFFEFEFF',
  },
  // Dark mode background color
  darkContainer: {
    backgroundColor: '#333',
  },
  // Title text style
  title: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  // Light mode text color
  lightText: {
    color: '#333',
  },
  // Dark mode text color
  darkText: {
    color: '#fff',
  },
  // Light mode input background and text color
  lightInput: {
    backgroundColor: '#fff',
    color: '#000',
  },
  // Dark mode input background and text color
  darkInput: {
    backgroundColor: '#555',
    color: '#fff',
  },
  // Light mode picker container background color
  lightPickerContainer: {
    backgroundColor: '#fff',
  },
  // Dark mode picker container background color
  darkPickerContainer: {
    backgroundColor: '#555',
  },
  // Input field style
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  // Picker container style
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Currency code text style
  currencyCode: {
    marginRight: 10,
    fontSize: 16,
  },
  // Light mode currency code color
  lightCurrencyCode: {
    color: '#333',
  },
  // Dark mode currency code color
  darkCurrencyCode: {
    color: '#fff',
  },
  // Swap button style
  swapButton: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  // Add button style
  addButton: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  // Light mode button background color
  lightButton: {
    backgroundColor: '#e0e0e0',
  },
  // Dark mode button background color
  darkButton: {
    backgroundColor: '#555',
  },
  // Light mode add button background color
  lightAddButton: {
    backgroundColor: '#28a745', // Green color
  },
  // Add button text style
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Remove button style
  removeButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
  },
  // Light mode remove button background color
  lightRemoveButton: {
    backgroundColor: '#ff4d4d', // Red color
  },
  // Dark mode remove button background color
  darkRemoveButton: {
    backgroundColor: '#ff6666', // Lighter red color for dark mode
  },
  // Result text style
  result: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  // Error message style
  error: {
    color: 'red',
    marginBottom: 20,
  },
  // Mode toggle button style
  modeButton: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Light mode button background color
  lightModeButton: {
    backgroundColor: '#007bff',
  },
  // Dark mode button background color
  darkModeButton: {
    backgroundColor: '#555',
  },
  // Mode button text style
  modeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export const pickerSelectStyles = StyleSheet.create({
  light: {
    // Light mode picker style for iOS
    inputIOS: {
      height: 30, // Decreased height
      width: '100%',
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 15,
      marginBottom: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      fontSize: 16,
      color: '#000',
    },
    // Light mode picker style for Android
    inputAndroid: {
      height: 30, // Decreased height
      width: '100%',
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 15,
      marginBottom: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      fontSize: 16,
      color: '#000',
    },
    iconContainer: {
      top: 5,
      right: 10,
    },
  },
  dark: {
    // Dark mode picker style for iOS
    inputIOS: {
      height: 30, // Decreased height
      width: '100%',
      borderColor: '#555',
      borderWidth: 1,
      paddingHorizontal: 15,
      marginBottom: 20,
      backgroundColor: '#555',
      borderRadius: 10,
      fontSize: 16,
      color: '#fff',
    },
    // Dark mode picker style for Android
    inputAndroid: {
      height: 30, // Decreased height
      width: '100%',
      borderColor: '#555',
      borderWidth: 1,
      paddingHorizontal: 15,
      marginBottom: 20,
      backgroundColor: '#555',
      borderRadius: 10,
      fontSize: 16,
      color: '#fff',
    },
    iconContainer: {
      top: 5,
      right: 10,
    },
  },
});