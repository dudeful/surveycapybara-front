import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import InputOption from './InputOption';
import './styles.css';

function CreatePool(props) {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [prot, setProt] = useState(false);
  const pool = {
    owner: user.email,
    name: user.username,
    description: 'Testes',
    positive_votes_per_voter: undefined,
    negative_votes_per_voter: 0,
    negative_votes_threshold: 0,
    weighted_vote: false,
    visible_vote: true,
    private_pool: prot,
    pool_password: null,
    voting_time: 1000,
    registered_pool: false,
    open_options: false,
    options_per_voter: 0,
    options: [],
  };

  console.log(user);

  const [arr, setArr] = useState([
    {
      votes: 0,
      name: '',
      id: 'option_0',
    },
    {
      votes: 0,
      name: '',
      id: 'option_1',
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    pool.name = document.getElementById('title').value;
    pool.positive_votes_per_voter = document.getElementById('numVotes').value;
    pool.options = arr;

    const complete = arr.reduce((previusValor, currentValor) => {
      if (currentValor.value !== '' && previusValor) {
        return true;
      } else {
        return false;
      }
    }, true);

    if (complete) {
      if (prot) {
        const pass = document.getElementById('poolpass');
        if (pass !== '' && pool.name !== '') {
          pool.pool_password = pass.value;
        } else {
          return;
        }
      }
    } else {
      return;
    }

    try {
      fetch('https://server-surveycapybara.dudeful.com/pools/new', {
    //fetch('http://localhost:5000', {  
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ pool }),
      })
        .then((responce) => responce)
        .then((data) => data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleButton = (event) => {
    event.preventDefault();
    setArr((s) => [
      ...s,
      {
        votes: 0,
        name: '',
        id: 'option_' + arr.length,
      }
    ]);
  };
  const handleNumber = (event) => {
    event.preventDefault();
    if (event.target.value < 1) {
      event.target.value = 1;
    } else if (event.target.value > arr.length - 1) {
      event.target.value = arr.length - 1;
    }
  };

  const inputHandler = (event,i) => {
    arr[i].name = event.target.value;
  };

  const checkboxHandler = () => {
    if (prot) {
      setProt(false);
    } else {
      setProt(true);
    }
  };

  const removeHandler = (event) => {
    event.preventDefault();
    if (arr.length <= 2) {
      return;
    }
    arr.splice(Number(event.target.id.split('-')[1]), 1);
    arr.forEach((element, i) => {
      element.id = 'option-' + i;
    });
    setArr([...arr]);
  };

  const password = () => {
    if (prot) {
      return (
        <div className="input-form-box">
          <input id="poolpass" type="password" className={'input-form'} placeholder="Senha" />
        </div>
      );
    } else {
      return '';
    }
  };

  return (
    <div className="create-pool">
      <h2 className="asap">Crie Sua Pesquisa</h2>
      <fieldset className="box-fieldset-create-pool">
        <form id="create-pool" onSubmit={handleSubmit}>
          <div className="input-form-box">
            <input
              id="title"
              type="text"
              className={'input-form'}
              placeholder="Titulo da Pesquisa"
            />
          </div>
          <div className="input-form-box input-form-box-label">
            <label className="label-input" htmlFor="numVotes">
              N° de votos:
            </label>
            <input
              id="numVotes"
              name="numVotes"
              type="number"
              className={'input-form input-form-small'}
              onChange={handleNumber}
              defaultValue={1}
            />
          </div>
          <div className="input-form-box input-form-box-label">
            <label className="label-input" htmlFor="secury">
              Proteger com senha:
            </label>
            <input type="checkbox" name="secury" onChange={checkboxHandler} />
          </div>
          {password()}
          {arr.map((item, i) => {
            return (
              <InputOption
                value={item.value}
                id={'option-' + i}
                inputHandler={(event, i) => inputHandler(event,i)}
                removeHandler={removeHandler}
              />
            );
          })}
          <div className="divButtons">
            <button className="bnt-forms asap" onClick={handleButton}>
              <strong>Adicionar Opção</strong>
            </button>
            <input
              className="bnt-forms asap"
              type="submit"
              value={'Criar'}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </fieldset>
    </div>
  );
}

export default CreatePool;
