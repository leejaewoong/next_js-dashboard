import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const data = await prisma.$queryRaw<{
      amount: number;
      name: string;
    }[]>`
      SELECT Invoice.amount, Customer.name
      FROM Invoice
      JOIN Customer ON Invoice.customer_id = Customer.id
      WHERE Invoice.amount = 666;
    `;
  
      return Response.json(data);
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }