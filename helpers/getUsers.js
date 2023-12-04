import axios from "axios";
import { config } from "dotenv";
import fs from 'fs'
import getFirmAge from "./getFirmAge.js";

config()

export default async function () {
    try {

        const result = []

        for (let i = 0; i <= 900; i += 100) {
            let users = []

            let response = await axios.post(`https://ati.su/webapi/extendedsearch/v1/firms/advanced?offset=${i}&limit=100`, {
                firm_name: null,
                alias_id: null,
                from_deletes: false,
                firm_type_id: 3
            }, {
                headers: {
                    Cookie: process.env.COOKIE,
                }
            })

            users.push(response.data.firms)
            // console.log(response.data.firms)

            const usersFiltered = users.filter((user) => user.rating === 0)

            for (let i = 0; i < usersFiltered.length; i++) {
                const element = usersFiltered[i];

                const firmAge = await getFirmAge(element.alias_id)
                console.log(firmAge);

                if (firmAge < 4) {
                    result.push(element)
                }
            }
        }

        const jsonData = JSON.stringify({ users: result });
        fs.writeFile('output.json', jsonData, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Данные успешно записаны в файл!');
        });

        console.log(result);


    } catch (error) {
        console.log(error);
        return false
    }
}