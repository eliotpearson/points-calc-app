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
      <Stack.Screen options={{ title: 'Points Calculator'}}/>

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
        <Text style={styles.cell}>Name</Text>
        <Text style={styles.cell}>Number of Rewards Points</Text>

      </View>

      {/* table body - this will be updated by user input, the names will remain constant */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.displayedPointValue}</Text>
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
    backgroundColor: '#fff',

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
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,    // rounds the edges of the box
    marginBottom: 10,
    marginRight: 30,

  },

  // each row of the data table
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',

  },

  // the header rows of the data table
  header: {
    backgroundColor: '#f1f8ff',
    fontWeight: 'bold',

  },

  // eahc cell of the data table
  cell: { 
    flex: 1,
    textAlign: 'center',

  },

  // the icon at the top of screen displaying the input currency
  usdIcon: {
    width: 120,
    height: 40,
    borderColor: '#BEE4FF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#BEE4FF',
    color: '#5A94FF',
    marginBottom: 10,

  },

  // the container holding the input elements at the top
  barForInput: {
    flexDirection: 'row', 
    padding: 10,

  },
});

export default App;
