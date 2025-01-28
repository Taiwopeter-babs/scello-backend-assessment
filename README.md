# Assessment for Scelloo Node.js Backend Role

This repository contains code and configurations for Scelloo Assessment.

## Resources

- TypeScript
- Node/Express
- Docker
- PostgreSql

## Usage

Please follow the instructions outlined below to run the code.

- Clone the repository and run

```sh
mpm install
# or with yarn
yarn 
```

- Run PostgreSQL

To run this application, you need a database connection.

You can use a local PostgreSQL database or the image provided through the [compose file](./docker-compose.yml) by running the command below. Ensure that you have docker installed.

Please add the values specificed in the [env.example](./env.example) file for your environment variables.

```sh
docker compose up -d
```

- Run the migrations and Start the App

```sh
npm run db:migrate
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

## Database Schema

The database schema is as follows

```sql
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- UNIQUE INDEX on the name field to speed up name search
    -- and make sure that every product name is distinct. 
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(128) NOT NULL,
    price DECIMAL NOT NULL,
    'stockQuantity' INT NOT NULL 
);

-- Create index for the `createdAt` field for cursor based pagination
CREATE INDEX product_createdAt_index ON products(createdAt);
```
