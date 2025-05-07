import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import api from '../../api';

const MessageItem = ({ item }) => (
  <View style={styles.messageContainer}>
    <Image source={{ uri: item.image }} style={styles.avatar} />
    <View style={styles.messageText}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.message}</Text>
    </View>
    <View style={styles.rightSection}>
      {item.unread > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.unread}</Text>
        </View>
      )}
      <Text style={styles.time}>{item.time}</Text>
    </View>
  </View>
);

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get('/messages')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Erro ao buscar mensagens:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages & Chat</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageItem item={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  messageText: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  badge: {
    backgroundColor: '#2F4EBB',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 4,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
});
