import axios from "axios"

const getFirmAge = async id => {
    let result
    try {
        const url = `https://ati.su/gw/atiwebroot/public/v1/api/passport/GetFirmPassportPoints/${id}`

        result = await axios.get(url)
        result = result.data.find(rec => rec.type == 3).additionalInfo.diffDays
        console.log(result);

        return parseInt(result)
    } catch (e) {
        console.log('err in age firm', e)
        return false
    }

}


export default getFirmAge