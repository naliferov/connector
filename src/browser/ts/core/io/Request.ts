export default class Request {

    async get(url: string): Promise<string|null> {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = () => {
                resolve(xhr.responseText);
            };
            xhr.send();
        });
    }

    post(url: string, data: object) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = () => {
            xhr.responseText;
        };
        xhr.send(JSON.stringify(data));
    }
}