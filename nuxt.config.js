module.exports = {
    router: {
        middleware: 'auth'
    },
    mode: 'spa',
    srcDir: 'src/',
    build: {
        babel: {

        }
    },
    css: [
    ],
    build: {
    },
    plugins: [
        '~/plugins/main.js',
    ],
    server: {
        port: 8070,  
        // host: '192.168.2.1',
        // // default: 80
        // // default: localhost
    },
}   