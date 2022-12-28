import {CONFIGURATION} from "./config.js";
import {createClient} from "./client.js";
import {CLI_CLOUDFLARE_ACCESS_KEY_ERROR_CODE, CLI_SUCCESS_CODE} from "./constant.js";
import {verifyCFToken} from "./api/cloudflare/verify-cf-token.js";
import {getWANIP} from "./api/ifconfig.me/get-wan-ip.js";
import {listAllDnsRecord} from "./api/cloudflare/list-all-dns-record.js";
import {updateCloudFlareDNSRecord} from "./api/cloudflare/update-cf-dns-record.js";

const wanIPClient = createClient({
    baseURL: CONFIGURATION['CHECK_WAN_IP_URL']
});

const cloudFlareClient = createClient({
    baseURL: CONFIGURATION['CLOUDFLARE_API_ENDPOINT'],
    ACCESS_KEY: CONFIGURATION['CLOUDFLARE_ACCESS_KEY']
});

const main = async () => {
    await verifyCFToken(cloudFlareClient)
    const wanIP = await getWANIP(wanIPClient);
    try {
        await updateCloudFlareDNSRecord(
            cloudFlareClient,
            CONFIGURATION['CLOUDFLARE_ZONE'],
            CONFIGURATION['CLOUDFLARE_DOMAIN_RECORDS'],
            wanIP
        )
    } catch (e) {
        console.error(e.message);
        process.exit(CLI_CLOUDFLARE_ACCESS_KEY_ERROR_CODE);
    }

    console.log(`Update DNS ${CONFIGURATION['CLOUDFLARE_DOMAIN_RECORDS']} to ${wanIP} successfully.`)
    process.exit(CLI_SUCCESS_CODE);
}

main();