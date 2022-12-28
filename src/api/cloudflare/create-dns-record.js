export async function createDnsRecord(client, zone, record, recordType, ip) {
    return client.post(`zones/${zone}/dns_records`,{
        "comment": "DNS Records update from tool.",
        "content": ip,
        "type": recordType,
        "name": record,
        "proxied": true,
        "ttl": 300
    }).then(result => result.data)
}