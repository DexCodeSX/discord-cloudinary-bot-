/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  CONFIG - Load settings from .env                            ║
 * ║  CONFIG - .env dosyasından ayarları yükle                    ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// Load .env file / .env dosyasını yükle
require('dotenv').config();

// Export config / Ayarları dışa aktar
module.exports = {
    // Discord token / Discord tokeni
    token: process.env.TOKEN,

    // Bot prefix / Bot ön eki
    prefix: '.',

    // Cloudinary settings / Cloudinary ayarları
    cloud: {
        name: process.env.CLOUD_NAME,
        key: process.env.API_KEY,
        secret: process.env.API_SECRET
    },

    // Bot settings / Bot ayarları
    bot: {
        name: 'Cloudinary Bot',
        version: '2.0.0',
        author: 'Developer'
    }
};
