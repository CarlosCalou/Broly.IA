import React, { useState } from 'react';
import './App.css';
import LogInput from './components/LogInput';
import DiagnosticPanel from './components/DiagnosticPanel';

const EXAMPLES = {
  java: `Exception in thread "main" java.lang.NullPointerException
\tat com.empresa.servico.UsuarioService.buscarUsuario(UsuarioService.java:47)
\tat com.empresa.controller.UsuarioController.getUsuario(UsuarioController.java:23)
\tat java.lang.Thread.run(Thread.java:748)`,
  db: `com.mysql.jdbc.exceptions.jdbc4.CommunicationsException: Communications link failure
Caused by: java.net.ConnectException: Connection refused
\tat com.empresa.repository.UsuarioRepository.findAll(UsuarioRepository.java:15)
Connection pool exhausted. Max pool size: 10`,
  api: `HTTP 401 Unauthorized
{"error": "invalid_token", "message": "The access token expired"}
Request: POST https://api.pagamento.com/v2/transactions
Response time: 342ms`,
  oom: `java.lang.OutOfMemoryError: Java heap space
\tat java.util.Arrays.copyOf(Arrays.java:3210)
\tat com.empresa.relatorio.RelatorioService.gerarRelatorio(RelatorioService.java:112)
GC overhead limit exceeded. Heap: 512MB / 512MB used`,
};

export default function App() {
  const [logText, setLogText]   = useState('');
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [severity, setSeverity] = useState(null);
  const [history, setHistory]   = useState([]);

  const loadExample = (type) => setLogText(EXAMPLES[type]);

  const analyze = async () => {
    setError('');
    if (!logText.trim()) { setError('Cole um log no campo de entrada.'); return; }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('http://localhost:8080/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ log: logText }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      const data = await res.json();
      setSeverity(data.severity);
      setResult(data);

      setHistory(prev => [
        { log: logText.substring(0, 55) + '...', severity: data.severity },
        ...prev.slice(0, 4),
      ]);
    } catch (err) {
      setError('Erro: ' + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="broly-badge">
          <span className="broly-name">BROLY.IA</span>
          <span className="broly-sub">log analyzer // powered by gemini</span>
        </div>
        <div className="status-dot" title="online" />
      </header>

      <div className="main-grid">
        <LogInput
          logText={logText}
          setLogText={setLogText}
          loadExample={loadExample}
          analyze={analyze}
          loading={loading}
          error={error}
        />
        <DiagnosticPanel
          result={result}
          loading={loading}
          severity={severity}
        />
      </div>

      {history.length > 0 && (
        <div className="history-section">
          <p className="history-title">histórico recente</p>
          <div className="history-chips">
            {history.map((h, i) => (
              <button
                key={i}
                className="history-chip"
                style={{
                  borderLeftColor: h.severity === 'high'
                    ? 'var(--red)'
                    : h.severity === 'medium'
                    ? 'var(--amber)'
                    : 'var(--green2)',
                  borderLeftWidth: 3,
                }}
                onClick={() => setLogText(h.log)}
                title={h.log}
              >
                {h.log}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}