import { useState } from 'react';
import './App.css';

function App() {
  const [saldo, setSaldo] = useState(0);
  const [nSaques, setNSaques] = useState(0);
  const [extrato, setExtrato] = useState([]);
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tela, setTela] = useState('menu');

  const adicionarExtrato = (descricao, valor) => {
    const linha = `${descricao.padEnd(20, '.')} R$ ${valor.toFixed(2)}`;
    setExtrato((prev) => [...prev, linha]);
  };

  const depositar = () => {
    const valorDeposito = parseFloat(valor);
    if (!isNaN(valorDeposito) && valorDeposito >= 1) {
      setSaldo((s) => s + valorDeposito);
      adicionarExtrato('Depósito', valorDeposito);
      setMensagem('Depósito realizado com sucesso!');
    } else {
      setMensagem('Valor inválido (mínimo R$ 1,00)');
    }
    setValor('');
  };

  const sacar = () => {
    const valorSaque = parseFloat(valor);
    if (nSaques >= 3) {
      setMensagem('⚠️ Limite de 3 saques atingido.');
    } else if (valorSaque > saldo) {
      setMensagem('⚠️ Saldo insuficiente.');
    } else if (isNaN(valorSaque) || valorSaque < 2 || valorSaque > 500) {
      setMensagem('⚠️ Só é possível sacar entre R$ 2,00 e R$ 500,00.');
    } else {
      setSaldo((s) => s - valorSaque);
      setNSaques((n) => n + 1);
      adicionarExtrato('Saque', valorSaque);
      setMensagem('Saque realizado com sucesso!');
    }
    setValor('');
  };

  return (
    <div className="App">
      <h1>🏦 SenaiBank</h1>
      <p><strong>Saldo:</strong> R$ {saldo.toFixed(2)}</p>

      {tela === 'menu' && (
        <div className="botoes">
          <button onClick={() => setTela('depositar')}>💰 Depositar</button>
          <button onClick={() => setTela('sacar')}>🏧 Sacar</button>
          <button onClick={() => setTela('extrato')}>📜 Ver Extrato</button>
        </div>
      )}

      {(tela === 'depositar' || tela === 'sacar') && (
        <div className="operacao">
          <input
            type="number"
            placeholder="Digite o valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <button onClick={tela === 'depositar' ? depositar : sacar}>Confirmar</button>
          <button onClick={() => { setTela('menu'); setMensagem(''); }}>Voltar</button>
        </div>
      )}

      {tela === 'extrato' && (
        <div className="extrato">
          <h2>📜 Extrato</h2>
          <pre>
            {extrato.length ? extrato.join('\n') : 'Sem transações ainda.'}
          </pre>
          <button onClick={() => setTela('menu')}>Voltar</button>
        </div>
      )}

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}

export default App;
