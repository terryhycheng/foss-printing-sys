import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const saltRounds = parseInt(process.env.SALT_ROUND!);
const token_secret = process.env.JWT_SECRET!;

export const authRoutes = (app: express.Application) => {
  app.post("/api/auth", login);
  app.post("/api/register", register);
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { id: user.id, email: user.email, password: user.password },
          token_secret
        );
        res.status(200).send(token);
      } else {
        res.status(401).send({ message: "Incorrect email or password." });
      }
    } else {
      res.status(401).send({ message: "Incorrect email or password." });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hash,
      },
    });
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};
