import {CLI_WAN_IP_CHECK_ERROR_CODE} from "../../constant.js";

export const getWANIP = async (client) => {
    try {
        return await client.get('/').then(rs => rs.data);
    } catch (e) {
        console.error(e.message);
        console.warn('Error during retrieve WAN IP.');
        process.exit(CLI_WAN_IP_CHECK_ERROR_CODE)
    }
}