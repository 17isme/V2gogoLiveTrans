# V2gogoLiveTrans

This project captures RTSP streams and converts them to GIF images. A simple web interface allows management of stream addresses stored in an SQLite database.

## Usage

Install dependencies (requires Node.js and npm):

```bash
npm install
```

Start the web interface:

```bash
npm start
```

The application will automatically open `http://localhost:3000/` in your browser and begin capturing streams. From there you can add, edit or remove stream entries which will be stored in `data/streams.db`.

## Repository Structure

- `src/` contains application source code and views
- `data/` stores configuration files and the SQLite database
- `bin/` holds the `qshell` binary used for uploads
