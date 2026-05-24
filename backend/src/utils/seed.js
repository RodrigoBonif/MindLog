// src/utils/seed.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const prisma = require('../config/database');

async function main() {
  console.log('🌱  Seeding database...');

  const hash = await bcrypt.hash('123456', 10);

  const user = await prisma.user.upsert({
    where: { login: 'demo' },
    update: {},
    create: { login: 'demo', nome: 'Usuário Demo', senha: hash },
  });

  await prisma.card.createMany({
    data: [
      { titulo: 'Estudar Node.js', descricao: 'Revisar streams e workers', prioridade: 'Alta', prazo: '30/06/2025', userId: user.id },
      { titulo: 'Fazer exercícios', descricao: 'Caminhada 30 min', prioridade: 'Media', prazo: '15/06/2025', userId: user.id },
      { titulo: 'Ler livro', descricao: 'Clean Architecture', prioridade: 'Baixa', userId: user.id },
    ],
    skipDuplicates: true,
  });

  console.log(`✅  Seed concluído! Login: demo / Senha: 123456`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
