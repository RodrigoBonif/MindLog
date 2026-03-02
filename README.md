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

## 🧠 Regras de Negócio:

1️⃣ Estrutura Geral

Cada usuário deve possuir exatamente um board.

Não deve ser possível criar múltiplos boards por usuário.

O board deve ser criado automaticamente no momento do cadastro.

O usuário só pode acessar e manipular dados do seu próprio board.

O board deve conter pelo menos uma coluna.

2️⃣ Colunas

Deve ser possível criar colunas dentro do board.

Deve ser possível editar o nome da coluna.

Deve ser possível excluir colunas.

Ao excluir uma coluna, seus cards devem ser:

movidos para outra coluna definida pelo usuário
ou

excluídos junto com a coluna (regra a ser definida).

Deve ser possível reordenar colunas.

O nome da coluna não pode ser vazio.

Não deve ser permitido nome duplicado de coluna dentro do mesmo board (opcional, mas recomendado).

3️⃣ Cards

Deve ser possível criar cards dentro de uma coluna.

Todo card deve possuir título obrigatório.

O card pode possuir descrição opcional.

O card pode possuir prazo opcional.

Não deve ser permitido definir prazo em data passada.

O card pode possuir prioridade manual (baixa, média, alta).

Deve ser possível editar as informações do card.

Deve ser possível excluir cards.

Deve ser possível mover cards entre colunas.

Deve ser possível reordenar cards dentro da coluna.

Não deve ser possível criar card sem coluna associada.

4️⃣ Priorização Visual Automática

A cor da borda do card deve ser definida automaticamente com base no prazo.

Prazo inferior a 4 dias → borda vermelha.

Prazo inferior a 7 dias → borda amarela.

Prazo superior a 7 dias → borda verde.

Card sem prazo → borda verde.

A cor não pode ser definida manualmente pelo usuário.

O cálculo deve considerar a data atual do sistema.

---

📐 Arquitetura

<img width="1736" height="585" alt="image" src="https://github.com/user-attachments/assets/433a6dab-ee16-4915-ba6a-92ed544b4890" />

---

🌐 Tecnologias

### NodeJS
- Express

### ReactJS
- Redux
  - Redux Toolkit
- Vite
