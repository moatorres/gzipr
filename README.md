# gzipr

`gzipr` is an Express.js server, built for a Senior Software Engineer challenge, focusing on file uploads.

## Stack

- `express` - Server framework
- `express-validator` - Input validation and sanitization
- TypeScript - Type safety and enhanced developer experience
- Docker and `pm2` - Containerization and process management
- Node streams and `busboy`: Efficient file upload handling

## Design

The project utilizes Domain-Driven Design (DDD) and SOLID principles, and blends functional and object-oriented programming. It is structured within an `nx` workspace, allowing for easy addition of new services with minimal boilerplate.

## Challenges and Decisions

`busboy` was chosen for file uploads to leverage the efficiencies of streaming, despite the added complexity, especially in error handling. These challenges were addressed using Either and Result constructs.

## Future Improvements

The current architecture is designed with potential future enhancements in mind, such as the integration of rate-limiting policies, message brokers, and additional file formats.

## Setup and Installation

Ensure that [Node.js](http://nodejs.org/) and [Yarn](https://yarnpkg.com/) are installed. Then execute the following commands:

```bash
# clone the repository
git clone https://github.com/moatorres/gzipr.git
cd gzipr

# install dependencies
yarn install

# start the server
yarn dev
```

## Usage

The application provides three main endpoints:

- `GET /status`
  Healthcheck endpoint
- `POST /upload/:filename`
  Uploads and saves files with original filenames
- `GET /download/:filename`
  Case-sensitive download of uploaded files (must include extension)

## Conclusion

`gzipr` showcases a balance between design principles and technical decisions, with a specific focus on efficient file transfering.

## Tests

#### `@gzipr/core`

```bash
Test Suites: 24 passed, 24 total
Tests:       160 passed, 160 total
Snapshots:   0 total
Time:        4.269 s
```

#### `gzipr`

```bash
Test Suites: 11 passed, 11 total
Tests:       32 passed, 32 total
Snapshots:   0 total
Time:        3.375 s, estimated 5 s
```

#### `gzipr-e2e`

```bash
Test Suites: 3 passed, 3 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.46 s, estimated 1 s
```

<sub>⚡️ Powered by **OSS** — `< >` with ☕️ by [**Moa Torres**](https://github.com/moatorres)</sub>
