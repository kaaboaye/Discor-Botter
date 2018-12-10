import { Service } from "typedi";
import { Message } from "discord.js";
import { Action } from "./action";
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
    const activeActions = this.actions
      .filter(({ condition }) => condition(message))
      .map(a => a.action(message));

    if (activeActions.length === 0) {
      console.log("bad command");
      return;
    }

    await Promise.all(activeActions);
  }
}
