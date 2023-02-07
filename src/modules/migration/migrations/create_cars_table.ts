export default `CREATE TABLE cars (
  id BIGSERIAL PRIMARY KEY,
  government_number VARCHAR(255) UNIQUE
)`;