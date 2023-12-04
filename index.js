import { Telegraf } from "telegraf";
import { config } from "dotenv";
import getUsers from "./helpers/getUsers.js";

config()

const token = process.env.TOKEN
const bot = new Telegraf(token)


bot.start(async (ctx) => {
    try {
        ctx.replyWithHTML('<b>Начинаем поиск новых контрагентов...</b>')

        getUsers()

    } catch (error) {

    }
})



const start = () => {
    bot.launch()
    console.log('Бот запущен');
}
start()
