import { Message } from 'discord.js';
import { Service } from 'typedi';
import { Action } from '../action';

@Service()
export class ModerationActions {
  public readonly actions: ReadonlyArray<Action> = [
    {
      condition({ content }: Readonly<Message>): boolean {
        return !!content.match(/^!kick /);
      },
      async action(): Promise<void> {
        console.log("kick"); // tslint:disable-line
      },
    },
  ];
}
