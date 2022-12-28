import {listAllDnsRecord} from "./list-all-dns-record.js";
import {createDnsRecord} from "./create-dns-record.js";

const isIPV4 = (s) => /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(s);
const isIPV6 = (s) => /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/.test(s);

export const updateCloudFlareDNSRecord = async (client, zone, record, ip) => {
    const allRecordsInDomain = await listAllDnsRecord(client, zone);
    let recordType = 'CNAME';
    recordType = isIPV4(ip) && "A" || recordType;
    recordType = isIPV6(ip) && "AAAA" || recordType;

    const currentDomainRecord = allRecordsInDomain.filter(item => {
        return item.name === record && item.type === recordType
    });

    if (currentDomainRecord.length === 0) {
        return await createDnsRecord(client, zone, record, recordType, ip);
    }

    return client.patch(`zones/${zone}/dns_records/${currentDomainRecord.pop()['id']}`, {"content": ip}).then(rs => rs.data);
}
