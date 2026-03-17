import React from 'react';

const LABELS = { java: 'NullPointer', db: 'banco de dados', api: 'erro 401', oom: 'OutOfMemory' };

export default function LogInput({ logText, setLogText, loadExample, analyze, loading, error }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-dot" />
        <span>entrada de log</span>
      </div>
      <div className="panel-body">
        <textarea
          value={logText}
          onChange={e => setLogText(e.target.value)}
          placeholder="> cole seu log, stack trace ou exceção aqui..."
        />
        <div className="examples">
          <span>exemplos:</span>
          {Object.entries(LABELS).map(([key, label]) => (
            <button key={key} className="ex-btn" onClick={() => loadExample(key)}>
              {label}
            </button>
          ))}
        </div>
        <button className="analyze-btn" onClick={analyze} disabled={loading}>
          {loading ? (
            <><span className="spinner" /> analisando...</>
          ) : (
            '> analisar com ia'
          )}
        </button>
        {error && <div className="error-msg">{error}</div>}
      </div>
    </div>
  );
}