export default `CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  car_id BIGINT REFERENCES cars(id) NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  client_id BIGINT REFERENCES clients(id) NOT NULL,
  price INTEGER NOT NULL
)`;