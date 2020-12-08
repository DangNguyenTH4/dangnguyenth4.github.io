
class Log{
    log(content){

    }
}
class Logger extends Log{
    log(content){
        console.log(content);
    }
}
class NonLogger extends Log{
    
}

let logger = getLogger();
function log(content){
        logger.log(content);
}


function getLogger(){
    
    let target = location.protocol;
    console.log("GET LOGGER FOR: " + target);
    if(target ==='https'){
        return new NonLogger();
    }else{
        return new Logger();
    }
}