const TelegramBot = require("node-telegram-bot-api");
const secrets = require("./secrets.json");
const request = require("request-promise-native");

// Авторизуемся с помощью ключей API
const bot = new TelegramBot(secrets.telegram.accessToken, { polling: true });

// Функция-обработчик команды /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Привет! Я бот DALL-E от OpenAI. Чтобы получить изображение, напиши мне запрос и я его обработаю."
  );
});

// Функция-обработчик сообщений
bot.on("message", async (msg) => {
  // Получаем запрос пользователя
  const query = msg.text;

  // Если запрос начинается не с /start, обрабатываем его с помощью API DALL-E
  if (query && !query.startsWith("/start")) {
    try {
      // Отправляем индикатор ожидания пользователю
      bot.sendChatAction(msg.chat.id, "upload_photo");

      // Уведомляем пользователя, что запрос отправлен
      bot.sendMessage(msg.chat.id, "Ваш запрос отправлен и обрабатывается.");

      // Формируем запрос к API DALL-E
      const requestOptions = {
        method: "POST",
        uri: "https://api.openai.com/v1/images/generations",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secrets.openai.apiKey}`,
        },
        body: {
          model: "image-alpha-001",
          prompt: query,
          num_images: 1,
          size: "1024x1024",
        },
        json: true,
      };
      const response = await request(requestOptions);

      bot.sendMessage(msg.chat.id, "Подождите, пока я сгенерирую изображение.");
      
      // Отправляем изображение пользователю
      const image_url = response.data[0].url;

      bot.sendPhoto(msg.chat.id, image_url);
    } catch (err) {
      bot.sendMessage(
        msg.chat.id,
        "Ваш запрос был отклонен из-за нашей системы безопасности. Ваше приглашение может содержать текст, который не разрешен нашей системой безопасности."
      );
    }
  }
});
