# Cloudflare DNS Updater
### Introduction
> A helper tool to update DNS records automatically to CloudFlare when server is rebooted and WANIP was changed.
>
> The helper try to call `https://ifconfig.me/` to get the WANIP and update to Cloudflare via RestAPI.

### Installation
#### Prerequisite
> NodeJS was installed on the machine. The execution machine must be Linux.

1. Prepare Cloudflare Access Token with `write` permission to the zone you want to auto update.
2. Configure the `.env` file following the configuration keys in `.env.sample`.
3. Execute `yarn` or `npm install` to install dependencies. 
4. Execute `./src/cli/install-crontab.sh` to install the cron entries.

### Tools are used:
1. NodeJS: v16.16.0 
2. Axios : v1.2.1
