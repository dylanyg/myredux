
let deferreds = [];
function doWhen(promise, resolved, injected) {
    let $defer;
    for (let i = 0, len = deferreds.length; i < len; i++) {
        const { defer } = deferreds[i];
        if (promise === defer) {
            $defer = deferreds[i];
        }
    }
    if ($defer) {
        $defer.resolveds.push(resolved);
        $defer.injecteds.push(injected);
    } else {
        $defer = {
            defer: promise,
            resolveds: [resolved],
            injecteds: [injected],
        };
        deferreds = deferreds.push($defer);
    }
    return $defer;
}
function handle(defer, callback) {
    return (result) => {
        // console.log("handle", defer);
        callback.call(defer.defer, result);
    };
}
export default class Promise {
    /**
     * 构造函数
     * @param {Function} asyncFn
     * receive asynchronous function that used by reject and resolve to calls
     */
    constructor(asyncFn) {
        // store defer object
        this.$defer = {};
        this.asyncFn = asyncFn;
        const self = this;

        // call asynchronous function after the current context run completed
        setTimeout(() => {
            asyncFn.call(self, self.handleResolve, self.handleInject);
        });
    }
    then(resolved, injected) {
        const $resolved = typeof resolved === "function" ? resolved : null;
        const $injected = typeof injected === "function" ? injected : null;
        this.$defer = doWhen(this, $resolved, $injected);
        this.handleResolve = handle(this.$defer, this.resolve);
        this.handleInject = handle(this.$defer, this.resolve);
        return this.$defer.promise;
    }
    resolve(result) {
        for (let i = 0, len = this.$defer.resolveds.length; i < len; i++) {
            const resolved = this.$defer.resolveds[i];
            resolved(result);
        }
    }
    inject(result) {
        for (let i = 0, len = this.$defer.injecteds.length; i < len; i++) {
            const injected = this.$defer.injecteds[i];
            injected(result);
        }
    }
}
