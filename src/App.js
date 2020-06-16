import React, {useState, useEffect} from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])
  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      title: `Repo ${Date.now()}`,
      url: `http://github.com.br/thiegomoura/repo-${Date.now()}`,
      techs: [
        "NodeJS",
        "ReactJS"
      ],
      likes: 0,
    });
    const repository = response.data;
    setRepositories([ ...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if(response.status === 204){
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      setRepositories(repositories => repositories.filter((repository, id) => id !== repositoryIndex));
      // setImg(currentImg => currentImg.filter((img, i) => i !== index));
    } 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
