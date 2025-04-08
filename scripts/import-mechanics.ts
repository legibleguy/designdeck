import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function importMechanics() {
  const csvFilePath = path.join(process.cwd(), '../mechanics_database_expanded.csv');
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  const parser = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  for await (const record of parser) {
    try {
      await prisma.gameMechanic.create({
        data: {
          title: record.Name, // Map 'Name' to 'title'
          category: record.Category, // Map 'Category' to 'category'
          description: record['Short Description'], // Map 'Short Description' to 'description'
          longDescription: record['Long Description'], // Map 'Long Description' to 'longDescription'
          examples: record.Examples, // Map 'Examples' to 'examples'
          solvedProblems: record['Solved Problems'], // Map 'Solved Problems' to 'solvedProblems'
          minTimeToImplement: parseInt(record['Min Time']), // Map 'Min Time' to 'minTimeToImplement'
          maxTimeToImplement: parseInt(record['Max Time']), // Map 'Max Time' to 'maxTimeToImplement'
          timeToImplementExplained: record['Time to Implement (Explained)'], // Map 'Time to Implement (Explained)' to 'timeToImplementExplained'
        },
      });
      console.log(`Imported: ${record.Name}`);
    } catch (error) {
      console.error(`Error importing ${record.Name}:`, error);
    }
  }

  await prisma.$disconnect();
}

importMechanics().catch((error) => {
  console.error('Import failed:', error);
  process.exit(1);
});