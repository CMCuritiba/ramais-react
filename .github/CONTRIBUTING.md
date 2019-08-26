# Diretrizes de contribuição

## Índice

- [Primeiros passos] (# primeiros passos)
    - [Código de Conduta] (# código de conduta)
- [Como posso ajudar?] (# How-can-i-help)
    - [Documentação] (# documentação)
    - [Edições] (# edições)
      - [Enviando um problema] (# enviando um problema)
    - [Feedback] (# feedback)
    - [Código] (# código)
      - [Ambiente de desenvolvimento] (# ambiente de desenvolvimento)
- [Confirmando] (# confirmando)
    - [Ignorando processo de construção] (# ignorando processo de construção)
    - [Por que todas essas regras?] (# Por que todas essas regras)
- [Enviando uma solicitação pull] (# enviando uma solicitação pull)

## Começando

Primeiramente, gostaríamos de agradecer por você dedicar um tempo para contribuir e fazer deste um projeto melhor!

Aqui temos um conjunto de instruções e diretrizes para reduzir mal-entendidos e tornar o processo de contribuição para 'desformar' o mais suave possível.

Esperamos que este guia torne claro o processo de contribuição e responda a quaisquer perguntas que você possa ter.

### Código de conduta

Esperamos que os participantes do projeto cumpram nosso Código de Conduta. Você pode verificar o [texto completo](CODE_OF_CONDUCT.md) para entender o tipo de conduta que esperamos e quais ações serão e não serão toleradas.

Ao participar deste projeto, você concorda em cumprir seus termos.

## Como posso ajudar?

Aqui estão algumas maneiras pelas quais você pode ajudar, juntamente com algumas diretrizes.

Documentação

Erros de digitação, erros, falta de exemplos e / ou explicações e assim por diante, são apenas alguns exemplos de coisas que podem ser corrigidas e / ou aprimoradas.

Você pode até fazer melhorias neste guia! :)

Ao documentar, tente manter as coisas simples e claras.

### Problemas

Alguns problemas são criados com informações ausentes, sem modelo, não reproduzíveis ou comuns
inválido.

Você pode torná-los mais fáceis de entender e resolver.

#### Enviando um problema

- Procure problemas semelhantes antes de abrir um novo;
- Use um dos modelos de problemas correspondentes;
- Use um título claro e descritivo;
- Inclua o máximo de informações possível preenchendo o problema fornecido
    modelo;
- Na maioria das vezes, a melhor maneira de relatar um problema é a falha no teste.

### Comentários

Quanto mais feedback, melhor! Estamos sempre procurando mais sugestões e opiniões sobre discussões. Essa é uma boa oportunidade para influenciar a direção futura desta ferramenta.

Isso inclui o envio de uma sugestão de aprimoramento, incluindo recursos completamente novos e pequenas melhorias na funcionalidade existente.

A [`pergunta`](https://github.com/CMCuritiba/ramais-react/labels/question)
e
[`rfc`](https://github.com/CMCuritiba/ramais-react/labels/rfc)
os rótulos são um bom lugar para encontrar discussões em andamento.

### Code

Você pode usar rótulos de problemas para descobrir problemas com os quais você poderia ajudar:

- [problemas do bug`](https://github.com/CMCuritiba/ramais-react/labels/bug)
    são erros conhecidos que gostaríamos de corrigir;
- [problemas de aprimoramento`](https://github.com/CMCuritiba/ramais-react/labels/enhancement)
    são recursos que estamos abertos a incluir.

o
[`ajuda procurada`](https://github.com/Rocketseat/CMCuritiba/ramais-react/help%20wanted)
e
[`good first issue`](https://github.com/CMCuritiba/ramais-react/labels/good%20first%20issue)
rótulos são especialmente úteis.

Quando você vir um problema já atribuído, verifique se já não há alguém trabalhando nele (talvez tente perguntar no problema). Isso é para evitar trabalho desnecessário para todos os envolvidos.

#### Ambiente de desenvolvimento

Ao desenvolver, prefira usar ** Nó ** ≥ 8 e ** fio **. Escrever código com as versões estáveis ​​mais recentes do nó nos permite usar as ferramentas mais recentes do desenvolvedor.

Após [clonar o repositório](https://help.github.com/articles/cloning-a-repository/), execute `yarn` para instalar dependências.

Um resumo dos scripts:

- Para executar o exemplo, use `yarn dev: example`;
- O comando `yarn dev: start` compilará os arquivos lib e watch em pacote e será reconstruído com as alterações;
- Executar o `yarn dev` executará o`dev: example` e o `dev: start`;
- Use `yarn test` para executar o conjunto de testes (desenvolvido por [Jest](https://facebook.github.io/jest/));
- o 'macacão de fios' não pode ser usado localmente, é usado apenas para fornecer estatísticas de cobertura de teste ao [Coveralls](https://coveralls.io);
    + Para cobertura de código localmente, você pode executar o `yarn test --coverage`.
- `yarn build` compilará a lib usando [Rollup](https://rollupjs.org/guide/en);

Este projeto usa [Prettier](http://prettier.io/) para formatação de código. Considere instalar um [plugin do editor](https://prettier.io/docs/en/editors.html) f
