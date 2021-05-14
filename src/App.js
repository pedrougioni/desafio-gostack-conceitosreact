import React, {useState, useEffect} from "react";

import api from './services/api';
import "./styles.css";

function App() {

  useEffect(()=>{api.get("repositories").then(response => setRepositories(response.data))},[]);

  const [repositories, setRepositories] = useState([]);
  
  async function handleAddRepository() {
    const response = await api.post("repositories",{title: `Teste ${Date.now()}`, url: "aaa", techs:["dusahda"]});
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204){
      const repIndex = repositories.findIndex(rep => rep.id === id);
      const newRepositories = repositories.slice();
      newRepositories.splice(repIndex,1)
      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
             {repository.title}
             <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
