    
    const stores = ['negociacoes'];
    const version = 4;
    const dbName = "aluraframe"
    var connection = null;
    var close = null;

    export class ConnectionFactory {
        
        constructor(){
            throw new Error("Nao e possivel instanciar ConnectionFactory");
        }

        static getConnection(){
            return new Promise((resolve, reject)=>{
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result)
                }

                openRequest.onsuccess = e => {
                    console.log("Conexao obtida com o banco");
                    if(!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = () => {
                            throw new Error("Voce nao pode encerrar a conexao")
                        }
                    };
                    resolve(e.target.result);
                }

                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                }
            })
        }

        static _createStores(connection){
            stores.forEach(store => {
                if(connection.result.objectStoreNames.contains(store)) connection.result.deleteObjectStore(store)
                
                connection.result.createObjectStore(store, { autoIncrement: true })
            })
        }

        static closeConnection(){

            if(connection){
                close();
                connection = null;
            }
        }
    }