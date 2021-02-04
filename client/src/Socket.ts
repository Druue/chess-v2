import WebSocket from 'isomorphic-ws';
import { WEB_SOCKET_URL } from './consts';

export class Socket {
  private static instance: WebSocket
  private constructor() {
    // Shouldn't be constructable
  }

  public static getInstance = () => {
    if (!Socket.instance) Socket.instance = new WebSocket(WEB_SOCKET_URL);

    return Socket.instance;
  }
}