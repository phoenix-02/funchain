# Blockchain Backend

This is a simple blockchain backend implementation using Node.js, Express.js, and Mongoose.

## Features

- Store and retrieve blocks in a MongoDB database
- RESTful API for managing blocks
- Modular architecture for scalability

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (version 18 or higher)
- MongoDB (either locally or a MongoDB Atlas account)

## Getting Started

1. Clone the repository:

   ```shell
   git clone https://github.com/phoenix-02/funchain.git

2. Install dependencies:

   ```shell
   cd blockchain-backend
   npm install
   ```

3. Configure MongoDB:

    - Set the `ME_CONFIG_MONGODB_SERVER` or `ME_CONFIG_MONGODB_URL` environment variable to your MongoDB connection string.

4. Start the server:

   ```shell
   npm start
   ```

   The server should now be running on `http://localhost:3000`.

## API Endpoints

The following API endpoints are available:

- `GET /api/blockchain/blocks` - Retrieve all blocks
- `POST /api/blockchain/blocks` - Create a new block

Refer to the source code for more details on the routes and controllers.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```
