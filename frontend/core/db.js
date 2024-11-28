import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JsonBinComponent = () => {
  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.jsonbin.io/v3/b/65775ce61f5677401f0c77f6');
        
        const names = response.data.record.User.map(user => user.name);
        setUserNames(names);
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }
    };

    fetchData();
  }, []); // O segundo parâmetro vazio faz com que useEffect seja executado apenas uma vez

  return (
    <div>
      <h1>Nomes de Usuários:</h1>
      <ul>
        {userNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default JsonBinComponent;
