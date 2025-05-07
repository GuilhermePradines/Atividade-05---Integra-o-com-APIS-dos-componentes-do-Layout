import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../api'; 

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, destRes, recRes] = await Promise.all([
          api.get('/categories'),
          api.get('/destinations'),
          api.get('/recommendations')
        ]);

        setCategories(catRes.data);
        setDestinations(destRes.data);
        setRecommendations(recRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput style={styles.search} placeholder="Search here ..." />
        <TouchableOpacity style={styles.bell}>
          <MaterialIcons name="notifications" size={24} color="#5D3FD3" />
        </TouchableOpacity>
      </View>

      {/* Welcome */}
      <View style={styles.welcome}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.avatar} />
        <View>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.nameText}>Donna Stroupe</Text>
        </View>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Category</Text>
      <View style={styles.categoryGrid}>
        {categories.map(item => (
          <View key={item.id} style={styles.categoryItem}>
            <View style={styles.categoryIcon}>
              <MaterialIcons name={item.icon} size={30} color="#fff" />
            </View>
            <Text style={styles.categoryLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Popular Destination */}
      <Text style={styles.sectionTitle}>Popular Destination</Text>
      <FlatList
        horizontal
        data={destinations}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.destinationImage} />
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Recommended */}
      <Text style={styles.sectionTitle}>Recommended</Text>
      <FlatList
        horizontal
        data={recommendations}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.recommendImage} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  search: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 40,
    marginRight: 10
  },
  bell: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 2
  },
  welcome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  welcomeText: { fontSize: 16, fontWeight: 'bold' },
  nameText: { color: 'gray' },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  categoryItem: {
    alignItems: 'center',
    width: '23%',
    marginVertical: 8
  },
  categoryIcon: {
    backgroundColor: '#5D3FD3',
    padding: 16,
    borderRadius: 30,
    marginBottom: 6
  },
  categoryLabel: {
    fontSize: 12,
    textAlign: 'center'
  },

  destinationImage: {
    width: 140,
    height: 100,
    borderRadius: 12,
    marginRight: 10
  },
  recommendImage: {
    width: 160,
    height: 120,
    borderRadius: 12,
    marginRight: 10
  }
});
