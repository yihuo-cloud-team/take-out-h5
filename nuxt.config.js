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
        port: 80,  
        host: '192.168.0.147',
        // // default: 80
        // // default: localhost
    },
}   