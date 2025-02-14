# 🚀 HIVE AI – Multi-Agent AI Framework  

<div align="center">

![HIVE AI Logo](https://github.com/user-attachments/assets/2ca20065-0133-4deb-85ee-56be289d2eb0)

</div>

HIVE AI é uma biblioteca para a criação de agentes autônomos de IA que trabalham juntos para executar tarefas complexas de forma coordenada e eficiente. Cada agente é impulsionado por um **Large Language Model (LLM)** e pode utilizar ferramentas externas para interagir com o ambiente, tornando-se uma solução poderosa para automação inteligente e colaborativa.  

## 📌 Tabela de Conteúdos
- [Visão Geral](#visão-geral)
- [Recursos](#recursos)
- [Instalação](#instalação)
- [Exemplo de Uso](#exemplo-de-uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🔍 Visão Geral

HIVE AI fornece uma arquitetura flexível para o desenvolvimento de **agentes autônomos de IA** que podem se comunicar, planejar e executar tarefas utilizando ferramentas personalizadas. O design enfatiza **inteligência coletiva** e **colaboração**, sendo útil para diversas aplicações, como pesquisa na web, assistentes interativos e automação de fluxos de trabalho.  

## ✨ Recursos
- **Agentes Autônomos**: Cada agente pode operar de forma independente com um objetivo específico.  
- **Planejamento Colaborativo**: Múltiplos agentes trabalham juntos para construir e executar planos de ação.  
- **Ferramentas Customizáveis**: Os agentes podem utilizar ferramentas externas, como pesquisa no Google ou resumos de páginas da web.  
- **Memória Persistente**: Os agentes podem lembrar interações passadas e melhorar seu desempenho com o tempo.  
- **Escalabilidade**: Fácil de escalar, permitindo adicionar novos agentes e tarefas conforme necessário.  

## 🛠 Instalação

Para instalar o *HIVE AI*, utilize o **npm**:  

```bash
npm install hiveai
```

## 🚀 Exemplo de Uso  

Aqui está um exemplo simples de como criar um agente autônomo que pesquisa informações na web e gera um artigo resumido com múltiplas fontes:  

```typescript
import env from "dotenv";
import { Hive } from "hiveai";
import { Agent, Task, Tool } from "hiveai/models";
import { LLamaModel } from "hiveai/llms/llamaGroq";

import { GoogleSearchTool } from "hiveai/tools/googleSearch";
import { WebSummarizer } from "hiveai/tools/webSiteSummarizer";

env.config();

const llama = new LLamaModel();

const Rafael = new Agent({
  backstory: "I'm Rafael, an internet user exploring the web.",
  goal: "Search for information online and summarize content.",
  name: "Rafael",
  role: "Internet Researcher",
  tools: [GoogleSearchTool, WebSummarizer],
});

const main = async () => {
  const hive = new Hive({
    agents: [Rafael],
    tasks: [
      new Task({
        description:
          "Find information about AI, summarize it from at least four different sources, and structure it into an article.",
        agent: Rafael,
        expectedOutput: "A well-structured AI summary from multiple sources.",
      }),
    ],
    model: llama,
  });
  await hive.execute();
};

main();
```

## 🤝 Contribuição
Contribuições são bem-vindas! Para contribuir, siga os seguintes passos:
1. Faça um fork do repositório.
2. Crie uma nova branch: `git checkout -b minha-feature`.
3. Faça as alterações e commit: `git commit -m 'Adicionando nova feature'`.
4. Envie para o repositório: `git push origin minha-feature`.
5. Abra um Pull Request.

## 📜 Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
