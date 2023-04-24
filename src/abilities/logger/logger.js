import WinstonSupabaseTransport from "./winston_supabase_transport.js";
import winston from "winston";

class Logger{
    constructor(config){
        const {supabase:supabaseConfig,winston:winstonConfig,logger:loggerConfig} = config ?? {};
        const {url,secret,tableName} = supabaseConfig ?? {};
        const {level,defaultMeta} = winstonConfig ?? {level:"info",defaultMeta:{projectKey:"",moduleKey:""}};
        const {projectKey,moduleKey} = defaultMeta;
        const {console} = loggerConfig ?? {console:true};

        const transports = [];

        if(console){
            transports.push(new winston.transports.Console());
        }
        
        if(supabaseConfig){
            transports.push(new WinstonSupabaseTransport({
                supabase:{
                    url:url,
                    secret:secret
                },
                tableName:tableName
              }))
        }

        return winston.createLogger({
            level: level,
            format: winston.format.json(),
            defaultMeta: { project_key: projectKey, module_key: moduleKey },
            transports: transports,
        });
    }
}

export default Logger;