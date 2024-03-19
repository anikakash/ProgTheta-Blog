# Project Title

CRUD Application Rest API.

## Description

In this application, you can add new products, retrieve all existing products, and access specific product information. Additionally, you have the capability to update any product using its unique identifier and delete products as needed.

## Getting Started

### Dependencies

- Node.js
- npm
- Express
- Mongoose

### Installing

- Clone the repository to your local machine.
- Navigate to the cloned directory.

```bash
git clone <repository-url>
cd <repository-name>
```

# Install the required dependencies.

run :

```bash
npm install
```

# Executing program

- To Start the server :

```bash
npm start
```

# API Reference

### Get all Products

```bash
GET http://localhost:3000/api/products
```

### Get Products by id

```bash
GET http://localhost:3000/api/products/:id
```

### Add Products

```bash
POST http://localhost:3000/api/products

```

**JSON Body :**

```JSON
{
  "name": "Item Name",
  "quantity": 10,
  "price": 100
}
```

### Update Products

```bash
PUT http://localhost:3000/api/products/:id
```

```JSON
{
    "name" : "Book"
}
```

### Delete item

```bash
DELETE http://localhost:3000/api/products/:id
```

# Help

Any advise for common problems or issues.


Remember to replace `<repository-url>` and `<repository-name>` with your actual repository URL and name. Also, you may want to add more specific instructions or descriptions based on your project's functionality and structure. Good luck with your project!

