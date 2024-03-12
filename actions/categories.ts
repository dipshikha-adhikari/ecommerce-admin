'use server'

const pool = require('@/lib/db')
async function fetchCategories(parentId: number) {
    const query = `
        SELECT categories.id, categories.name
        FROM categories
        JOIN category_relations ON categories.id = category_relations.child_id
        WHERE category_relations.parent_id = $1`;
    const { rows } = await pool.query(query, [parentId]);

    const categories = [];
    for (const row of rows) {
        const children: any = await fetchCategories(row.id); // Recursively fetch children
        categories.push({ ...row, children });
    }

    return categories;
}

export async function fetchRootCategories() {
    const query = `
        SELECT categories.id, categories.name
        FROM categories
        JOIN category_relations ON categories.id = category_relations.child_id
        WHERE category_relations.parent_id IS NULL`;
    const { rows } = await pool.query(query);

    const rootCategories = [];
    for (const row of rows) {
        const children = await fetchCategories(row.id); // Fetch children for each root category
        rootCategories.push({ ...row, children });
    }

    return rootCategories;
}

// Usage



