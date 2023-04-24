import wait from 'delay';

function dowhile(value,{kind,name}){
    if(kind == 'method'){
        return async function (...args) {
            let stop = false;
            let currentPage = 0;
            do{
                stop = await value.call(this,args[0],args[1],currentPage);
                currentPage++;
            }while(!stop);
        }
    }
}

function delay(value,opts){
    if(opts != undefined && opts.kind == "method"){
        const min = 1;
        const max =  60;

        return async function (...args){
            await value.call(this,...args);
            console.log(`delay between ${min} - ${max}`);
            await wait.range(min*1000, max*1000);
        }
    }

    const {min,max} = value;
    return (_value,{kind,name})=>{
        if(kind == 'method'){
            return async function (...args){
                await _value.call(this,...args);
                console.log(`delay between ${min} - ${max}`);
                await wait.range(min*1000, max*1000);
            }
        }
    }
}

export {dowhile,delay}