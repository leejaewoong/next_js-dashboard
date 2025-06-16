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

async function seedInvoces(){
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
    await prisma.$transaction([
      prisma.user.deleteMany(),
      prisma.customer.deleteMany(),
      prisma.invoice.deleteMany(),
      prisma.revenue.deleteMany(),
    ]);
    
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
    
