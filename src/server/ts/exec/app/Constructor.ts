let req = {
    get: async(url: string) => {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = () => {
                resolve(xhr.responseText);
            };
            xhr.send();
        });
    },
    post: async(url: string, data: object) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = () => {
            xhr.responseText;
        };
        xhr.send(JSON.stringify(data));
    }
}

console.log(req);