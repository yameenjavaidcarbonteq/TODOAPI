const { IncomingWebhook } = require('@slack/webhook');
const { slack } = require("@config");
const { logger } = require("@logger");
class Slack{
    constructor() {
      this.webhook = new IncomingWebhook(slack.webhook);
    }   
    
    async send(body)
    {
        const response = await this.webhook.send(body);
        if (response.text !== "ok") {
            logger.error("[slack] error on send slack message", false);
        }
    }


    buildInfo(message) {
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

    buildError(message, error) {
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
          text: { type: "mrkdwn", text: `\`\`\`${stacktrace}\`\`\`` },
        });
      }
  
      return body;
    }

    async info(message) {
        const body = this.buildInfo(message);
    
        try {
          await this.send(body);
        } catch (e) {
          logger.error(`[slack] ${e}`, false);
        }
    }
    
    async error(message) {
        const body = this.buildError(message);
    
        try {
          await this.send(body);
        } catch (e) {
          logger.e(`[slack] ${e}`, false);
        }
    }

}


module.exports = Slack;