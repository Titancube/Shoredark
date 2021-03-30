import { Command, CommandMessage, Infos } from "@typeit/discord";
import * as path from "path";

export abstract class Crash {
  @Command("재상 :variation")
  @Infos({
    command: `재상`,
    detail: "`$재상 <variation>`",
    description:
      "* 우리의 영웅 박재상씨가 현명한 단어를 내뱉습니다\n* <variation> : `옵, 여자, 어`",
  })
  private async crash(command: CommandMessage): Promise<void> {
    const { variation } = command.args;

    const vc = command.member.voice.channel;
    if (vc) {
      const r = await vc.join();
      const dispatcher = r.play(
        path.join(__dirname, `../assets/audio/${this.getVariation(variation)}`)
      );

      dispatcher.setVolume(0.75);

      dispatcher
        .on("finish", () => {
          dispatcher.destroy();
          command.guild.me.voice.channel.leave();
        })
        .on("error", (e) => {
          console.log(e);
        });
    } else {
      command.channel.send("보이스 채널에 입장해주세요");
    }
  }

  private getVariation(v: string) {
    switch (v) {
      default:
      case "옵":
        return "op.mp3";
      case "여자":
        return "girl.mp3";
      case "어":
        return "uh.mp3";
    }
  }
}