import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { TextButton } from "../../components/TextButton";

import { api } from "../../services/api";

import { Container, Form } from "./styles";

export function New() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [newLink, setNewLink] = useState("");
  const [links, setLinks] = useState([]);

  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);

  async function handleNewNote() {

    if (!title) {
      return alert("Insira um título para a nota.");
    }

    if (newLink) {
      return alert("Você deixou um link preenchido, mas não o adicionou. Adicione-o ou deixe o campo em branco para prosseguir.");
    }

    if (newTag) {
      return alert("Você deixou uma tag preenchida, mas não a adicionou. Adicione-a ou deixe o campo em branco para prosseguir.");
    }


    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("Nota criada com sucesso!");

    navigate(-1);
  }

  function handleBack() {
    navigate(-1);
  }

  function handleAddLink() {
    setLinks(prevLinks => [...prevLinks, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deletedLink) {
    setLinks(prevLinks => prevLinks.filter(link => link !== deletedLink));
  }

  function handleAddTag() {
    setTags(prevTags => [...prevTags, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deletedTag) {
    setTags(prevTags => prevTags.filter(tag => tag !== deletedTag));
  }

  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <TextButton
              to="/"
              onClick={handleBack}
              title="Voltar"
            />
          </header>

          <Input
            placeholder="Título"
            onChange={e => setTitle(e.target.value)}
          />
          <TextArea placeholder="Observações"
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis" >
            {
              links.map((link, index) => {
                return <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              })
            }
            <NoteItem
              placeholder="Novo link"
              isNew
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink} />
          </Section>
          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem
                    value={tag}
                    key={String(index)}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }
              <NoteItem
                placeholder="Nova tag"
                isNew
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button
            title="Salvar"
            onClick={handleNewNote}
          />
        </Form>
      </main>

    </Container>
  )
}