import {
  createBot,
  createFlow,
  createProvider,
  MemoryDB,
} from '@bot-whatsapp/bot';
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys';

const main = async () => {
  const provider = createProvider(BaileysProvider);

  provider.initHttpServer(3001);

  provider.http.server.post(
    '/lead',
    handleCtx(async (bot, req, res) => {
      const phone = req.body.phone;
      const message = req.body.message;
      await bot.sendMessage(phone, message, {});
    })
  );

  await createBot({
    flow: createFlow([]),
    database: new MemoryDB(),
    provider,
  });
};

main();
