// import instantiateCachedURL from './wasmUtil';
// const main_wasm_version = 1; //main.wasm version
import React from 'react';

const importObject = {
    imports: {
        imported_func: function (arg) {
            console.log(arg);
        }
    }
};

const reload = (setInstance, wasmURL) => {
    function fetchAndInstantiate(url, importObject) {
        return fetch(url).then(response =>
            response.arrayBuffer()
        ).then(bytes =>
            WebAssembly.instantiate(bytes, importObject)
        )
    }
    fetchAndInstantiate(wasmURL, importObject).then(results => {
        console.log('WebAssembly inited');
        setInstance(results);
    })
}


const useAssembly = (url) => {
    const [assembly, setAssembly] = React.useState(null);
    React.useEffect(() => {
        reload(setAssembly, url);
    }, [url]);
    return [assembly, setAssembly];
}

export default useAssembly;