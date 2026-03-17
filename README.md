# 🟢 Broly.IA — Smart Log Analyzer

> Projeto desenvolvido para o programa **Geração Tech**  
> Desenvolvido por **Carlos Calou**

---

## 💡 Origem da Ideia

Como estagiário de TI na área de desenvolvimento, enfrentei na prática um problema muito comum entre quem está começando: receber um log de erro na tela e não saber por onde começar a resolver.

Stack traces, NullPointerExceptions, erros de conexão com banco de dados — para quem ainda está aprendendo, essas mensagens parecem um idioma desconhecido. Perder horas procurando no Google o que um erro significa é uma realidade diária de desenvolvedores iniciantes e equipes de suporte.

O **Broly.IA** nasceu dessa dor real. A ideia é simples: usar Inteligência Artificial como ferramenta para democratizar o entendimento de erros, tornando o diagnóstico acessível para qualquer pessoa, independente do nível de experiência.

---

## 🎯 Problema que Resolve

Em ambientes de desenvolvimento, logs de erro são gerados o tempo todo. O problema é que interpretá-los corretamente exige experiência — e quem está começando não tem essa bagagem ainda.

**Quem é afetado:**
- Desenvolvedores iniciantes
- Estagiários de TI
- Equipes de suporte técnico
- Estudantes de programação

**O impacto:** lentidão na resolução de problemas, dependência excessiva de desenvolvedores sênior para tarefas simples e desmotivação por não conseguir avançar sozinho.

---

## ✅ Solução

O Broly.IA permite que o usuário cole qualquer log, stack trace ou mensagem de erro e receba em segundos:

- **Tipo do erro** — identificado em linguagem simples
- **Causa provável** — explicada de forma acessível para iniciantes
- **Como resolver** — passos práticos e diretos
- **Nível de severidade** — baixa, média ou alta

A IA funciona como um mentor disponível 24 horas, acelerando o aprendizado e a produtividade de quem está começando na área.

---

## 🏗️ Arquitetura do Projeto
```
broly-ia/
├── frontend/     → React.js (interface do usuário)
└── backend/      → Java + Spring Boot (API + integração com IA)
```

**Fluxo completo:**
```
Usuário cola o log
      ↓
React envia para o backend Java
      ↓
Java chama a API do Google Gemini
      ↓
Gemini analisa e retorna o diagnóstico
      ↓
React exibe o resultado formatado
```

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React.js |
| Backend | Java 17 + Spring Boot 4 |
| Inteligência Artificial | Google Gemini API |
| Build | Maven |
| Versionamento | Git + GitHub |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado
- Java 17 instalado
- Chave da API do Gemini (gratuita em [aistudio.google.com](https://aistudio.google.com/app/apikey))

### Backend
```bash
cd backend
```

Abre o arquivo `src/main/resources/application.properties` e adiciona sua chave:
```properties
gemini.api.key=SUA_CHAVE_AQUI
server.port=8080
```

Roda o servidor:
```bash
.\mvnw.cmd spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Acessa `http://localhost:3000` no navegador.

---

## 📌 Funcionalidades do MVP

- [x] Input manual de logs e stack traces
- [x] Análise automática via IA
- [x] Diagnóstico estruturado (erro, causa e solução)
- [x] Indicador visual de severidade
- [x] Exemplos prontos para teste
- [x] Histórico de análises recentes
- [x] Tema escuro estilo terminal

---

## 🔮 Próximas Versões

- [ ] Banco de dados para salvar histórico permanente
- [ ] Autenticação de usuários
- [ ] Suporte a upload de arquivos de log
- [ ] Integração direta com IDEs
- [ ] Dashboard com estatísticas de erros mais comuns

---

## 🧠 Por que usar IA nesse contexto?

Hoje, saber usar IA como ferramenta de trabalho é tão importante quanto saber programar. O Broly.IA não substitui o aprendizado — ele **acelera** ele. Ao ver a explicação do erro e a sugestão de solução, o desenvolvedor iniciante aprende o padrão e na próxima vez já reconhece sozinho.

Usar IA de forma inteligente e direcionada é uma habilidade fundamental no mercado atual, e esse projeto é um exemplo prático disso.

---

## 👨‍💻 Autor

**Carlos Calou**  
Estagiário de TI | Estudante de Ciência de Dados | Geração Tech  

---

*Projeto desenvolvido como parte do programa Geração Tech*
