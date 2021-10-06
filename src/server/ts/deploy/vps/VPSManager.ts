import HttpClient from "../../../../lib/ts/io/HttpClient";
import {Simulate} from "react-dom/test-utils";
import drop = Simulate.drop;
import {networkInterfaces} from "os";
import {VPS} from "../types/DeployTypes";

export default class VPSManager {

    client: HttpClient;

    constructor() {
        const token = '5130e4f2fd697d64712d2fc5c0d567b496d53974f614f6bdb2f5d9b8206884e1';
        const baseUrl = 'https://api.digitalocean.com/v2';
        this.client = new HttpClient(baseUrl, token)

        /*let fnList = {
            images: async() => {
                let {data} = await client.get(`${baseUrl}/images`, {}, headers)
                console.log(data)
            },
            regions: async() => {
                let {data} = await client.get(`${baseUrl}/regions`, {}, headers)
                console.log(data.regions);
            },
            sizes: async() => {
                let {data} = await client.get(`${baseUrl}/sizes`, {}, headers)
                console.log(data);
            },
            sshKeys: async() => {
                let {data} = await client.get(`${baseUrl}/account/keys`, {}, headers)
                console.log(data)
            },
            droplets: async () => {
                let {data} = await client.get(`${baseUrl}/droplets`, {}, headers)
                console.log(data)
            },
        }*/
    }

    async images(type: string) {

        let images = [];

        for (let i = 0; i < 12; i++) {
            const {data} = await this.client.get('/images', {type, page: i});
            data.images.forEach((image) => {
                images.push(image.slug + ' - ' + image.status);

                if (!image.slug) {
                    console.log(image);
                    return;
                }
                if (image.slug.indexOf('docker') !== -1) {
                    console.log(image.slug);
                }
            });
        }

        return images;
    }

    async regions() {
        const {data} = await this.client.get('/regions');
        return data.regions;
    }

    async getDropletInfo(dropletId: number) {
        const {data: {droplet}} = await this.client.get(`/droplets/${dropletId}`);
        return droplet;
    }

    async droplets() {
        return await this.client.get('/droplets');
    }

    async createDroplet(name: string) {
        const {data} = await this.client.post('/droplets', {
            name: name,
            region: 'ams3',
            size: 's-1vcpu-1gb',
            ssh_keys: [25974858],
            image: 'docker-20-04'
            //image: 'ubuntu-21-04-x64'
        });
        return data;
    }

    async deleteVPS(dropletId: number) {
        await this.client.delete(`/droplets/${dropletId}`);
    }

    async createVPS(name: string): Promise<VPS> {
        //обработка неудачных запросов
        //сервисные операции, поднятие стейджа

        return new Promise(async (resolve, reject) => {

            const dropletCreateResp = await this.createDroplet(name);
            const dropletId = dropletCreateResp.droplet.id;

            let checking = setInterval(async () => {

                const droplet = await this.getDropletInfo(dropletId);
                console.log(`droplet: [${droplet.id}] status: [${droplet.status}]`);

                if (droplet.status === 'active') {
                    clearInterval(checking);

                    let ip = '';
                    droplet.networks.v4.forEach((networkItem) => {
                        if (networkItem.type === 'public') ip = networkItem.ip_address;
                    });

                    resolve({id: dropletId, ip});
                }
            }, 5000);

        })
    }
}