import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const App: React.FC = () => {
  const [multiplier, setMultiplier] = useState('1'); // Stores numeric input

  // table of different rewards systems
  // each basePointValue is equiavlent to 1 USD, and will be used to scale table output
  // displayedPointValue is what the table sees, it will be modified whenever the input is changed
  const [data, setData] = useState([
    { id: '1', name: 'Swagbucks', basePointValue: 100, displayedPointValue: 100},
    { id: '2', name: 'MyPoints', basePointValue: 20, displayedPointValue: 20},
    { id: '3', name: 'Ibotta', basePointValue: 100, displayedPointValue: 100},
  ]);

  // Function to apply multiplier
  const applyMultiplier = (value: string) => {
    const factor = parseFloat(value) || 1; // Convert input to number, default to 1 if empty
    setMultiplier(value);
    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        displayedPointValue: Math.round(row.basePointValue * factor), // Multiply basePointValue by factor
      }))
    );
  };

  return (
    <View style={styles.container}>
      {/* Numeric Input */}
      <Text style={styles.label}>Enter multiplier:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a number"
        keyboardType="numeric"
        value={multiplier}
        onChangeText={applyMultiplier}
      />

      {/* Table Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={styles.cell}>Name</Text>
        <Text style={styles.cell}>Number of Rewards Points</Text>
      </View>

      {/* Table Body */}
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  row: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  header: { backgroundColor: '#f1f8ff', fontWeight: 'bold' },
  cell: { flex: 1, textAlign: 'center' },
});

export default App;
