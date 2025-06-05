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

The application will be available at `http://localhost:3000/`. From there you can add, edit or remove stream entries which will be stored in `streams.db`.
