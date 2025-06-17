# Custom TCP-based HTTP Server

This is a simple custom HTTP server built using Node.js that supports basic HTTP methods, including GET and POST. The server handles requests like echoing data, serving files, and compressing content using gzip.

## Features
- **GET /**: Returns a simple "200 OK" response.
- **GET /echo/{content}**: Returns the content from the URL.
- **GET /user-agent**: Returns the `User-Agent` from the request headers.
- **GET /files/{filename}**: Returns the content of a file from the specified directory.
- **POST /files/{filename}**: Accepts file uploads and stores them in the specified directory.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/custom-http-server.git
   cd custom-http-server
   ```

## Project Structure

- **server.js**: The main entry point for the server application.
- **routes/**: Contains modules for handling specific API routes.
  - `echo.js`: Handles `/echo/...` requests.
  - `files.js`: Handles `/files/...` requests (GET and POST).
  - `userAgent.js`: Handles `/user-agent` requests.
- **utils/**: Contains utility functions used by the server.
  - `fileUtils.js`: Helper functions for file operations.
  - `gzipUtils.js`: Helper functions for gzip compression.
- **config/**: Contains configuration files for the server.
  - `config.json`: Defines server settings like port, host, and file directory.
- **files/**: The default directory for storing and serving files (e.g., `hello.txt`).
- **README.md**: This file, providing information about the project.
- **curl-requests.md**: Examples of curl commands for testing the API.
- **package.json**: Defines project metadata and dependencies.
- **package-lock.json**: Records the exact versions of dependencies.
- **.gitignore**: Specifies intentionally untracked files that Git should ignore.

## Running the Server

1.  Install dependencies (if any - assuming standard Node.js modules for now):
    ```bash
    # If you have a package.json, you might run:
    # npm install
    ```
2.  Start the server:
    ```bash
    node server.js
    ```
    The server will start on the host and port specified in `config/config.json` (default: `http://localhost:4221`).

## API Endpoints

The server exposes the following API endpoints:

### GET /
- **Description**: Returns a simple "200 OK" response.
- **Example**:
  ```bash
  curl -i http://localhost:4221/
  ```
- **Expected Response**:
  ```
  HTTP/1.1 200 OK
  ...
  ```

### GET /echo/{content}
- **Description**: Returns the content provided in the URL path. Supports gzip compression if the `Accept-Encoding: gzip` header is present.
- **Example**:
  ```bash
  curl -i http://localhost:4221/echo/HelloWorld
  ```
- **Expected Response**:
  ```
  HTTP/1.1 200 OK
  Content-Type: text/plain
  Content-Length: 10

  HelloWorld
  ```
- **With gzip**:
  ```bash
  curl -i -H "Accept-Encoding: gzip" http://localhost:4221/echo/HelloWorld
  ```
- **Expected Response (gzip)**:
  ```
  HTTP/1.1 200 OK
  Content-Encoding: gzip
  Content-Type: text/plain
  Content-Length: <length>

  <gzip-compressed-content>
  ```

### GET /user-agent
- **Description**: Returns the `User-Agent` header from the request.
- **Example**:
  ```bash
  curl -i -H "User-Agent: CustomAgent/1.0" http://localhost:4221/user-agent
  ```
- **Expected Response**:
  ```
  HTTP/1.1 200 OK
  Content-Type: text/plain
  Content-Length: <length>

  CustomAgent/1.0
  ```

### GET /files/{filename}
- **Description**: Returns the content of the specified file from the directory defined in the server configuration (default: `./files`).
- **Example**:
  ```bash
  curl -i http://localhost:4221/files/hello.txt
  ```
- **Expected Response (file exists)**:
  ```
  HTTP/1.1 200 OK
  Content-Type: application/octet-stream
  Content-Length: <length>

  <file-content>
  ```
- **Expected Response (file does not exist)**:
  ```
  HTTP/1.1 404 Not Found
  ```

### POST /files/{filename}
- **Description**: Uploads a file to the server. The file is stored in the directory defined in the server configuration.
- **Example (raw data)**:
  ```bash
  curl -i -X POST -d "Hello, World!" http://localhost:4221/files/hello.txt
  ```
- **Expected Response**:
  ```
  HTTP/1.1 201 Created
  ```
- **Example (form data)**:
  ```bash
  # Ensure you have a local file (e.g., my-local-file.txt) to upload
  # curl -i -X POST -F "file=@/path/to/local/my-local-file.txt" http://localhost:4221/files/uploaded-file.txt
  ```
  *(Note: The example from curl-requests.md for form data might need adjustment based on server implementation details not fully present here, but the raw data POST is straightforward.)*


## Configuration Options

The server can be configured via the `config/config.json` file.

```json
{
  "port": 4221,
  "host": "localhost",
  "fileDirectory": "./files"
}
```

- **`port`**: The port number the server will listen on. (Default: `4221`)
- **`host`**: The host address the server will bind to. (Default: `"localhost"`)
- **`fileDirectory`**: The directory where files are stored and served from. (Default: `"./files"`)
