import prisma from '../src/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  // catálogos mínimos
  await prisma.language.upsert({ where: { code: 'ES' }, update: {}, create: { code: 'ES', name: 'Español' } });
  await prisma.language.upsert({ where: { code: 'EN' }, update: {}, create: { code: 'EN', name: 'Inglés' } });

  const pass = await bcrypt.hash('secret123', 10);

  const guide = await prisma.user.upsert({
    where: { email: 'guia@demo.com' },
    update: {},
    create: { email: 'guia@demo.com', passwordHash: pass, name: 'Ana Souza', role: 'GUIDE' }
  });

  await prisma.guideProfile.upsert({
    where: { userId: guide.id },
    update: {},
    create: { userId: guide.id, displayName: 'Ana Souza', ratePerDay: 180 }
  });

  const tourist = await prisma.user.upsert({
    where: { email: 'turista@demo.com' },
    update: {},
    create: { email: 'turista@demo.com', passwordHash: pass, name: 'Juan Pérez', role: 'TOURIST' }
  });

  console.log({ guide: guide.id, tourist: tourist.id });
}

main().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
