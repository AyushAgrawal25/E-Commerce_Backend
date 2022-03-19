module.exports = {
    apps: [
        {
            name: "e-commerce_backend",
            script: './dist/app.js',
            watch: false,
            instances: 1,
            exec_mode: "cluster",
        }
    ]
}
