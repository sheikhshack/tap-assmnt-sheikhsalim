import axios from 'axios'
const baseUrl = '/'

const createNewShort = async (shortObject) => {
    const response = await axios.post(baseUrl, shortObject)
    return response.data
}

export default { createNewShort }