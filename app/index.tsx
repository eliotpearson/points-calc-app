import React, { useState, useEffect } from 'react';
import { Stack } from "expo-router";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { Audio } from 'expo-av';

// Points Calc App
// development started: 01/28/25
// Eliot Pearson Jr

const App: React.FC = () => {
  const [multiplier, setMultiplier] = useState('1'); // Stores numeric input
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // table of different rewards systems
  // each basePointValue is equiavlent to 1 USD, and will be used to scale table output
  // displayedPointValue is what the table sees, it will be modified whenever the input is changed
  const [data, setData] = useState([
    { id: '1', name: 'Coin Out', basePointValue: 1000, displayedPointValue: 1000},
    { id: '2', name: 'Fetch', basePointValue: 1000, displayedPointValue: 1000},
    { id: '3', name: 'Microsoft Rewards', basePointValue: 1000, displayedPointValue: 1000},
    { id: '4', name: 'Mistplay', basePointValue: 3000, displayedPointValue: 3000},
    { id: '5', name: 'MyPoints', basePointValue: 160, displayedPointValue: 160},
    { id: '6', name: 'Pogo', basePointValue: 1000, displayedPointValue: 1000},
    { id: '9', name: 'Shopkick', basePointValue: 250, displayedPointValue: 250},
    { id: '10', name: 'Swagbucks', basePointValue: 100, displayedPointValue: 100},
    
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

  // load and play background music
  useEffect(() => {
    const loadMusic = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/webcorporate.mp3'), // located in the assets folder
        { isLooping: true, volume: 0.2}
      );
      setSound(sound);
      await sound.playAsync();
    };

    loadMusic();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // toggle music on/off, will be called upon button press
  const toggleMusic = async () => {
    if (sound) {
      if (musicPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setMusicPlaying(!musicPlaying);
    }
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

        <TouchableOpacity style={styles.usdIcon}>
          <Text style={styles.usdIconText}>$USD</Text>
        </TouchableOpacity>
          

        {/* button to toggle the background music */}
        <TouchableOpacity onPress={toggleMusic} style={styles.musicButton}>
          <Text style={styles.musicButtonText}>
            {musicPlaying ? 'Pause Music' : 'Play Music'}
            
        </Text>
      </TouchableOpacity>

      </View>

      

      {/* table headers */}
      <View style={[styles.row, styles.header]}>
        <Text style={styles.cell}>Rewards System</Text>
        <Text style={styles.cell}>Number of Points</Text>

      </View>

      {/* table body - this will be updated by user input, the names will remain constant */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={[styles.row,  {backgroundColor: rewardsColors[index % rewardsColors.length]}, {borderColor: rewardsColors[index % rewardsColors.length]} ]}>
            <Text style={styles.cell}>{item.name}</Text>

            {/* toLocaleString() formats applicable numbers with commas */}
            <Text style={styles.cell}>{item.displayedPointValue.toLocaleString()}</Text>
          </View>

        )}
      />
    </View>
  );
};

// the colors of each reward system in alphabetized order
const rewardsColors = ['#20A6F5', '#FCAD27', '#1EC5F4', '#34F3D5', '#EE794F', '#A484E1', '#199BD8', '#6DB9D6'];

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
    width: 80,
    height: 40,
    borderColor: '#E6E5E5',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,    // rounds the edges of the box
    marginBottom: 10,
    marginRight: 15,
    backgroundColor: '#FAFAFA',

  },

  // each row of the data table
  row: {
    flexDirection: 'row',
    padding: 25,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRadius: 20,
    marginBottom: 20,

    // drop shadow for elements - 'shadow' prop is depreciated
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2,},
    shadowRadius: 2,
    elevation: 5,

  },

  // the header rows of the data table
  header: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    fontWeight: 'bold',

  },

  // each cell of the data table
  cell: { 
    flex: 1,
    fontSize: 17,
    textAlign: 'center',
    color: '#343434',

  },

  // the icon at the top of screen displaying the input currency
  usdIcon: {
    width: 110,
    height: 39,
    borderRadius: 10,
    backgroundColor: '#3EBF9A',
    marginBottom: 10,
    marginRight: 15,
    

    // drop shadow for element
    shadowColor: '#000',
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 1.5,},
    shadowRadius: 3.84,
    elevation: 5,
  },

  usdIconText: { 
    flex: 1,
    paddingTop: 10,
    fontSize: 16, 
    color: '#fff', 
    fontWeight: 'bold',
    textAlign: 'center',
    
  },

  // the container holding the input elements at the top
  barForInput: {
    justifyContent: 'flex-start',
    flexDirection: 'row', 
    padding: 10,
    marginBottom: 20,
    
  },

  musicButton: {
    backgroundColor: '#3EBF9A',
    height: 39,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    // Music track: Web Corporate by Aylex
    // Source: https://freetouse.com/music
    // Copyright Free Music (Free Download)

    // drop shadow for element
    shadowColor: '#000',
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 1.5,},
    shadowRadius: 3.84,
    elevation: 5,
  },

  musicButtonText: { 
    flex: 1,
    fontSize: 16, 
    color: '#fff', 
    fontWeight: 'bold',
  
  },

});

export default App;
