// src/server.js
require('dotenv').config();
const app = require('./app');
const prisma = require('./config/database');

const PORT = process.env.PORT || 3333;

async function bootstrap() {
  try {
    // Verify DB connection before accepting traffic
    await prisma.$connect();
    console.log('✅  Banco de dados conectado');

    app.listen(PORT, () => {
      console.log(`🚀  Servidor rodando em http://localhost:${PORT}`);
      console.log(`📄  Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('❌  Falha ao iniciar o servidor:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM recebido. Encerrando graciosamente...');
  await prisma.$disconnect();
  process.exit(0);
});

bootstrap();
