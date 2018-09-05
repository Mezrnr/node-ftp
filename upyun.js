let upyun = require('upyun');
let fs = require('fs');
let path = require('path');

let {
    localPathConfig,
    upyunConfig
} = require('./config.js');

class Upyun {
    constructor() {
        this.client = this.init();
    }

    init() {
        let service = new upyun.Service(...upyunConfig)
        let client = new upyun.Client(service);
        return client;
    }

    list(remotePath, options = {}) {
        return this.client
            .listDir(remotePath, options)
            .then(lists => {
                console.log('list file:', lists);
                return Promise.resolve(lists)
            })
            .catch(error => console.log('list error:', error))
    }

    put(remotePath, localFile) {
        return this.client
            .putFile(path.posix.join(remotePath , localFile), fs.readFileSync(localFile).toString())
            .catch(error => console.log('list error:', error))
    }

    del(remotePath) {
        this.client
            .deleteFile(remotePath)
            .then((res) => {
                console.log('delete File:', res)
            })
            .catch(error => console.log('delete error:', error));
    }

    had(remotePath) {
        return this.client
            .headFile(remotePath)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(error => console.log('had error:', error))
    }

}

let upyunClient = new Upyun();

// upyunClient.list('/sass');
// upyunClient.put('/sass/','123.txt').then(res=>{
//         console.log(res);
//     });
    
upyunClient.had('/static/css/upload/upload_203375b9deeeec7d.css').then(res=>{
    console.log(res);
});

module.exports = upyunClient;