import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const mechanics = await prisma.gameMechanic.findMany({
      orderBy: {
        title: 'asc',
      },
    });
    
    return NextResponse.json(mechanics);
  } catch (error) {
    console.error('Failed to fetch mechanics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mechanics' },
      { status: 500 }
    );
  }
} 