import { logger } from './logger';

export function createSeatSocket(onMessage) {
  let interval;
  logger.info('Initializing mocked websocket stream');
  interval = setInterval(() => {
    onMessage({ type: 'seat_update', at: Date.now() });
  }, 4500);

  return {
    close: () => {
      clearInterval(interval);
      logger.info('Seat stream closed');
    },
  };
}
