import HttpClient from "../../../../lib/ts/io/HttpClient";

export const githubMainUrl = 'https://github.com';
export const githubApiUrl = 'https://api.github.com';

export default class Github {

    client: HttpClient;

    constructor(baseUrl, accessToken: string = '') {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        if (accessToken) {
            headers['Authorization'] = `token ${accessToken}`;
        }
        this.client = new HttpClient(baseUrl, headers);
    }

    async getAccessToken(code: string, clientId: string, clientSecret: string) {

        const {data} = await this.client.post('/login/oauth/access_token', {
            client_id: clientId,
            client_secret: clientSecret,
            code
        });

       return data.access_token;
    }

    async getUser() {
        try {
            let {data} = await this.client.get('/user');
            return data;
        } catch (e) {
            console.log(e.toString(), e.response.data);
        }
        return null;
    }

    async getUserId(): Promise<number|null> {
        try {
            let {data} = await this.client.get('/user');
            return data.id;
        } catch (e) {
            console.log(e.toString(), e.response.data);
        }
        return null;
    }

    async getRepos(): Promise<[]|null> {
        try {
            let {data} = await this.client.get('/user/repos', {type: 'owner'});
            return data.id;
        } catch (e) {
            console.log(e.toString(), e.response.data);
        }
        return null;
    }
}