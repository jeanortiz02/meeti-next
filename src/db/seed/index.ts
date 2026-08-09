import { drizzle } from 'drizzle-orm/node-postgres';
import { category } from '../schema/category';
import { categories } from './data/categories'
import 'dotenv/config';


export async function seed() {
    const db = drizzle(process.env.DATABASE_URL!);
    await db.insert(category).values(categories);
    console.log('Seed: Datos ingresados correctamente');
}

seed();