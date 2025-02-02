import React, { useState } from 'react';
import { Stack } from "expo-router";
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
// Points Calc App
// development started: 01/28/25
// Eliot Pearson Jr

const App: React.FC = () => {
  const [multiplier, setMultiplier] = useState('1'); // Stores numeric input

  // table of different rewards systems
  // each basePointValue is equiavlent to 1 USD, and will be used to scale table output
  // displayedPointValue is what the table sees, it will be modified whenever the input is changed
  const [data, setData] = useState([
    { id: '1', name: 'Coin Out', basePointValue: 1000, displayedPointValue: 1000},
    { id: '2', name: 'Fetch', basePointValue: 1000, displayedPointValue: 1000},
    { id: '3', name: 'MyPoints', basePointValue: 160, displayedPointValue: 160},
    { id: '4', name: 'Pogo', basePointValue: 1000, displayedPointValue: 1000},
    { id: '5', name: 'Shopkick', basePointValue: 250, displayedPointValue: 250},
    { id: '6', name: 'Swagbucks', basePointValue: 100, displayedPointValue: 100},
    { id: '7', name: 'Microsoft Rewards', basePointValue: 1000, displayedPointValue: 1000},
  ]);

  // function to apply multiplier
  const applyMultiplier = (value: string) => {
    const factor = parseFloat(value) || 1; // convert input to number, default to 1 if empty
    setMultiplier(value);
    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        displayedPointValue: Math.round(row.basePointValue * factor), // multiply basePointValue by factor

      }))
    );
  };

  // displays the visual and UI elements
  return (
    
    <View style={styles.container}>

      {/* changes the title of the default header */}
      <Stack.Screen options={{ title: 'Points Calculator', headerTintColor: '#fff', headerStyle: {backgroundColor: '#3EBF9A'}}}/>

      <Text style={styles.label}>Calculate Rewards</Text>

      <View style={styles.barForInput}>

        {/* user input - the user will give some dollar amount to convert into rewards points */}
        <TextInput
          style={styles.input}
          placeholder="Enter a number..."
          keyboardType="numeric"
          value={multiplier}
          onChangeText={applyMultiplier}

        />

        <Text style={styles.usdIcon}>$USD</Text>

      </View>

      {/* table headers */}
      <View style={[styles.row, styles.header]}>
        <Text style={styles.cell}>Rewards System</Text>
        <Text style={styles.cell}>Number of Rewards Points</Text>

      </View>

      {/* table body - this will be updated by user input, the names will remain constant */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>

            {/* toLocaleString() formats applicable numbers with commas */}
            <Text style={styles.cell}>{item.displayedPointValue.toLocaleString()}</Text>
          </View>

        )}
      />
    </View>
  );
};

// contains all of the styling for the visual elements
const styles = StyleSheet.create({

  // the entire page
  container: { flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',

  },

  // label for the app
  label: {
    fontSize: 16,
    marginBottom: 8,
    
  },

  // user input text box
  input: {
    width: 180,
    height: 40,
    borderColor: '#E6E5E5',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,    // rounds the edges of the box
    marginBottom: 10,
    marginRight: 30,
    backgroundColor: '#FAFAFA',
    

  },

  // each row of the data table
  row: {
    flexDirection: 'row',
    padding: 25,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 20,

    // drop shadow for elements
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 1,},
    shadowRadius: 2,
    elevation: 5,

  },

  // the header rows of the data table
  header: {
    backgroundColor: '#C8FDE2',
    borderColor: '#C8FDE2',
    fontWeight: 'bold',
    

  },

  // each cell of the data table
  cell: { 
    flex: 1,
    fontSize: 16,
    textAlign: 'center',

  },

  // the icon at the top of screen displaying the input currency
  usdIcon: {
    width: 120,
    height: 40,
    borderColor: '#C4F8CB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#C4F8CB',
    color: '#40C9A2',             // text color
    marginBottom: 10,

    // drop shadow for element
    shadowColor: '#000',
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 1.5,},
    shadowRadius: 3.84,
    elevation: 5,
  },

  // the container holding the input elements at the top
  barForInput: {
    flexDirection: 'row', 
    padding: 10,
    marginBottom: 20,
    
  },
});

export default App;
