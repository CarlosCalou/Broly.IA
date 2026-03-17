import React from 'react';

export default function ApiKeyBar({ apiKey, setApiKey }) {
  const ok = apiKey.trim().length > 10;
  return (
    <div className="api-bar">
      <label>GEMINI API KEY</label>
      <input
        type="password"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder="Crie grátis em aistudio.google.com/app/apikey"
      />
      <span className={ok ? 'key-ok' : 'key-none'}>
        {ok ? '● KEY OK' : '○ SEM CHAVE'}
      </span>
    </div>
  );
}