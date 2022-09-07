module.exports = {
    default: {
        parallel: 2,
        paths: ['src/features/*.feature'],
        require: ['src/step-definitions/*.js', 'src/support/*.js'],
        publishQuiet: true
    }
}