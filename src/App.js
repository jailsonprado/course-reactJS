import React from 'react';

const formFields = [
  {
    id: 'nome',
    label: 'Nome',
    type: 'text',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    id: 'senha',
    label: 'Senha',
    type: 'password',
  },
  {
    id: 'cep',
    label: 'CEP',
    type: 'text',
  },
  {
    id: 'rua',
    label: 'Rua',
    type: 'text',
  },
  {
    id: 'numero',
    label: 'Numero',
    type: 'text',
  },
  {
    id: 'bairro',
    label: 'Bairro',
    type: 'text',
  },
  {
    id: 'cidade',
    label: 'Cidade',
    type: 'text',
  },
  {
    id: 'estado',
    label: 'Estado',
    type: 'text',
  },
];

const App = () => {
  const [form, setForm] = React.useState({
    nome: '',
    email: '',
    senha: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const [response, setResponse] = React.useState(null);
  const [mensagem, setMensagem] = React.useState('');
  const [select, setSelect] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    fetch('https://ranekapi.origamid.dev/json/api/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    }).then((response) => {
      setResponse(response);
    });
  }
  function handleChange({ target }) {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  }

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map(({ id, label, type }) => (
        <div key={id}>
          <label htmlFor={id}>{label}:</label>
          <input id={id} type={type} value={form[id]} onChange={handleChange} />
        </div>
      ))}
      <label htmlFor="mensagem">Mensagem</label>
      <textarea
        value={mensagem}
        id="mensagem"
        cols="30"
        rows="5"
        onChange={({ target }) => setMensagem(target.value)}
      />
      <select
        value={select}
        id="produtos"
        onChange={({ target }) => setSelect(target.value)}
      >
        <option disabled value=""></option>
        <option value="notebook">Notebook</option>
        <option value="Smartphone">Smartphone</option>
        <option value="tablet">Tablet</option>
      </select>
      <p>{select}</p>
      <p>{mensagem}</p>
      {response && response.ok && <p>Formulario enviado</p>}
      <button>Enviar</button>
    </form>
  );
};

export default App;
