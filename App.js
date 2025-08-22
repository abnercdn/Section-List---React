// Importa os componentes necessários do React e React Native
import React, { useState } from 'react';
import {
  View,
  Text,
  SectionList,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

// Base de dados dos contatos organizados por seções alfabéticas
const contactsData = [
  {
    title: 'A', // Letra inicial da seção
    data: [  // Array de contatos nesta seção
      
      {
        id: '1',  // Identificador único
        name: 'Ana Santos', // Nome do contato
        lastMessage: 'Vamos marcar aquela reunião?', // Última mensagem
        time: '24/05', // Data/horário da mensagem
        unread: 2, // Número de mensagens não lidas
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Robinhunicke_at_thatgamecompany_photoshoot%2C_August_2009.jpg' // foto do contato
      },
      // Outras seções (C, F, J, M)...mesma estrutura
      {
        id: '2',
        name: 'André Lima',
        lastMessage: 'Enviei os documentos que você pediu',
        time: '23/05',
        unread: 0,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Bill_Cook%28DCI%29.jpg'
      }
    ]
  },
  {
    title: 'C',
    data: [
      {
        id: '3',
        name: 'Carlos Oliveira',
        lastMessage: 'O jogo será ás 20:00h',
        time: '10:30',
        unread: 1,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Super_Bowl_XLVIII_%2812293128146%29.jpg'
      }
    ]
  },
  {
    title: 'F',
    data: [
      {
        id: '4',
        name: 'Fernanda Costa',
        lastMessage: 'Obrigada pela ajuda!',
        time: 'Ontem',
        unread: 0,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Veiled_in_Red.jpg'
      }
    ]
  },
  {
    title: 'J',
    data: [
      {
        id: '5',
        name: 'João Silva',
        lastMessage: 'Combinado, nos vemos lá',
        time: '09:45',
        unread: 0,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Jens_Stoltenberg.jpg'
      },
      {
        id: '6',
        name: 'Julia Pereira',
        lastMessage: 'Precisamos conversar sobre o projeto',
        time: '21/05',
        unread: 1,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Mountain_child.jpg'
      }
    ]
  },
  {
    title: 'M',
    data: [
      {
        id: '7',
        name: 'Maria Souza',
        lastMessage: 'Não esqueçam do almoço de domingo!',
        time: '10:30',
        unread: 3,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/COVID-19_%28Coronavirus%29_Girl_in_mask.jpg'
      },
      {
        id: '8',
        name: 'Marcos Ribeiro',
        lastMessage: 'Todo mundo confirmado para sexta!',
        time: '20/05',
        unread: 5,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Sean_Astin_1.jpg'
      }
    ]
  }
];
// Componente principal do aplicativo
export default function App() {
  // Estado para armazenar o texto de busca
  const [searchText, setSearchText] = useState('');

  // Filtra os contatos conforme o texto digitado
  const filteredSections = contactsData
    .map(section => ({
      title: section.title, // Mantém o título da seção
      // Filtra os contatos que foram buscados pela letra (ex: A: ana santos e andre lima)
      data: section.data.filter(contact =>
        contact.name.toLowerCase().includes(searchText.toLowerCase())
      )
    }))
    // Remove seções vazias depois de filtrar
    .filter(section => section.data.length > 0);

  // Renderiza cada item da lista
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.contactItem} // Estilo do item
      onPress={() => console.log('Abrir chat:', item.name)} // Ação ao clicar
    >
    {/* Foto do contato */}
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      {/* Container com informações do contato */}
      <View style={styles.contactContent}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
       {/* Container do lado direito com horário e badge */}
      <View style={styles.rightContainer}>
        <Text style={styles.contactTime}>{item.time}</Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  // Renderiza o header de cada seção separadas por letra
  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contatos</Text>
      </View>
        {/* Container da barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar contato"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
     {/* Lista de seções com contatos */}
      <SectionList
        sections={filteredSections} // Dados filtrados e organizados
        renderItem={renderItem} // Como renderizar cada contato
        renderSectionHeader={renderSectionHeader} // como renderizr headers
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={true}
      />
    </SafeAreaView>
  );
}
// Estilização dos componentes com o stylesheet
const styles = StyleSheet.create({
   // Container principal
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: '#fff', // Fundo branco/ os demais são css basico sem novidades
  },
    // Estilo do cabeçalho
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
   // Título do cabeçalho
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
    // Container da barra de pesquisa
  searchContainer: {
    padding: 10,
    backgroundColor: '#f6f6f6',
  },
    // Estilo do campo de pesquisa
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  // Cabeçalho(header) de cada seção (A, B, C...)
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  // Texto do cabeçalho da seção
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },  // Estilo de cada item (contato) da lista
  contactItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  }, // Estilo da foto do contato
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },  // Container do conteúdo (nome e mensagem)
  contactContent: {
    flex: 1,
  }, // estilo do container com nome do contato
  contactName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 3,
  }, // esltilo mensagem do contato
  contactMessage: {
    fontSize: 15,
    color: '#666',
  },//container do lado direiro
  rightContainer: {
    alignItems: 'flex-end',
  },// Estilo do horário da mensagem
  contactTime: {
    fontSize: 13,
    color: '#999',
    marginBottom: 5,
  }, // Estilo do badge de mensagens não lidas
  unreadBadge: {
    backgroundColor: '#25D366',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },   // Estilo do texto do badg
  unreadText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
