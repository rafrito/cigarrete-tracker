'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';

const entriesSchema = z.object({
	userId: z.string(),
	quantity: z.number(),
	note: z.string().optional(),
	tags: z.array(z.string()),
	date: z.string(),
})

function parseToPostgresArray(array: string[]) {
	return '{' + array.map(item => {
        if (item === null || item === undefined) {
            return 'NULL';
        }
		const escapedItem = item.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
		return `"${escapedItem}"`;
    }).join(',') + '}';
}

async function checkExistence(userId: string, date: string) {
	const { rows } = await sql`
		select exists (
			select 1
			from "cigarrete-tracker".entries
			where user_id = ${userId}
			and date = ${date}
		) as "exists"
	`;

	return rows[0].exists
}

async function insertEntry(userId: string, quantity: number, note: string, tags: string[], date: string) {
	const { rows } = await sql`
		insert into "cigarrete-tracker".entries (user_id, quantity, note, tags, date)
		values (${userId}, ${quantity}, ${note}, ${parseToPostgresArray(tags)}, ${date})
		returning *
	`;

	return rows[0];
}

async function updateEntry(userId: string, quantity: number, note: string, tags: string[], date: string) {
	const { rows } = await sql`
		update "cigarrete-tracker".entries
		set
			quantity = ${quantity},
			note = ${note},
			tags = ${parseToPostgresArray(tags)},
			updated_at = now()
		where
			user_id = ${userId}
			and date = ${date}
		returning *
	`;

	return rows[0];
}
export async function addEntry(userId: string, quantity: number, note: string, tags: string[], date: string) {
	try {
		entriesSchema.parse({ userId, quantity, note, tags, date });

		const exists = await checkExistence(userId, date);

		if (exists)
			return await updateEntry(userId, quantity, note, tags, date);

		return await insertEntry(userId, quantity, note, tags, date);

	} catch (error) {		
		console.error(error);
		return { error: 'Invalid input', errorDetails: error };
	}
}

export async function submitForm(form: FormData) {
	console.log(form);

	const data =  {
		userId: "1",
		quantity: Number(form.get("quantity")),
		note: form.get("note") as string,
		tags: form.getAll("tags").filter(Boolean) as string[],
		date: form.get("date") as string,
	}

	await addEntry(data.userId, data.quantity, data.note, data.tags, data.date);
}

export async function getAll() {
	const { rows } = await sql`
		select
			date,
			quantity,
			note,
			tags
		from "cigarrete-tracker".entries
		where
			date >= now()::date - '3 months'::interval
		order by date
	`;

	return rows;
}