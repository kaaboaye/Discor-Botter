import { Service } from "typedi";
import { Message } from "discord.js";
import {
  Action,
  ActionAction,
  ActionCondition,
  ActionConditionResult
} from "./action";
import { BasicActions } from "./basic/basic_actions";
import { ModerationActions } from "./moderation/moderation_actions";

@Service()
export class DiscordRouter {
  constructor(
    private readonly basicActions: BasicActions,
    private readonly moderationActions: ModerationActions
  ) {}

  private readonly actions: ReadonlyArray<Action> = [
    ...this.basicActions.actions,
    ...this.moderationActions.actions
  ];

  public async handleMessage(message: Readonly<Message>): Promise<void> {
    const consideredActions = this.actions.map(
      async (a): Promise<[boolean, ActionAction]> => {
        const condition = a.condition(message);
        return [
          typeof condition === "boolean" ? condition : await condition,
          a.action
        ];
      }
    );

    const takeActions = (await Promise.all(consideredActions))
      .filter(([condition]) => condition)
      .map(([_, action]) => action(message));

    if (takeActions.length === 0) {
      console.log("bad command");
      return;
    }

    await Promise.all(takeActions);
  }
}
