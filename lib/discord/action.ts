import { Message } from 'discord.js';

export interface Action {
  readonly condition: (message: Readonly<Message>) => boolean;
  readonly action: (message: Readonly<Message>) => Promise<void>;
}
