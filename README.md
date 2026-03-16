# MindLog
MindLog é uma plataforma web de organização visual e priorização inteligente de tarefas, projetada para transformar pensamentos, compromissos e responsabilidades em fluxos de trabalho claros e acionáveis.

Inspirado na dinâmica visual do Trello, o MindLog utiliza um sistema baseado em quadros e colunas (Kanban), permitindo que usuários organizem suas tarefas em cards dinâmicos, com foco em priorização temporal e gestão visual de urgência.

## 🎯 Proposta do Projeto

O objetivo do MindLog é ir além de um simples gerenciador de tarefas, oferecendo:

Organização visual intuitiva

Priorização automática baseada em prazos

Classificação por níveis de urgência

Interação dinâmica via drag-and-drop

Estrutura escalável para múltiplos quadros

A plataforma combina clareza visual com inteligência temporal, permitindo que o usuário identifique rapidamente quais tarefas exigem atenção imediata.

## 🚨 Sistema Inteligente de Prioridade Visual

O diferencial central do MindLog é seu sistema automático de sinalização por prazo, que utiliza códigos visuais para indicar urgência:

🔴 Borda vermelha → Prazo inferior a 4 dias

🟡 Borda amarela → Prazo inferior a 7 dias

🟢 Borda verde → Prazo superior a 7 dias ou sem prazo definido

Essa lógica permite que o usuário identifique instantaneamente tarefas críticas sem necessidade de análise manual.

## Requisitos 🧠

### 1. Requisitos Funcionais (RF)

Os requisitos funcionais descrevem as funcionalidades que o sistema deve oferecer aos usuários.

•
RF001: O sistema deve permitir a organização visual de tarefas.

•
RF002: O sistema deve permitir a priorização inteligente de tarefas.

•
RF003: O sistema deve transformar pensamentos, compromissos e responsabilidades em fluxos de trabalho claros e acionáveis.

•
RF004: O sistema deve utilizar um sistema baseado em quadros e agrupamentos (Kanban-like).

•
RF005: O sistema deve permitir que usuários organizem suas tarefas em cards dinâmicos.

•
RF006: O sistema deve realizar a priorização automática de tarefas baseada em prazos.

•
RF007: O sistema deve permitir a classificação de tarefas por níveis de urgência.

•
RF008: O sistema deve permitir interação dinâmica com cards e agrupamentos via drag-and-drop.

•
RF009: O sistema deve permitir que o usuário identifique rapidamente tarefas críticas.

•
RF010: O sistema deve possuir um sistema automático de sinalização por prazo, utilizando códigos visuais para indicar urgência.

•
RF011: O sistema deve exibir borda vermelha para cards com prazo inferior a 4 dias.

•
RF012: O sistema deve exibir borda amarela para cards com prazo inferior a 7 dias.

•
RF013: O sistema deve exibir borda verde para cards com prazo superior a 7 dias ou sem prazo definido.

•
RF014: O sistema deve garantir que cada usuário possua exatamente um board.

•
RF015: O sistema não deve permitir a criação de múltiplos boards por usuário.

•
RF016: O sistema deve criar o board automaticamente no momento do cadastro do usuário.

•
RF017: O sistema deve permitir que o usuário acesse e manipule apenas os dados do seu próprio board.

•
RF018: O sistema deve garantir que o board contenha pelo menos um agrupamento de tarefas.

•
RF019: O sistema deve permitir a criação de agrupamentos de tarefas dentro do board.

•
RF020: O sistema deve permitir a edição do nome do agrupamento de tarefas.

•
RF021: O sistema deve permitir a exclusão de agrupamentos de tarefas.

•
RF022: Ao excluir um agrupamento de tarefas, o sistema deve permitir que seus cards sejam movidos para outro agrupamento definido pelo usuário.

•
RF023: Ao excluir um agrupamento de tarefas, o sistema deve permitir que seus cards sejam excluídos junto com o agrupamento (regra a ser definida).

•
RF024: O sistema deve permitir a reordenação de agrupamentos de tarefas.

•
RF025: O sistema deve garantir que o nome do agrupamento de tarefas não seja vazio.

•
RF026: O sistema não deve permitir nome duplicado de agrupamento de tarefas dentro do mesmo board (opcional).

•
RF027: O sistema deve permitir a criação de cards dentro de um agrupamento de tarefas.

•
RF028: O sistema deve garantir que todo card possua título obrigatório.

•
RF029: O sistema deve permitir que o card possua descrição opcional.

•
RF030: O sistema deve permitir que o card possua prazo opcional.

•
RF031: O sistema não deve permitir a definição de prazo em data passada.

•
RF032: O sistema deve permitir que o card possua prioridade manual (baixa, média, alta).

•
RF033: O sistema deve permitir a edição das informações do card.

•
RF034: O sistema deve permitir a exclusão de cards.

•
RF035: O sistema deve permitir a movimentação de cards entre agrupamentos de tarefas.

•
RF036: O sistema deve permitir a reordenação de cards dentro do agrupamento de tarefas.

•
RF037: O sistema não deve permitir a criação de card sem agrupamento de tarefas associado.

•
RF038: O sistema deve definir automaticamente a cor da borda do card com base no prazo.

•
RF039: O sistema não deve permitir que a cor da borda seja definida manualmente pelo usuário.

•
RF040: O sistema deve considerar a data atual do sistema para o cálculo do prazo.

### 2. Requisitos Não Funcionais (RNF)

Os requisitos não funcionais descrevem as qualidades e restrições do sistema.

•
RNF001: O sistema deve oferecer uma organização visual intuitiva.

•
RNF002: O sistema deve possuir uma estrutura escalável para múltiplos quadros.

•
RNF003: O sistema deve combinar clareza visual com inteligência temporal.

•
RNF004: O sistema deve ser uma plataforma web.

•
RNF005: O sistema deve ser desenvolvido utilizando NodeJS (Express) para o backend.

•
RNF006: O sistema deve ser desenvolvido utilizando ReactJS (Redux, Redux Toolkit, Vite) para o frontend.


---

📐 Arquitetura

<img width="1805" height="620" alt="image" src="https://github.com/user-attachments/assets/e4b0526d-5499-4db6-aef9-ad9cf9b5e207" />

<details><summary>Arquitetura modelo C4</summary>
  
[mindlog_architecture.pdf](https://github.com/user-attachments/files/26038607/mindlog_architecture.pdf)

</details>

---

🌐 Tecnologias

### NodeJS
- Express

### ReactJS
- Redux
  - Redux Toolkit
- Vite
