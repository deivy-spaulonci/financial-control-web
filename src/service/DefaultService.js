export default class DefaultService {
    root = 'http://10.10.10.35:8083/api/v1/';
    //root = 'http://localhost:8083/api/v1/'

    async get(url) {
        return fetch(this.root+url).then(res => res.json());
    }

    async post(url, data){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }

        const response = await fetch(this.root+url, requestOptions);
        return await response.json();
    }

    getUlrBase(){
        return this.root;
    }
}