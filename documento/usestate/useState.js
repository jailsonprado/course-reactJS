// Estado
// O estado de uma aplicação representa as características dela naquele momento. Por exemplo: os dados do usuário foram carregados, o botão está ativo, o usuário está na página de contato e etc.

const App = () => {
  const ativo = true;

  return (
    <button disabled={!ativo}>{ativo ? 'Botão Ativo' : 'Botão Inativo'}</button>
  );
};
// COPIAR
// Hooks
// Os Hooks são funções especiais do React que permitem controlarmos o estado e o ciclo de vida de componentes funcionais. Isso antes só era possível com classes.

const App = () => {
  const [ativo, setAtivo] = React.useState(true);

  return (
    <button onClick={() => setAtivo(!ativo)}>
      {ativo ? 'Botão Ativo' : 'Botão Inativo'}
    </button>
  );
};
// COPIAR
// React.useState
// O useState é uma função que retorna uma Array com 2 valores. O primeiro valor guarda o dado do estado atual, pode ser qualquer tipo de dado como strings, arrays, números, boolean, null, undefined e objetos. O segundo valor é uma função que pode ser utilizada para modificarmos o estado do primeiro valor.

// Quando a função de modificação do estado é ativada, todos os componentes que dependerem do estado, serão renderizados novamente e os seus filhos também. É isso que garante a reatividade de componentes funcionais no React.

const App = () => {
  const [ativo, setAtivo] = React.useState(true);
  // É a mesma coisa que:
  // const ativoArray = React.useState(true);
  // const ativo = ativoArray[0];
  // const setAtivo = ativoArray[1];

  return (
    <button onClick={() => setAtivo(!ativo)}>
      {ativo ? 'Botão Ativo' : 'Botão Inativo'}
    </button>
  );
};
// COPIAR
// O uso de setNome é uma convenção do React para a função de modificação do estado

// Múltiplos Estados
// Não existem limites para o uso do useState, podemos definir diversos no mesmo componente.

const App = () => {
  const [contar, setContar] = React.useState(0);
  const [ativo, setAtivo] = React.useState(false);
  const [dados, setDados] = React.useState({ nome: '', idade: '' });

  return <div></div>;
};
// COPIAR
// Props
// Podemos passar o estado e a função de modificação como propriedades para outros elementos.

import React from 'react';
import Modal from './Modal';
import ButtonModal from './ButtonModal';

const App = () => {
  const [modal, setModal] = React.useState(false);

  return (
    <div>
      <Modal modal={modal} setModal={setModal} />
      <ButtonModal setModal={setModal} />
    </div>
  );
};

export default App;
// COPIAR
// ButtonModal.js

import React from 'react';

const ButtonModal = ({ setModal }) => {
  return <button onClick={() => setModal(true)}>Abrir Modal</button>;
};

export default ButtonModal;
COPIAR
Modal.js

import React from 'react';

const Modal = ({ modal, setModal }) => {
  if (modal === true)
    return (
      <div>
        Esse é um modal. <button onClick={() => setModal(false)}>Fechar</button>
      </div>
    );
  return null;
};

export default Modal;
// COPIAR
// Reatividade
// Não modifique o estado diretamente. Utilize sempre a função de atualização do estado, pois ela que garante a reatividade dos componentes.

const App = () => {
  const [items, setItems] = React.useState(['Item 1', 'Item 2']);

  function handleClick() {
    // Errado. Modifique o estado apenas com a função de atualização (setItems)
    items.push('Novo Item');
  }

  function handleClickReativo() {
    // Correto. Eu desestruturo a array atual, criando uma nova e adiciono um novo elemento
    setItems([...items, 'Novo Item']);
  }

  return (
    <>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
      <button onClick={handleClick}>Adicionar Item</button>
      <button onClick={handleClickReativo}>Adicionar Reativo</button>
    </>
  );
};
// COPIAR
// Callback
// Podemos passar uma função de callback para atualizar o estado. A função de callback recebe um parâmetro que representa o valor anterior e irá modificar o estado para o valor que for retonado na função.

const App = () => {
  const [ativo, setAtivo] = React.useState(true);

  function handleClick() {
    // usando um callback
    setAtivo((anterior) => !anterior);
  }

  return (
    <button onClick={handleClick}>
      {ativo ? 'Está Ativo' : 'Está Inativo'}
    </button>
  );
};
// COPIAR
// Callback Valor Inicial
// A definição do estado inicial também pode ser feita com um callback.

const App = () => {
  // Callback no estado inicial, só será executado na criação do componente
  const [ativo, setAtivo] = React.useState(() => {
    const ativoLocal = window.localStorage.getItem('ativo');
    return ativoLocal;
  });

  function handleClick() {
    setAtivo((anterior) => !anterior);
  }

  return (
    <button onClick={handleClick}>
      {ativo ? 'Está Ativo' : 'Está Inativo'}
    </button>
  );
};
// COPIAR
// React.StrictMode
// O modo estrito invoca duas vezes a renderização do componente, quando o estado é atualizado. Assim é possível identificarmos funções com efeitos coláterais (side effects) e eliminarmos as mesmas.

// Funções com efeitos coláterais são aquelas que modificam estados que estão fora das mesmas.

const Contador = () => {
  const [contar, setContar] = React.useState(1);
  const [items, setItems] = React.useState(['Item 1']);

  function handleClick() {
    setContar((contar) => {
      // setContar possui um efeito colateral.
      setItems((items) => [...items, 'Item ' + (contar + 1)]);
      return contar + 1;
    });
    // Tirar o efeito de dentro do setContar irá concertar o erro
    // setItems((items) => [...items, 'Item ' + (contar + 1)]);
  }

  return (
    <>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
      <button onClick={handleClick}>{contar}</button>
    </>
  );
};
// COPIAR
// Exercício
// Os links abaixo puxam dados de um produto em formato JSON
// https://ranekapi.origamid.dev/json/api/produto/tablet
// https://ranekapi.origamid.dev/json/api/produto/smartphone
// https://ranekapi.origamid.dev/json/api/produto/notebook
// Crie uma interface com 3 botões, um para cada produto.
// Ao clicar no botão faça um fetch a api e mostre os dados do produto na tela.
// Mostre apenas um produto por vez
// Mostre a mensagem carregando... enquanto o fetch é realizado
// COPIAR
// Exercício Solução
import React from 'react';
import Produto from './Produto';

const App = () => {
  const [dados, setDados] = React.useState(null);
  const [carregando, setCarregando] = React.useState(null);

  async function handleClick(event) {
    setCarregando(true);
    const response = await fetch(
      `https://ranekapi.origamid.dev/json/api/produto/${event.target.innerText}`,
    );
    const json = await response.json();
    setDados(json);
    setCarregando(false);
  }

  return (
    <>
      <button onClick={handleClick}>smartphone</button>
      <button onClick={handleClick}>tablet</button>
      <button onClick={handleClick}>notebook</button>
      {carregando && <p>Carregando...</p>}
      {!carregando && dados && <Produto dados={dados} />}
    </>
  );
};

export default App;
// COPIAR
// Produto.js

import React from 'react';

const Produto = ({ dados }) => {
  return (
    <div>
      <h1>{dados.nome}</h1>
      <p>R$ {dados.preco}</p>
      <img src={dados.fotos[0].src} alt={dados.fotos[0].titulo} />
    </div>
  );
};

export default Produto;