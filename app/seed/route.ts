import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client'
import { invoices, customers, revenue, users } from '../lib/placeholder-data';

const prisma = new PrismaClient()

async function seedUsers() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
  }
}

async function seedCustomers() {
  for (const customer of customers) {
    await prisma.customer.create({
      data: customer
    });
  }
}

async function seedInvoices() {
  for (const invoice of invoices) {
    await prisma.invoice.create({
      data: invoice
    });
  }
}

async function seedRevenue() {
  for (const rev of revenue) {
    await prisma.revenue.create({
      data: rev
    });
  }
}

export async function GET() {
  try {
    // 이미 데이터가 존재하면 시드 작업을 실행하지 않음
    const exists = await prisma.user.count();

    if (exists > 0) {
      return Response.json({ message: 'Database already seeded' });
    }
    
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
    
