import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { gerarExtratoPDF } from './utils/gerarExtratoPDF';
import './Home.css';

function App() {
  const { logout } = useAuth();
  const [saldo, setSaldo] = useState(0);
  const [nSaques, setNSaques] = useState(0);
  const [extrato, setExtrato] = useState([]);
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tela, setTela] = useState('menu');

  const adicionarExtrato = (descricao, valor) => {
    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const data = agora.toLocaleDateString('pt-BR');
    const linha = `[ ${data} ${hora} ] ${descricao.padEnd(10, '.')} R$ ${valor.toFixed(2)}`;
    setExtrato((prev) => [...prev, linha]);
  };

  const depositar = () => {
    const valorDeposito = parseFloat(valor);
    if (!isNaN(valorDeposito) && valorDeposito >= 1 && valorDeposito <= 1500) {
      setSaldo((s) => s + valorDeposito);
      adicionarExtrato('Depósito', valorDeposito);
      setMensagem('Depósito realizado com sucesso!');
    } else {
      setMensagem('Valor inválido ( de R$ 1,00 à R$ 1500,00)');
    }
    setValor('');
  };

  const sacar = () => {
    const valorSaque = parseFloat(valor);
    if (nSaques >= 3) {
      setMensagem('⚠️ Limite de 3 saques diários atingido.');
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
    <div className="Home">
        <header className='header'>
            <h1>🏦 SenaiBank</h1>
            <button className='sair' onClick={logout}>Sair</button>
        </header>
        <p><strong>Saldo:</strong> R$ {saldo.toFixed(2)}</p>

        {tela === 'menu' && (
            <div className="botoes">
            <button onClick={() => setTela('depositar')}>Depositar</button>
            <button onClick={() => setTela('sacar')}>Sacar</button>
            <button onClick={() => setTela('extrato')}>Ver Extrato</button>
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
            <button className="botoes" onClick={tela === 'depositar' ? depositar : sacar}>Confirmar</button>
            <button className="botoes" onClick={() => { setTela('menu'); setMensagem(''); }}>Voltar</button>
            </div>
      )}

      {tela === 'extrato' && (
        <div className="extrato">
          <h2>Extrato</h2>
          <pre>{extrato.length ? extrato.join('\n') : 'Sem transações ainda.'}</pre>

          <button onClick={() => gerarExtratoPDF(extrato)}>📄 Gerar PDF</button>
          <button onClick={() => setTela('menu')}>Voltar</button>
        </div>
      )}

      {mensagem && <p className="mensagem">{mensagem}</p>}

    </div>
  );
}

export default App;
