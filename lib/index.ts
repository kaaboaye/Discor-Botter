import "reflect-metadata";
import Container from "typedi";
import { DiscordRouter } from "./discord/router";

const router = Container.get(DiscordRouter);

(async () => {
  router.handleMessage({ content: "!ping" } as any);
  router.handleMessage({ content: "kupa" } as any);
  router.handleMessage({ content: "!kick edona" } as any);
})();