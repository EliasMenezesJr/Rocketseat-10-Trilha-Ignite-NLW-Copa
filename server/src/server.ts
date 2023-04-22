import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, { origin: true });

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  fastify.get("/users/count", async () => {
    const users = await prisma.user.count();

    return { users };
  });

  fastify.get("/guesses/count", async () => {
    const guesses = await prisma.guess.count();

    return { guesses };
  });

  fastify.post("/pools", async (req, res) => {
    const createPoolBoby = z.object({
      title: z.string(),
    })
    const { title } = createPoolBoby.parse(req.body);

    const generateCode = new ShortUniqueId({ length: 6})
    const code =String(generateCode()).toLocaleUpperCase()

    await prisma.pool.create({
      data: {
        title,
        code: code
      }
    })

    return res.status(201).send({code})
  });
  await fastify.listen({ port: 3333 /*host: '0.0.0.0'*/ });
}

bootstrap();
