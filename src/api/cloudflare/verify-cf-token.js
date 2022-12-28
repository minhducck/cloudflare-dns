import {CLI_CLOUDFLARE_ACCESS_KEY_ERROR_CODE} from "../../constant.js";

export const verifyCFToken = async (cloudFlareClient) => {
    try {
        return await cloudFlareClient.get('/user/tokens/verify').then(rs => rs.data);
    } catch (e) {
        console.error(e.message);
        console.warn("Please verify your Cloudflare credentials.")
        process.exit(CLI_CLOUDFLARE_ACCESS_KEY_ERROR_CODE);
    }
}