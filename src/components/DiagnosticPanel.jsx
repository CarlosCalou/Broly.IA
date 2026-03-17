import React from 'react';

const SEV_CONFIG = {
  low:    { count: 2, cls: 'low' },
  medium: { count: 3, cls: 'medium' },
  high:   { count: 5, cls: 'high' },
};

function Pips({ severity }) {
  const { count, cls } = SEV_CONFIG[severity] || { count: 0, cls: '' };
  return (
    <div className="severity-row">
      <span className="sev-label">severidade</span>
      <div className="pips">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`pip ${i < count ? cls : ''}`} />
        ))}
      </div>
    </div>
  );
}

export default function DiagnosticPanel({ result, loading, severity }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-dot" />
        <span>diagnóstico</span>
        {severity && <Pips severity={severity} />}
      </div>
      <div className="panel-body">
        {loading && (
          <div className="placeholder">
            <span className="spinner" style={{ width: 24, height: 24 }} />
            <span>consultando ia...</span>
          </div>
        )}

        {!loading && !result && (
          <div className="placeholder">
            <span>{'>'} aguardando análise</span>
            <span style={{ fontSize: 10 }}>cole um log e execute</span>
          </div>
        )}

        {!loading && result && (
          <div className="result-cards">
            {result.raw ? (
              <div className="result-card raw">
                <div className="result-label">análise</div>
                <div className="result-text">{result.raw}</div>
              </div>
            ) : (
              <>
                {result.error && (
                  <div className="result-card error">
                    <div className="result-label">tipo de erro</div>
                    <div className="result-text">{result.error}</div>
                  </div>
                )}
                {result.cause && (
                  <div className="result-card cause">
                    <div className="result-label">causa provável</div>
                    <div className="result-text">{result.cause}</div>
                  </div>
                )}
                {result.fix && (
                  <div className="result-card fix">
                    <div className="result-label">como resolver</div>
                    <div className="result-text">{result.fix}</div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}