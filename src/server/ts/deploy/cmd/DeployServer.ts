import VPSManager from "../vps/VPSManager";
import Functions from "../../../../lib/ts/Functions";
import SSH from "../../io/ssh/SSH";
import {VPS} from "../types/DeployTypes";

export default class DeployServer {

    async run() {
        const startTs = Functions.unixTs();
        const vps = await (new VPSManager).createVPS('anyx');
        console.log(vps, `VPS ready after [${Functions.unixTs() - startTs}] seconds.`);
        this.installDependencies(vps);
    }

    async sshConnectAttempt(vps: VPS): Promise<SSH> {

        const ssh = new SSH({
            host: vps.ip, //vps.ip,
            username: 'root',
            privateKey: '/home/any/.ssh/id_rsa',
            options: {
                cwd: '/root', stream: 'stdout'
            },
        });
        await ssh.connect(); console.log('connect');

        return ssh;
    }

    async sshConnect(vps: VPS): Promise<SSH> {

        return new Promise(async (resolve, reject) => {

            //let attempts = {total: 0, limit: 5};
            const connecting = setInterval(async () => {
                try {
                    const ssh = await this.sshConnectAttempt(vps);
                    clearInterval(connecting);
                    resolve(ssh);
                } catch (e) {
                    console.log(Object.keys(e));
                    console.log('SSH connect error:', e.toString());
                }
            }, 8000);

        });
    }

    async installDependencies(vps) {

        const ssh = await this.sshConnect(vps);
        try {
            await ssh.exec('apt-get update && apt-get install -y nginx');
            await ssh.exec('ssh-keygen -t rsa -b 4096 -N "" -f ~/.ssh/id_rsa -C "any@example.com"');
            await ssh.exec('ufw allow 80');
            await ssh.exec('snap install --classic certbot && ln -s /snap/bin/certbot /usr/bin/certbot');
            await ssh.exec('snap set certbot trust-plugin-with-root=ok');
            await ssh.exec('snap install certbot-dns-cloudflare');

            //stop wdata

            //await ssh.exec('git clone git@github.com:naliferov/util.git deploy');
            //await ssh.exec('git clone git@github.com:naliferov/util.git dirA');
            //await ssh.exec('git clone git@github.com:naliferov/util.git dirB');

            // mv /etc/nginx/nginx-dev.conf /etc/nginx/nginx_bak.conf
            // ln -s ~/deploy/nginx-dev.conf /etc/nginx/nginx-dev.conf

            //await ssh.exec(`docker run --name dirA -v $PWD:/app -w /app node:16-alpine x.js runApp`);
            //await ssh.exec('git clone https://github.com/naliferov/reactor.git dirB');
        } catch (e) {
            console.log(e.toString())
        }
        await ssh.disconnect();
    }
}