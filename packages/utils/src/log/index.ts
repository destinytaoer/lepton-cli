import log from 'npmlog';

// log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
console.log('log level', log.level);
log.heading = 'lepton';

export default log;
