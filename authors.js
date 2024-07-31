// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getAuthors() {
  // Query the database and return all authors
  const queryText = "SELECT * FROM authors";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getAuthorById(id) {
  // Query the database and return the author with a matching id or null
  const queryText = "SELECT * FROM authors WHERE id = $1";

  const result = await pool.query(queryText, [id]);

  return result.rows[0] || null;
}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author

  const newId = author['id'];
  const newFirstName = author['first_name'];
  const newLastName = author['last_name'];

  const insertText = "INSERT INTO authors (id, first_name, last_name) VALUES (newId = $1, newFirstName = $1, newLastName = $1)"

  const result = await pool.query(insertText, [newId, newFirstName, newLastName]);

  return result.rows[0] || null;


}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author or null
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author or null
}
