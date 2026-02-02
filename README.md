# System Design 1
# Book Management API

This is a robust Backend API for a Library/Bookstore Management System, built with **Node.js, Express, and TypeScript**. It follows **Object-Oriented Programming (OOP)** principles and implements clean architecture (Controllers → Services → Repositories).

## 🚀 Features

- **CRUD Operations**: Create, Read (List + Single), Update, Delete Books.
- **Advanced Querying**:
  - **Search**: By title or author.
  - **Filtering**: By author, minPrice, maxPrice.
  - **Sorting**: By any field (asc/desc).
  - **Pagination**: `page` and `limit`.
- **Architecture**:
  - **Controller Layer**: Handles HTTP requests and responses.
  - **Service Layer**: Contains business logic and validation.
  - **Repository Layer**: Handles data access (in-memory storage simulating a DB).
- **Validation**: Manual validation for required fields.
- **Error Handling**: Global error handling middleware with custom `AppError` class.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Tooling**: ts-node-dev, tsc

## 📂 Project Structure

```
src/
├── controllers/    # Request handlers (OOP Classes)
├── services/       # Business logic (OOP Classes)
├── repositories/   # Data access layer (OOP Classes)
├── models/         # Data models/Interfaces
├── routes/         # Express routes definitions
├── middlewares/    # Error handling, Validation
├── utils/          # Helper classes (AppError)
├── app.ts          # App configuration
└── server.ts       # Entry point
```

## 🔧 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Development Mode**
   ```bash
   npm run dev
   ```

3. **Build & Run**
   ```bash
   npm run build
   npm start
   ```

### Authentication

This API uses Bearer Token authentication for write operations (`POST`, `PATCH`, `DELETE`).
**Header**: `Authorization: Bearer secret-token-123`

## 🔗 API Endpoints

### Books

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/books` | Get all books | No |
| **GET** | `/api/v1/books/:id` | Get a single book | No |
| **POST** | `/api/v1/books` | Create a new book | **Yes** |
| **PATCH** | `/api/v1/books/:id` | Update a book | **Yes** |
| **DELETE** | `/api/v1/books/:id` | Delete a book | **Yes** |

### Query Parameters (GET /books)

- `search`: Search by title or author (e.g., `?search=gatsby`)
- `author`: Filter by exact author (e.g., `?author=Orwell`)
- `sortBy`: Field to sort by (e.g., `?sortBy=price`)
- `sortOrder`: `asc` or `desc` (e.g., `?sortOrder=desc`)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `minPrice` / `maxPrice`: Filter by price range

## 📝 Example Requests

### Create a Book
```bash
curl -X POST http://localhost:8080/api/v1/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "price": 30.00,
    "stock": 10,
    "publishedYear": 2008
  }'
```

### Search & Sort
```bash
GET http://localhost:8080/api/v1/books?search=Code&sortBy=price&sortOrder=desc
```

