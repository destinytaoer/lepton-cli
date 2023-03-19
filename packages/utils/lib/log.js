import log from 'npmlog';
export { default } from 'npmlog';

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
log.heading = 'lepton';
