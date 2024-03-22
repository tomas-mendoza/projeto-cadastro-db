import app from './app';

class Server {
  private port: number = 8000;

  constructor() {

  }

  connect() {
    app.listen(this.port, () => console.log(`The server is running on http://localhost:${this.port}`));
  }
}

const server = new Server();
server.connect();
