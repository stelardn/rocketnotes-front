import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Header } from '../../components/Header';
import { TextButton } from '../../components/TextButton';
import { Input } from '../../components/Input';
import { Section } from '../../components/Section';
import { Note } from '../../components/Note';

import { api } from '../../services/api';

import { FiPlus, FiSearch } from 'react-icons/fi';

export function Home() {

  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const navigate = useNavigate();

  function handleSelectTags(tagName) {

    if (tagName === "all") {
      setSelectedTags([]);
      return;
    }

    const alreadySelected = selectedTags.includes(tagName);

    if (alreadySelected) {
      const filteredTags = selectedTags.filter(tag => tag !== tagName);
      setSelectedTags(filteredTags);
    } else {
      setSelectedTags(prevSelectedTags => [...prevSelectedTags, tagName]);
    }

  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();

  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${selectedTags}`);
      setNotes(response.data);
    }

    fetchNotes();
  }, [selectedTags, search]);

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <TextButton
            title="Todos"
            onClick={() => handleSelectTags("all")}
            isActive={selectedTags.length === 0} />
        </li>
        {
          tags && tags.map((tag) => (
            <li key={String(tag.id)}>
              <TextButton
                title={tag.name}
                isActive={selectedTags.includes(tag.name)}
                onClick={() => handleSelectTags(tag.name)}
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          onChange={e => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note
                data={note}
                key={String(note.id)}
                onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>

      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}