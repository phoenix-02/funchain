# Blockchain Backend (WIP)

This is a simple blockchain backend implementation using Node.js, Express.js, Mongoose, and WebSockets.

## Features

- Store and retrieve blocks in a MongoDB database.
- RESTful API for managing blocks.
- WebSocket events for real-time communication.
- Modular architecture for scalability.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (version 18 or higher)
- MongoDB (either locally or a MongoDB Atlas account)

## Getting Started

1. Clone the repository:
```shell
   git clone https://github.com/phoenix-02/funchain.git
   ```

2. Install dependencies:

   Navigate to the project directory:

   cd blockchain-backend

   Then install the dependencies:
```shell
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

- `GET /api/blockchain/blocks` - Retrieve all blocks.
- `POST /api/blockchain/blocks` - Create a new block.

## WebSocket Events

The server provides the following WebSocket events for real-time communication:

- `create_block` - Create a new block. To use this event, emit a 'create_block' event from your client without any additional parameters.the server will send updates back to the client using the same event name.
- `get_blocks` - Retrieve all blocks. To use this event, emit a 'get_blocks' event from your client without any additional parameters.the server will send updates back to the client using the same event name.

Refer to the source code for more details on the routes, controllers, and WebSocket events.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
