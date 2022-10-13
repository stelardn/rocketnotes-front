import { Container, Links, Content } from "./styles.js";

import { useParams, useNavigate } from 'react-router-dom';

import { useState, useEffect } from "react";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { TextButton } from "../../components/TextButton";
import { api } from "../../services/api.js";

export function Details() {

  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja eralmente remover a nota?");

    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }

  }

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchData();
  }, [])

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <TextButton title="Excluir nota" onClick={handleRemove} />

            <h1>{data.title}</h1>
            <p>
              {data.description}
            </p>

            {data.links.length !== 0 &&
              <Section title="Links úteis">
                <Links>
                  {data.links.map(link => (
                    <li key={String(link.id)}>
                      <a
                        target="_blank"
                        href={link.url}>
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            }

            {data.tags.length !== 0 &&
              <Section title="Marcadores">
                {data.tags.map(tag => (
                  <Tag
                    title={tag.name}
                    key={String(tag.id)} />
                ))}
              </Section>
            }

            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      }
    </Container>
  )
}