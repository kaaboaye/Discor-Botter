import { Message } from 'discord.js';

export type ActionConditionResult = Promise<boolean> | boolean;

export type ActionCondition = (
  message: Readonly<Message>,
) => ActionConditionResult;

export type ActionAction = (message: Readonly<Message>) => Promise<void>;

export interface Action {
  readonly condition: ActionCondition;
  readonly action: ActionAction;
}
