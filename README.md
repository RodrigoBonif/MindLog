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
**RF001**: O sistema deve permitir a organização visual de tarefas.

•
**RF002**: O sistema deve permitir a priorização inteligente de tarefas.

•
**RF003**: O sistema deve transformar pensamentos, compromissos e responsabilidades em fluxos de trabalho claros e acionáveis.

•
**RF004**: O sistema deve utilizar um sistema baseado em quadros (Kanban-like).

•
**RF005**: O sistema deve permitir que usuários organizem suas tarefas em cards dinâmicos diretamente no board.

•
**RF006**: O sistema deve realizar a priorização automática de tarefas baseada em prazos.

•
**RF007**: O sistema deve permitir a classificação de tarefas por níveis de urgência.

•
**RF008**: O sistema deve permitir interação dinâmica com cards via drag-and-drop no board.

•
**RF009**: O sistema deve possuir um sistema automático de sinalização por prazo, utilizando códigos visuais para indicar urgência.

•
**RF010**: O sistema deve exibir borda vermelha para cards com prazo inferior a 4 dias.

•
**RF011**: O sistema deve exibir borda amarela para cards com prazo inferior a 7 dias.

•
**RF012**: O sistema deve exibir borda verde para cards com prazo superior a 7 dias ou sem prazo definido.

•
**RF013**: O sistema deve garantir que cada usuário possua exatamente um board.

•
**RF014**: O sistema não deve permitir a criação de múltiplos boards por usuário.

•
**RF015**: O sistema deve criar o board automaticamente no momento do cadastro do usuário.

•
**RF016**: O sistema deve permitir que o usuário acesse e manipule apenas os dados do seu próprio board.

•
**RF017**: O sistema deve permitir a criação de cards no board.

•
**RF018**: O sistema deve garantir que todo card possua título obrigatório.

•
**RF019**: O sistema deve permitir que o card possua descrição opcional.

•
**RF020**: O sistema deve permitir que o card possua prazo opcional.

•
**RF021**: O sistema não deve permitir a definição de prazo em data passada.

•
**RF022**: O sistema deve permitir que o card possua prioridade manual (baixa, média, alta).

•
**RF023**: O sistema deve permitir a edição das informações do card.

•
**RF024**: O sistema deve permitir a exclusão de cards.

•
**RF025**: O sistema deve permitir a reordenação de cards no board.

•
**RF026**: O sistema deve definir automaticamente a cor da borda do card com base no prazo.

•
**RF027**: O sistema não deve permitir que a cor da borda seja definida manualmente pelo usuário.

•
**RF028**: O sistema deve considerar a data atual do sistema para o cálculo do prazo.

### 2. Requisitos Não Funcionais (RNF)

Os requisitos não funcionais descrevem as qualidades e restrições do sistema.

•
**RNF001**: O sistema deve oferecer uma organização visual intuitiva.

•
**RNF002**: O sistema deve combinar clareza visual com inteligência temporal.

•
**RNF003**: O sistema deve ser desenvolvido utilizando NodeJS (Express) para o backend.

•
**RNF004**: O sistema deve ser desenvolvido utilizando ReactJS (Redux, Redux Toolkit, Vite) para o frontend.

---

📐 Arquitetura

<img width="1805" height="620" alt="image" src="https://github.com/user-attachments/assets/e4b0526d-5499-4db6-aef9-ad9cf9b5e207" />

<details><summary>Arquitetura modelo C4</summary>
  
[mindlog_architecture.pdf](https://github.com/user-attachments/files/26038607/mindlog_architecture.pdf)

</details>

---

🧩 Protótipo

https://www.figma.com/design/J7W4XXFzFYFiBmqjKjOMTJ/MindLog?node-id=1-10&p=f&t=cCEf3ftFuIQvlxJ6-0

---

🌐 Tecnologias

### NodeJS
- Express

### ReactJS
- Redux
  - Redux Toolkit
- Vite
