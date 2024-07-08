const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUdRYTgrSU8wR1BESUFVcEp5akljRUFablVOMnB3M21maTZTWEFwc1ExND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0JzaXRrVkRYYnJXUXBleGM2RnltSHFDMmI0b2I5ckFNQWo4R1RKYWhRMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPTEVjK0xTRXg0c1JqZmNHTWk3TjFpNGh3VTdNL21ZYi9ZWXNyRHgwQjI0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2VW95QjhFRnpqNTRqQ0dGWFkzNXFDMGtjaDFVMDZEWjFzY2JRbU1lZ1RvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNKMDcyVGphMmFHbGl0ZGYzQ3RuaEF2T3h6bWI2aDhYakIyb05HQzNsa1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZYczJhQ3RzMGNWa1hCcjlZV0NXYTZmSUQwK1lRUUNJcm1NWHZNUW1tVFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEZMd1hiT2tOWU00MjdOOWNzbzJtT2t1YWNRanQxeWMrMGlDQjQ3allrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUHcwN1dsZmM5WlJsbTlOWDZ1Q0FTeFgxNExFaGwrTHBkU3FIQUpmZzNVTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFEOTZML29WaVo3MlZPWlJYWUQyZElMOERBbitJNG9hWGk1UktYRUVrYjhyOHNzcHZIc1VQTWVaTFY2VW5EYm8xUy9HNmpyQ3lsL1pJUGhnODFPeWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzQsImFkdlNlY3JldEtleSI6IjdFMkFHMHh6c05qV1NhbzRxaVFpZXZDcHB0SGxQTlltbkkvbmdOdXZxdlE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjoxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJEYmxxM1JmeVJVS2o3WmttckJXczBBIiwicGhvbmVJZCI6ImFlYWMxZDUxLTI1NWEtNDI3Mi1hYzVkLTVlZjFkZTA0OWM4NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwYk1WRHMzdVF2YXdjMGhNVEZsYXpza2ZhOTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieWNPeUE3OWdvV3ZkRmlEeFprenBYRE9SaWNrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVKM0I5Tk45IiwibWUiOnsiaWQiOiI1MDkzNzI5NDc0NzoxMkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZGG8J2QtPCdkYbwnZGI8J2QvvCdkLgg8J2Rg/CdkYXwnZGG4oCUzZ7Nn82ezZ/wlqOYIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPMk95cklHRU5qUnNMUUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJuSHRNZDhIanhoZ0NZclN3ZmtmSXNNRk1FbUhXc2pQem5XemJQYkR5NXdnPSIsImFjY291bnRTaWduYXR1cmUiOiJ3RVR1UWJNRHcwU0I2QUxjWmdLdkdqK2FVeHRhWFRJbHVpYTJWdmUwNjZKNEZVYlJ4ZTQrbnl6NTE0NGRRQmo5RlZqaEcvUFZuNjl0cXM3T0NrNS9DUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQmd4SE56M1B0Y2VmU29RSmhGL0tvcktIb0ZZNVh2MWp2eGhOcW9qeHZIOFFkUnZFZDV6RDhzMitkWEVWTHRiM1FoM3B2SmJTSnVhc1NFL1luTjN5amc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDkzNzI5NDc0NzoxMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaeDdUSGZCNDhZWUFtSzBzSDVIeUxEQlRCSmgxckl6ODUxczJ6Mnc4dWNJIn19XSwicGxhdGZvcm0iOiJzbWJhIn0=',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "limule",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'zokou-md',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
