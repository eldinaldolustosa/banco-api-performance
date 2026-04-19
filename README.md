# banco-api-performance

## Introducao

Este projeto contém testes de performance para a API do Banco, desenvolvidos com **K6** e **JavaScript**. O objetivo é validar o comportamento da aplicação sob carga, verificando tempo de resposta, taxa de erros e estabilidade dos endpoints críticos como autenticação e transferências bancárias.

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [K6](https://k6.io/) | Latest | Ferramenta de teste de performance |
| JavaScript (ES6+) | — | Linguagem dos scripts de teste |
| K6 Web Dashboard | Nativo K6 | Visualização de relatórios em tempo real |

---

## Estrutura do Repositorio

```
banco-api-performance/
├── config/
│   └── config.local.json        # Configuração local da baseURL
├── fixtures/
│   └── postLogin.json           # Dados de entrada para autenticação
├── helpers/
│   └── autenticacao.js          # Funções auxiliares de autenticação
├── reports/
│   └── login-html-report.html   # Relatório HTML exportado dos testes
├── tests/
│   ├── login.test.js            # Teste de performance do endpoint de login
│   └── transferencias.test.js   # Teste de performance do endpoint de transferências
└── utils/
    └── variaveis.js             # Utilitários de variáveis de ambiente
```

---

## Objetivo de Cada Grupo de Arquivo

### `config/`
Armazena a configuração local do projeto. O arquivo `config.local.json` define a `baseURL` padrão usada quando nenhuma variável de ambiente `BASE_URL` é fornecida na execução.

### `fixtures/`
Contém os dados estáticos (payloads) utilizados nas requisições dos testes. O arquivo `postLogin.json` fornece as credenciais de autenticação enviadas ao endpoint `/login`.

### `helpers/`
Agrupa funções reutilizáveis de suporte aos testes. O arquivo `autenticacao.js` exporta a função `obterToken()`, que realiza o login e retorna o token JWT — utilizado por testes que exigem autenticação prévia, como o de transferências.

### `reports/`
Diretório de saída para os relatórios HTML gerados pelo K6 Web Dashboard. Os arquivos gerados aqui estão listados no `.gitignore` e não são versionados.

### `tests/`
Contém os scripts de teste de performance:
- **`login.test.js`**: Testa o endpoint `POST /login` com carga progressiva (stages), validando status 200 e retorno do token JWT.
- **`transferencias.test.js`**: Testa o endpoint `POST /transferencias` com autenticação Bearer Token, validando status 201 na criação de transferências.

### `utils/`
Centraliza funções utilitárias. O arquivo `variaveis.js` exporta `pegarBaseURL()`, que retorna a variável de ambiente `BASE_URL` (se definida) ou o valor do `config.local.json` como fallback.

---

## Modo de Instalacao e Execucao do Projeto

### Pre-requisitos

- [K6](https://k6.io/docs/get-started/installation/) instalado na máquina

**Mac (Homebrew):**
```bash
brew install k6
```

**Linux (Debian/Ubuntu):**
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update && sudo apt-get install k6
```

**Windows (Chocolatey):**
```bash
choco install k6
```

---

### Configuracao da baseURL

A variável `BASE_URL` pode ser passada diretamente pela linha de comando ou configurada no arquivo `config/config.local.json`.

**Via variável de ambiente (recomendado):**
```bash
k6 run tests/login.test.js -e BASE_URL=http://localhost:3000
```

**Via arquivo de configuração (`config/config.local.json`):**
```json
{
  "baseURL": "http://localhost:3000"
}
```

---

### Execucao dos Testes

**Teste de Login:**
```bash
k6 run tests/login.test.js -e BASE_URL=http://localhost:3000
```

**Teste de Transferencias:**
```bash
k6 run tests/transferencias.test.js -e BASE_URL=http://localhost:3000
```

---

### Execucao com Relatorio em Tempo Real e Exportacao HTML

O K6 Web Dashboard permite acompanhar as métricas em tempo real no navegador e exportar o relatório completo em HTML ao final da execução.

**Teste de Login com dashboard e exportacao:**
```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=./reports/login-html-report.html k6 run tests/login.test.js -e BASE_URL=http://localhost:3000
```

**Teste de Transferencias com dashboard e exportacao:**
```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=./reports/transferencias-html-report.html k6 run tests/transferencias.test.js -e BASE_URL=http://localhost:3000
```

> Após iniciar o comando, acesse o dashboard em tempo real em: `http://127.0.0.1:5665`
> 
> O arquivo HTML exportado ficará disponível na pasta `reports/` ao término da execução.
