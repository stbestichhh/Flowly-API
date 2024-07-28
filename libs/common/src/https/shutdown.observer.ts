import { OnApplicationShutdown } from '@nestjs/common';
import * as http from 'http';

export class ShutdownObserver implements OnApplicationShutdown {
  private httpServers: http.Server[] = [];

  public addServer(server: http.Server): void {
    this.httpServers.push(server);
  }

  public async onApplicationShutdown() {
    await Promise.all(
      this.httpServers.map((server) => {
        new Promise((resolve, reject) => {
          server.close((error) => {
            if (error) {
              reject(error);
            }
            resolve(null);
          });
        });
      }),
    );
  }
}
