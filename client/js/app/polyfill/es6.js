if(!Array.prototype.includes) {

    // Criado para emular o includes() no MS Edge

    console.log('Polyfill para Array.includes aplicado.');

    Array.prototype.includes = function(elemento) {
        return this.indexOf(elemento) != -1;
    };
}