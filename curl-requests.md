# Curl Requests for Testing the Custom HTTP Server

This document contains the `curl` requests for various scenarios to test your custom HTTP server.

---

## 1. Basic GET request to `/` (Home Route)

This request tests the basic home route (`/`).

```bash
curl -i http://localhost:4221/

HTTP/1.1 200 OK
<other headers>


curl -i http://localhost:4221/echo/HelloWorld

HTTP/1.1 200 OK
Content-Type: text/plain

HelloWorld
----------------------------------------------------------------------------------------------------

curl -i -H "Accept-Encoding: gzip" http://localhost:4221/echo/HelloWorld
HTTP/1.1 200 OK
Content-Encoding: gzip
Content-Type: text/plain
Content-Length: <length>

<gzip-compressed-content>
----------------------------------------------------------------------------------------------------
curl -i -H "User-Agent: CustomAgent/1.0" http://localhost:4221/user-agent

HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: <length>
<other headers>

CustomAgent/1.0
----------------------------------------------------------------------------------------------------

curl -i http://localhost:4221/user-agent

HTTP/1.1 404 Not Found
----------------------------------------------------------------------------------------------------

curl -i http://localhost:4221/files/hello.txt

HTTP/1.1 200 OK
Content-Type: application/octet-stream
Content-Length: <length>

<file-content>
----------------------------------------------------------------------------------------------------

curl -i http://localhost:4221/files/nonexistent-file.txt

HTTP/1.1 404 Not Found
----------------------------------------------------------------------------------------------------

curl -i -X POST -d "Hello, World!" http://localhost:4221/files/hello.txt

HTTP/1.1 201 Created
----------------------------------------------------------------------------------------------------

curl -i -X POST -F "file=@/path/to/local/file.txt" http://localhost:4221/files/uploaded-file.txt

HTTP/1.1 201 Created
----------------------------------------------------------------------------------------------------

curl -i -X POST http://localhost:4221/files/emptyfile.txt

HTTP/1.1 405 Method Not Allowed
----------------------------------------------------------------------------------------------------

curl -i http://localhost:4221/invalid-path

HTTP/1.1 404 Not Found
----------------------------------------------------------------------------------------------------

curl -i -H "Accept-Encoding: gzip" http://localhost:4221/echo/HelloGzip

HTTP/1.1 200 OK
Content-Encoding: gzip
Content-Type: text/plain
Content-Length: <length>

<gzip-compressed-content>

----------------------------------------------------------------------------------------------------










