import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';

const App: React.FC = () => {

  // the text field for user input
  const [inputText, setText] = useState('');

  // table of currency data
  const [data, setData] = useState([
    { id: '1', name: 'Swagbucks', conversion: '100'},
    { id: '2', name: 'MyPoints', conversion: '100'},
    { id: '3', name: 'Ibotta', conversion: '100'},
  ]);


  // Function to update table data
  const updateCell = (id: string, field: string, value: string) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <View style={styles.container}>

      {/* the user will enter a numerical value, changing the table output */}
      <View style={styles.selectedCurrency}>
        <TextInput
          // add styles here
          placeholder="Type a number..."
          value={inputText}
          keyboardType="numeric"
          onChangeText={setText}  // Updates when user enters a new value
          />
        <Text>$USD</Text>
      </View>

      {/* Table Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={styles.cell}>Reward System</Text>
        <Text style={styles.cell}>Number of Points</Text>
      </View>

      {/* Editable Table Body */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TextInput
              style={styles.cell}
              value={item.name}
              onChangeText={(text) => updateCell(item.id, 'name', text)}
            />
            <TextInput
              style={styles.cell}
              value={item.conversion}
              keyboardType="numeric"
              onChangeText={(text) => updateCell(item.id, 'number of points', text)}
            />
          </View>
        )}
      />
    </View>
  );
};

// style sheet to give the table borders and outlines
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  row: { flexDirection: 'row', padding: 10, borderWidth: 1, borderColor: '#ccc' },
  header: { backgroundColor: '#CFEFFC', fontWeight: 'bold' },
  cell: { flex: 1, textAlign: 'center', padding: 8, borderColor: '#ddd' },

  // the top of the page that will display the selected currency (USD)
  selectedCurrency: { flex: 1, flexDirection: 'row', padding: 20, alignItems: 'center', textAlign: 'center', backgroundColor: '#BEE4FF'},

});

export default App;

/*
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello, Eliot. I changed this.</Text>

    </View>

    
  );
} */
