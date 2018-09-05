let upyun = require('upyun');
let fs = require('fs');
let colors = require('colors');
let queue = require('./getLocalFile');
let upyunClient = require('./upyun');
let ProgressBar = require('./progress_bar');
let pb = new ProgressBar('上传进度', 30)
let uploadCount = 0;
let uploadTotal = queue.length;
let progressCount = 1;

return;

console.time("上传时间");
queue.map((item,index) => {
    upyunClient.had('/sass/' + item).then(res => {
        if (!res) {
            // upyunClient.put('/sass/', item).then( res => {
                if (res) {
                    uploadCount++;
                    // console.log('uploadCount',uploadCount);
                }else{
                    
                }
                cd();
            // })
        } else {
            console.log('/sass/' + item);
            uploadTotal--;
            // console.log('uploadTotal',uploadTotal);
            cd();
        }
        progressCount++;
    })
})
let cd = () => {
    pb.render({completed: progressCount, total: queue.length });
    if (uploadTotal == uploadCount) {
        console.timeEnd("上传时间");
        console.log(
            '上传文件:'.green +
            ' ' + uploadTotal.toString().blue +
            ' file upload'.cyan
        );
    }
}