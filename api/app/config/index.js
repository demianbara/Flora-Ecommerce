//Requerimos cada grupo de config especifico con sus middlwares respectivos y los exportamos funcionalmente.

module.exports =  (app) => {
    require('./parsing&loggin.js')(app)
}