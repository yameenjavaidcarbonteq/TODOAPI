import { IncomingWebhook, IncomingWebhookResult } from '@slack/webhook';
import { slack } from "@config";
import { logger } from "@logger";

interface Message {
  [key: string]: string | number | Record<string, string | number>;
}

export class Slack {
    private webhook?: IncomingWebhook;

    constructor() {
        this.init();
    }

    private async init() {
        const slackUrl: string | undefined = slack.webhook;
        if (slackUrl) {
            this.webhook = new IncomingWebhook(slackUrl);
        }
    }   

    private async send(body: any): Promise<void> {
        try {
        const response: IncomingWebhookResult | undefined = await this.webhook?.send(body);
        if (response?.text !== "ok") {
            logger.log(`info`,`[slack] error on send slack message`);
        }
        } catch (error) {
        logger.log(`error`,`[slack] ${error}`);
        }
    }

    private buildInfo(message: Message): { blocks: Array<{ type: string, text: { type: string, text: string } }> } {
        let text = "";
        for (const [key, value] of Object.entries(message)) {
        if (typeof value === "object") {
            text += `*${key}:*\n`;
            for (const [subkey, subvalue] of Object.entries(value)) {
            text += `  • *${subkey}:* ${subvalue}\n`;
            }
        } else {
            text += `*${key}:* ${value}\n`;
        }
        }

        return {
        blocks: [
            {
            type: "section",
            text: {
                type: "mrkdwn",
                text,
            },
            },
        ],
        };
    }

    private buildError(message: string, error?: Error): { blocks: Array<{ type: string, text: { type: string, text: string } }> } {
        const body = {
        blocks: [
            {
            type: "section",
            text: { type: "mrkdwn", text: `:bangbang: :robot_face: ${message}` },
            },
        ],
        };

        if (error !== undefined) {
        body.blocks.push({
            type: "section",
            text: { type: "mrkdwn", text: `\`\`\`${error.stack}\`\`\`` },
        });
        }

        return body;
    }

    public async info(message: Message): Promise<void> {
        const body = this.buildInfo(message);
        try{
            await this.send(body);
        }
        catch(error){
            console.log(error);
        }
    }

    public async error(message: string, error?: Error): Promise<void> {
        const body = this.buildError(message, error);
        await this.send(body);
    }
}

