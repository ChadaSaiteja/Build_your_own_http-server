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
