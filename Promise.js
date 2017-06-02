class Promise {
    constructor(fn) {
        let resolve = (data) => {
            this.onSuccess(data);
        };
        let reject = (err) => {
            this.onFail(err);
        };
        fn(resolve, reject);
    }

    // 成功的回调，失败的回调
    then(onSuccess, onFail) {
        this.onSuccess = onSuccess;
        this.onFail = onFail;
    }
}