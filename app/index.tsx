import React, { useState } from 'react';
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
    { id: '1', name: 'Swagbucks', basePointValue: 100, displayedPointValue: 100},
    { id: '2', name: 'MyPoints', basePointValue: 160, displayedPointValue: 160},
    { id: '3', name: 'Fetch', basePointValue: 1000, displayedPointValue: 1000},
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

  return (
    <View style={styles.container}>

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

  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 20,
  },
  row: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  header: { backgroundColor: '#f1f8ff', fontWeight: 'bold' },
  cell: { flex: 1, textAlign: 'center' },

  usdIcon: {
    height: 40,
    width: 250,
    borderColor: '#BEE4FF',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#BEE4FF',
    color: '#5A94FF',
  },

  barForInput: {
    flexDirection: 'row', 
    padding: 10,
  },


});

export default App;
