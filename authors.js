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
  // define variables for the authour (first name and last name)
  const newFirstName = author['first_name'];
  const newLastName = author['last_name'];

  // create a SQL sector (INSERT INTO) that takes in the column titles and Value are placehodlers with RETURN (givs us an outout of what we did)
  const insertText = "INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING *";

  // Tell the pool of data to use the SQL sector with the added varibles
  const result = await pool.query(insertText, [newFirstName, newLastName]);

  return result.rows[0] || null;
}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author or null

  const updatedFn = updates['first_name'];
  const updatedLn = updates['last_name'];

  const updateText = "UPDATE authors SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *";

  const result = await pool.query(updateText, [updatedFn, updatedLn, id]);

  return result.rows[0] || null;
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author or null
  const insertText = "DELETE FROM authors WHERE id = $1";

  const result = await pool.query(insertText, [id]);

  return result.rows[0] || null;
}
