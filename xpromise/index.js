import Promise from "./promise";

new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            resolve("promise received result");
        } catch (error) {
            reject(error);
        }
    }, 3000);
}).then((result1) => {
    console.log(result1);
});
