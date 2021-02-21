module.exports = {
    createMockConfig: customConfig => {
        const {serverConfig} = customConfig || {};
        const {proxy, proxyTarget, proxySuffix} = serverConfig || {};

        return {proxy, proxyTarget, proxySuffix};
    }
}