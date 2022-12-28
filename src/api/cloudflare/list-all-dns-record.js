export const listAllDnsRecord = async (client, zone) => {
    return client.get(`zones/${zone}/dns_records`).then(rs => rs?.data?.result)
}