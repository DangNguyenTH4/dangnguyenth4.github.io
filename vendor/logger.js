function GlobalLogger() {
    //inner class (ABSTRACT)
    class Log{
        log(content){
    
        }
    }
    //INNER CLASS 
    class Logger extends Log{
        log(content){
            console.log(content);
        }
    }
    //INNER CLASS 
    class NonLogger extends Log{
        
    }
    
    var logger = getLogger();
    this.log = function(content){
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
}
//ESPOSE global logger
var globalLog = new GlobalLogger();
function log(content){
    globalLog.log(content);
}
