import 'reflect-metadata';
import Container from 'typedi';
import { DiscordRouter } from './discord/router';

const router = Container.get(DiscordRouter);

(async () => {
  await router.handleMessage({ content: '!ping' } as any);
  await router.handleMessage({ content: 'kupa' } as any);
  await router.handleMessage({ content: '!kick edona' } as any);
})()
  .then()
  .catch();
