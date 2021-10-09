import React from 'react';

const App = () => {
  const [ativo, setAtivo] = React.useState(false);
  const [dados, setDados] = React.useState({
    nome: 'Jailson',
    idade: '30',
  });

  function handleCLick() {
    setAtivo(!ativo);
    setDados({ ...dados, faculdade: 'Possui faculdade' });
  }
  return (
    <div>
      <p>{dados.nome}</p>
      <p>{dados.idade}</p>
      <p>{dados.faculdade}</p>
      <button onClick={handleCLick}>
        {ativo ? 'Botao ativo' : 'botao inativo'}
      </button>
    </div>
  );
};

//export default App;
