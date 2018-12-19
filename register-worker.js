const registerServiceWorker = function(){
    navigator.serviceWorker.register('service-worker.js', { scope: './' })
        .then(() => navigator.serviceWorker.ready)
        .then(function () {
            console.log('service worker registered');
        })
        .catch(function (error) {
            console.error('error when registering service worker', error, arguments)
        });
};

module.exports = {
    registerServiceWorker,
};
