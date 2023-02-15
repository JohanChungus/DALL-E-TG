# This is OpenAI's DALL-E telegram bot, which can generate images based on text requests.
## Installation and use
1. Slant the repository with the command:
```bash
git clone https://github.com/<your-github-username>/<your-repository-name>.git
```
2. Install the necessary dependencies with the command:
```bash
npm install
```
3. Create a secrets.json file in the project root directory and fill it with your API keys:
```json
{
  "openai": {
    "apiKey": "your-api-key"
  },
  "telegram": {
    "accessToken": "your-access-token"
  }
}
```
4. Run the bot with the command:
```bash
npm start
```
## How to use the bot
1. Find the bot @<your-bot-name> on Telegram and start a dialog.
2. Send a request describing the image you would like to create.
3. The bot will send you a message with the image created based on your request.
