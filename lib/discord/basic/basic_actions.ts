import { Message } from 'discord.js';
import { Service } from 'typedi';
import { Action } from '../action';

@Service()
export class BasicActions {
  public readonly actions: ReadonlyArray<Action> = [
    {
      condition({ content }: Readonly<Message>): boolean {
        return content === '!ping';
      },
      async action(): Promise<void> {
        console.log("pong"); // tslint:disable-line
      },
    },
  ];
}
