const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUdQMEVCMTNhSDdiV1loa0NVeXpZWmlYSGNHWkNYb08vcGJBN05ZWEkwND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE9WeW0yU1JjaDdBbGwzSDZacWtMcE9iSkdSNE0rWTd3SysvdVQxR2ZTdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZRURhSlM5K3NpdVphNXZSeHE0WFFOVzNlL0orbjBrczQ4K1VyNEtJUkhRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFb3ErMTN2V0I2SlBjNDJ4bGVJMzBvZ0dRd3U0b0pHN2dyK2UyWEZiYngwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlGY2wrbmVnY2RMcDVuNlpnblpXRktPa2dsMW56cml5UU9NcFhxOXl3M2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9tb0ovZGZWZDRIeGxhbnF4ek1tSnNZdzBnYTlVMFV6V0hMb0RpRUwyazA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUx1QWJHSEI5VEdhSzUzM1dXME9sRU94d2dQRUhZRnl4RG5MWmR6RGQxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT28vektDR3FnZE84aWQyazYybmI1Sjhqd2c0QlUvajFlY0s4M1ZLQk5pTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFnNUdDYkVDd29NZVdDVWNmYWtEYXgzWUJqRk0wVSs5ZWY4TmJDekhhWk9kN2N4Y0tsVGlpRGpaR21ZRy9oTWtIMndSZlVBUUVZbUZ4eGxRbGNBdkJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDksImFkdlNlY3JldEtleSI6Im1heDJRbHR3YjZDN0hHeGtySzVnRmphN05WWXRiLzlwVnYxWUpEY1lRZWM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMTgyOTQ1MzM5NTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUYwRjI1N0RBNkY3NDE1MUQ2MUNDNTY1MTZFMjk2RkUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjMxNzE5M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMTgyOTQ1MzM5NTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzY3MzJFMjYxMTBGNUFENEM4NDJGOEE5Qjg3QkMzMDIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjMxNzIwMH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiZ0dSOTVmeVNRLU8zMjRkYngyVUVjZyIsInBob25lSWQiOiI1OTUwMWNkZS1hNDJkLTQ1ZmUtOTAxNi02MWFkYWZiNDRjYmUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnhxckwwdWlpZDJMb29SK2NsbjA4dzFvWkhBPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjA3dEJXdUtYWS9OUDZLcHh6Yi9CaXlWV2k3VT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJLOUFGNjM0QyIsImxhc3RQcm9wSGFzaCI6IjRHTjY4VSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUFnPT0ifSwibWUiOnsiaWQiOiIxODI5NDUzMzk1MjoyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCRgY0g8J2XmvCdl7zwnZiB8J2XrvCdl788Ly3wnZeV8J2XvPCdmIEg8JGBjSIsImxpZCI6IjEwMzg4Mjg3NzM0OTk3ODoyQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHZOek5zR0VJU0ZscmNHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiV3hCTFEraW9aemZlYnE0ZHcxUDcyaWJsYXFhTGZ1Y2hGNVZ2Q28wck4xaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQ0pLZ3AwMWtCNUM0RE1jNm9DWk1TR2kzT1B1ZStNMnNTZ0FweUE5T0x4bGVmOXBaSWF6UE1HVGFGYmNkOWVkUTg2eFZpb3pnVWEyWWhzUGU4VmRkQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IlViUmdRREFqRkkxK2RDRndxeGhrVmdSVWVkZlNmTzRqT25iWDR1QmFhWEpDOVYzOVFORWRLQkIvMGNkRVV3dnJmN0h2S3dEOGRhcm92RXdUWld6OUFBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTgyOTQ1MzM5NTI6MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWc1FTMFBvcUdjMzNtNnVIY05UKzlvbTVXcW1pMzduSVJlVmJ3cU5LemRaIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI2MzE3MTkxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUtUVCJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "𑁍 𝙶𝙾𝚃𝙰𝚁 𝚆𝚁𝙻𝙳 𑁍",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || '𑁍 𝗚𝗼𝘁𝗮𝗿</-𝗕𝗼𝘁 𑁍',
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
