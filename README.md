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

## Deployment

The API server is deployed on render with the url `https://scello-backend-assessment.onrender.com` and versioned.

## Example

```javascript
const BASE_URL =  'https://scello-backend-assessment.onrender.com'
```

- GET ALL PRODUCTS (PAGINATED)

```javascript
const response = await fetch(BASE_URL);
console.log(response.json());
```

will return

```json
{
   "data" : [
      {
         "category" : "Technology",
         "createdAt" : "2025-01-28T16:46:04.605Z",
         "description" : "My first product",
         "id" : 1,
         "name" : "sheets",
         "price" : 7000,
         "stockQuantity" : 300,
         "updatedAt" : "2025-01-28T16:46:04.605Z"
      }
   ],
   "nextCursor" : "",
   "prevCursor" : ""
}
```

- CREATE A NEW PRODUCT WITH THE SAME NAME

```javascript
const data = {
    "name": "sheets", "description": "My first product", "price": 7000, "category": "Technology", "stockQuantity": 300
    }


const res =  await fetch("https://api.github.com/users/andrewmcodes", 
{
    method: "POST", 
    body: JSON.stringify(data)
});

console.log(res)
```

will return

```json
{
   "error" : "Product with name already exists"
}
```
