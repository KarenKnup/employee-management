<div align="center">
  <h1>Gerenciador de Licenças</h1>
  <code>Angular</code> <code>API</code> <code>C#</code> <code>Typescript</code> <code>MySQL</code> <code>Bootstrap</code> <code>Font Awesome</code>
</div>
<br>
<img src="teste.gif" alt="Animação de teste">

<div align="center">
  <h2>O que é o GL?</h2>
  O <strong>Gerenciador de Licenças</strong> (GL) é um sistema que desenvolvi para o estudo de Angular e Typescript. A proposta é simples, pois é o meu primeiro projeto usando Angular e Typescript com uma API integrada, é um sistema que permite que os administradores gerenciem as licenças dos funcionários e que os funcionários possam solicitar uma licença dentro de uma data inicial e data final (por exemplo, do dia 12/10 ao dia 14/10) e por determinado motivo. 
</div>

<div align="center">
  <h2>Pastas e Arquivos</h2>
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Função</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>API Employees</code></td>
        <td>É a API que desenvolvi usando C# no Visual Studio para interagir com o sistema entregando as informações do banco de dados.</td>
      </tr>
      <tr>
        <td>Projeto/<code>public</code></td>
        <td>Pasta de documentos e arquivos públicos, visíveis para todos os usuários.</td>
      </tr>
      <tr>
        <td>Projeto/public/<code>api_employees.sql</code></td>
        <td>É a importação do banco de dados com os dados de teste.</td>
      </tr>
      <tr>
        <td>Projeto/<code>angular.json</code></td>
        <td>É o arquivo que configura o comportamento e toda a estrutura do projeto. Ele é gerado automaticamente sempre que um novo projeto Angular é criado.</td>
      </tr>
      <tr>
        <td>Projeto/<code>src</code></td>
        <td>A pasta src (source) é onde fica o código-fonte da aplicação e onde o projeto foi desenvolvido.</td>
      </tr>
      <tr>
        <td>Projeto/src/<code>index.html</code></td>
        <td>Esse arquivo é o ponto de entrada da aplicação no navegador — é a página HTML base onde o Angular insere automaticamente todo o app.</td>
      </tr>
      <tr>
        <td>Projeto/src/<code>main.ts</code></td>
        <td>Esse arquivo é o ponto de entrada principal do código TypeScript no projeto Angular — é nele que o framework é inicializado e a aplicação começa a rodar. O <code>index.html</code> carrega o Angular no navegador, e o <code>main.ts</code> diz ao Angular qual módulo inicializar (o App).</td>
      </tr>
      <tr>
        <td>Projeto/src/<code>styles.css</code></td>
        <td>É o arquivo global de estilos do projeto. Tudo que se coloca nele é aplicado em toda a aplicação, e não apenas em um componente.</td>
      </tr>
      <tr>
        <td>Prjeto/src/<code>app</code></td>
        <td>É nessa pasta que fica todo o código da aplicação propriamente dita (componentes, módulos, serviços, rotas, etc).</td>
      </tr>     
      <tr>
        <td>Projeto/src/app/<code>model</code></td>
        <td>Pasta que serve para organizar as classes (definem a forma/estrutura e a lógica com getters e setters) e interfaces (definem a forma/estrura) que representam os dados usados pelo sistema.</td>
      </tr>
      <tr>
        <td>Projeto/src/app/<code>pages</code></td>
        <td>É a pasta onde ficam as páginas (componentes) do sistema.</td>
      </tr>
      <tr>
        <td>Projeto/src/app/<code>services</code></td>
        <td>Pasta onde ficam as classes responsáveis comunicação com o backend (API) e serviços (normalmente externos) de suporte à aplicação, não necessariamente relacionado à interface visual. Nela são definidos services que lidam com requisições HTTP, autenticação, configurações, manipulação de dados e regras de negócio reutilizáveis entre os componentes.</td>
      </tr>
      <tr>
        <td>Projeto/src/app/<code>app.routes.ts</code></td>
        <td>É o arquivo que configura o sistema de rotas da aplicação, ou seja, define quais componentes (páginas) aparecem em cada URL.</td>
      </tr>
      <tr>
        <td>Projeto/src/app/<code>app.ts</code></td>
        <td>Arquivo que contém a lógica e define o componente raiz da aplicação Angular.</td>
      </tr>
      <tr>
        <td>Projeto/src/app/<code>app.html</code></td>
        <td>É o template principal (HTML) do componente raiz da aplicação.</td>
      </tr>
      <tr>
        <td>Projeto/src/app/<code>app.css<code></td>
        <td>É o arquivo de estilização do componente raiz da aplicação.</td>
      </tr>     
    </tbody>
  </table>
</div>

<div align="center">
  <h2>Comandos usados no VS Code</h2>
</div>

- Baixar a versão mais recente do Angular no projeto
```text
npm install -g @angular/cli@latest
```
- Criar um novo projeto em Angular
```text
ng new employeemanagement
```
- Instalar o Bootstrap no projeto
```text
npm install bootstrap
```
- Instalar o Font Awesome no projeto
```text
npm install @fontawesome/fontawesome-free
```
- Criar os componentes (páginas) de <code>/pages</code>
```text
ng g c login
```
```text
ng g c layout
```
```text
ng g c employee
```
```text
ng g c newLeave
```
```text
ng g c earnedLeave
```
```text
ng g c dashboard
```
- Criar o service em <code>/services</code>
```text
ng g s master
```
- Executar o projeto após selecionar a pasta no terminal do VS Code: <code>Pasta Projeto ➡︎ Open in Integrated Terminal</code>
```text
ng serve --port 4200
```

<div align="center">
  <h2>Planejamentos futuros</h2>
</div>

- Responsividade.
- Adicionar a opção de selecionar o status do novo usuário a ser cadastrado entre Admin e Employee.
- Limitar em páginas a quantidade de blocos nas tables.
- Investir em segurança.
- Criar a página de "Esqueci a minha senha".
- Cadastro de dados via importação.
- Adicionar biblioteca para os alerts.

