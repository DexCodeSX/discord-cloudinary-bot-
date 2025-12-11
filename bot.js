/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                                                                          ║
 * ║    ██████╗██╗      ██████╗ ██╗   ██╗██████╗ ██╗███╗   ██╗ █████╗ ██████╗ ║
 * ║   ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██║████╗  ██║██╔══██╗██╔══██╗║
 * ║   ██║     ██║     ██║   ██║██║   ██║██║  ██║██║██╔██╗ ██║███████║██████╔╝║
 * ║   ██║     ██║     ██║   ██║██║   ██║██║  ██║██║██║╚██╗██║██╔══██║██╔══██╗║
 * ║   ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝██║██║ ╚████║██║  ██║██║  ██║║
 * ║    ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝║
 * ║                                                                          ║
 * ║                 DISCORD BOT - CLOUDINARY FILE UPLOADER v2.0              ║
 * ║                DISCORD BOT - CLOUDINARY DOSYA YÜKLEYICI v2.0             ║
 * ║                                                                          ║
 * ╠══════════════════════════════════════════════════════════════════════════╣
 * ║  Features / Özellikler:                                                  ║
 * ║  • Auto upload file attachments / Otomatik dosya yükleme                 ║
 * ║  • Image effects (blur, sepia, cartoon) / Resim efektleri                ║
 * ║  • Prefix commands (.help, .effects) / Ön ekli komutlar                  ║
 * ║  • Modern console design / Modern konsol tasarımı                        ║
 * ║  • Cross-platform support / Çapraz platform desteği                      ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 * 
 * Usage / Kullanım:
 * 1. npm install
 * 2. node bot.js
 */

// ═══════════════════════════════════════════════════════════════════════════
// STEP 1: Check and install packages / Paketleri kontrol et ve yükle
// ═══════════════════════════════════════════════════════════════════════════

const inst = require('./utils/install');
inst.all();

// ═══════════════════════════════════════════════════════════════════════════
// STEP 2: Load modules / Modülleri yükle
// ═══════════════════════════════════════════════════════════════════════════

const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, AttachmentBuilder, Partials } = require('discord.js');
const fetch = require('node-fetch');
const cfg = require('./config');
const log = require('./utils/log');
const cloud = require('./utils/cloud');

// ═══════════════════════════════════════════════════════════════════════════
// STEP 3: Create Discord client / Discord istemcisi oluştur
// ═══════════════════════════════════════════════════════════════════════════

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions
    ],
    // Allow DMs / DM'lere izin ver
    partials: [Partials.Channel, Partials.Message]
});

// Store bot stats / Bot istatistiklerini sakla
const stats = {
    uploads: 0,
    cmds: 0,
    effects: 0,
    start: Date.now()
};

// ═══════════════════════════════════════════════════════════════════════════
// STEP 4: Crazy helper functions / Çılgın yardımcı fonksiyonlar
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Format uptime / Çalışma süresini formatla
 * @param {number} ms - Milliseconds / Milisaniye
 * @returns {string}
 */
const formatUptime = (ms) => {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
};

/**
 * Random color / Rastgele renk
 * @returns {number}
 */
const randomColor = () => Math.floor(Math.random() * 16777215);

/**
 * Create embed with style / Stilli embed oluştur
 * @param {string} title - Title / Başlık
 * @param {string} desc - Description / Açıklama
 * @param {string} type - Type / Tür (success/error/info)
 * @returns {object} - Embed object for msg.reply()
 */
const makeEmbed = (title, desc, type = 'info') => {
    const colors = { success: 0x00FF00, error: 0xFF0000, info: 0x5865F2, warn: 0xFFAA00 };
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warn: '⚠️' };

    const emb = new EmbedBuilder()
        .setColor(colors[type] || 0x5865F2)
        .setTitle(`${icons[type] || ''} ${title}`)
        .setDescription(desc || 'No details / Detay yok')
        .setTimestamp()
        .setFooter({ text: '☁️ Cloudinary Bot v2.0 | Made by Bisam' });

    return { embeds: [emb] };
};

// ═══════════════════════════════════════════════════════════════════════════
// STEP 5: Command handlers / Komut işleyicileri
// ═══════════════════════════════════════════════════════════════════════════

const cmds = {
    // ─────────────────────────────────────────────────────────────────────
    // HELP COMMAND / YARDIM KOMUTU
    // ─────────────────────────────────────────────────────────────────────
    help: async (msg) => {
        const emb = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('📚 Bot Commands / Bot Komutları')
            .setDescription(`Prefix: \`${cfg.prefix}\``)
            .addFields(
                { name: '🏓 .ping', value: 'Check latency / Gecikme', inline: true },
                { name: '❓ .help', value: 'Show help / Yardım', inline: true },
                { name: '📊 .stats', value: 'Bot stats / İstatistik', inline: true },
                { name: '☁️ .cloud', value: 'Cloud status / Bulut durumu', inline: true },
                { name: '📤 .upload', value: 'Upload file / Dosya yükle', inline: true },
                { name: '🎨 .effects', value: 'Show effects / Efektler', inline: true },
                { name: '✨ .effect <name>', value: 'Apply effect / Efekt uygula', inline: true },
                { name: '📁 .files', value: 'Recent uploads / Son yüklemeler', inline: true },
                { name: 'ℹ️ .info', value: 'Bot info / Bot bilgisi', inline: true }
            )
            .setFooter({ text: '🤖 Made by Bisam | Cloudinary Bot v2.0' })
            .setTimestamp();

        await msg.reply({ embeds: [emb] });
        log.cmd(`${msg.author.tag} used .help`);
    },

    // ─────────────────────────────────────────────────────────────────────
    // PING COMMAND / PING KOMUTU
    // ─────────────────────────────────────────────────────────────────────
    ping: async (msg) => {
        const start = Date.now();
        const m = await msg.reply('🏓 Pinging... / Ping atılıyor...');
        const lat = Date.now() - start;
        const api = Math.round(bot.ws.ping);

        // Color based on latency / Gecikmeye göre renk
        const color = lat < 100 ? 0x00FF00 : lat < 300 ? 0xFFFF00 : 0xFF0000;
        const status = lat < 100 ? '🟢 Excellent' : lat < 300 ? '🟡 Good' : '🔴 Slow';

        const emb = new EmbedBuilder()
            .setColor(color)
            .setTitle('🏓 Pong!')
            .addFields(
                { name: '📨 Message / Mesaj', value: `\`${lat}ms\``, inline: true },
                { name: '🔌 API', value: `\`${api}ms\``, inline: true },
                { name: '📊 Status / Durum', value: status, inline: true }
            )
            .setTimestamp();

        await m.edit({ content: null, embeds: [emb] });
        log.cmd(`${msg.author.tag} used .ping - ${lat}ms`);
    },

    // ─────────────────────────────────────────────────────────────────────
    // STATS COMMAND / İSTATİSTİK KOMUTU
    // ─────────────────────────────────────────────────────────────────────
    stats: async (msg) => {
        const uptime = formatUptime(Date.now() - stats.start);
        const mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        const emb = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('📊 Bot Statistics / Bot İstatistikleri')
            .addFields(
                { name: '🕐 Uptime / Çalışma', value: `\`${uptime}\``, inline: true },
                { name: '📤 Uploads / Yüklemeler', value: `\`${stats.uploads}\``, inline: true },
                { name: '✨ Effects / Efektler', value: `\`${stats.effects}\``, inline: true },
                { name: '⚡ Commands / Komutlar', value: `\`${stats.cmds}\``, inline: true },
                { name: '🏠 Servers / Sunucular', value: `\`${bot.guilds.cache.size}\``, inline: true },
                { name: '💾 Memory / Bellek', value: `\`${mem} MB\``, inline: true }
            )
            .setTimestamp();

        await msg.reply({ embeds: [emb] });
        log.cmd(`${msg.author.tag} used .stats`);
    },

    // ─────────────────────────────────────────────────────────────────────
    // CLOUD STATUS / BULUT DURUMU
    // ─────────────────────────────────────────────────────────────────────
    cloud: async (msg) => {
        const ok = await cloud.test();
        const st = await cloud.stats();

        const emb = new EmbedBuilder()
            .setColor(ok ? 0x00FF00 : 0xFF0000)
            .setTitle('☁️ Cloudinary Status / Cloudinary Durumu')
            .addFields(
                { name: '🔌 Connection / Bağlantı', value: ok ? '✅ Connected / Bağlı' : '❌ Disconnected / Bağlı Değil', inline: false }
            );

        if (st.ok) {
            emb.addFields(
                { name: '📊 Usage / Kullanım', value: `\`${st.used.toFixed(2)}%\``, inline: true },
                { name: '💾 Storage / Depolama', value: `\`${cloud.formatBytes(st.storage)}\``, inline: true },
                { name: '🌐 Bandwidth / Bant', value: `\`${cloud.formatBytes(st.bandwidth)}\``, inline: true },
                { name: '🖼️ Objects / Dosyalar', value: `\`${st.objects}\``, inline: true }
            );
        }

        emb.setTimestamp();
        await msg.reply({ embeds: [emb] });
        log.cmd(`${msg.author.tag} used .cloud`);
    },

    // ─────────────────────────────────────────────────────────────────────
    // EFFECTS LIST / EFEKT LİSTESİ
    // ─────────────────────────────────────────────────────────────────────
    effects: async (msg) => {
        const effectList = Object.keys(cloud.transforms);

        const emb = new EmbedBuilder()
            .setColor(0xFF00FF)
            .setTitle('🎨 Available Effects / Mevcut Efektler')
            .setDescription('Use `.effect <name>` with an attached image\nEkli bir resimle `.effect <isim>` kullanın')
            .addFields(
                { name: '🖼️ Resize / Boyut', value: '`thumb` `square` `circle` `face` `large`', inline: false },
                { name: '🎭 Filters / Filtreler', value: '`blur` `softblur` `gray` `sepia` `negate` `sharpen` `enhance`', inline: false },
                { name: '🎨 Artistic / Sanatsal', value: '`cartoon` `oil` `pixel` `vignette` `vintage` `hdr` `outline`', inline: false },
                { name: '🌈 Colors / Renkler', value: '`bright` `dark` `contrast` `saturate` `desaturate` `warm` `cool` `red` `blue` `green`', inline: false },
                { name: '✨ Special / Özel', value: '`rotate90` `rotate180` `flip` `mirror` `shadow` `fade` `trim`', inline: false }
            )
            .setFooter({ text: `Total: ${effectList.length} effects | Made by Bisam` })
            .setTimestamp();

        await msg.reply({ embeds: [emb] });
        log.cmd(`${msg.author.tag} used .effects`);
    },

    // ─────────────────────────────────────────────────────────────────────
    // APPLY EFFECT / EFEKT UYGULA
    // ─────────────────────────────────────────────────────────────────────
    effect: async (msg, args) => {
        // Check for effect name / Efekt adı kontrolü
        if (!args[0]) {
            return msg.reply(makeEmbed('Effect Required / Efekt Gerekli', 'Usage: `.effect <name>`\nKullanım: `.effect <isim>`\n\nUse `.effects` to see all effects.\nTüm efektleri görmek için `.effects` kullanın.', 'warn'));
        }

        // Check for attachment / Dosya eki kontrolü
        if (msg.attachments.size === 0) {
            return msg.reply(makeEmbed('Image Required / Resim Gerekli', 'Please attach an image with your message.\nLütfen mesajınıza bir resim ekleyin.', 'error'));
        }

        const effectName = args[0].toLowerCase();
        const att = msg.attachments.first();

        // Check if valid effect / Geçerli efekt kontrolü
        if (!cloud.transforms[effectName]) {
            const effects = Object.keys(cloud.transforms).join(', ');
            return msg.reply(makeEmbed('Unknown Effect / Bilinmeyen Efekt', `Effect \`${effectName}\` not found.\nEfekt \`${effectName}\` bulunamadı.\n\nAvailable / Mevcut: ${effects}`, 'error'));
        }

        // Check if image / Resim kontrolü
        if (cloud.getType(att.name) !== 'image') {
            return msg.reply(makeEmbed('Image Only / Sadece Resim', 'Effects only work on images.\nEfektler sadece resimlerde çalışır.', 'error'));
        }

        try {
            log.effect(`Applying ${effectName} to ${att.name}`);

            // Send processing message / İşleniyor mesajı
            const proc = await msg.reply(`✨ Applying effect: \`${effectName}\`... / Efekt uygulanıyor...`);

            // Download image / Resmi indir
            log.api('Downloading image...');
            const res = await fetch(att.url);
            const buf = await res.buffer();

            // Upload with effect / Efektli yükle
            log.api(`Uploading with ${effectName} effect...`);
            const up = await cloud.uploadWithEffect(buf, att.name, effectName);

            if (up.ok) {
                log.ok(`Effect applied: ${effectName}`);
                stats.effects++;

                const emb = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setTitle(`✨ Effect Applied: ${effectName}`)
                    .setDescription(`Efekt Uygulandı: ${effectName}`)
                    .setImage(up.url)
                    .addFields({ name: '🔗 URL', value: up.url })
                    .setTimestamp()
                    .setFooter({ text: '🎨 Made by Bisam | Cloudinary Effects' });

                await proc.edit({ content: null, embeds: [emb] });
            } else {
                log.err(`Effect failed: ${up.err}`);
                await proc.edit({ content: null, embeds: [makeEmbed('Effect Failed / Efekt Başarısız', up.err, 'error')] });
            }

            log.line();

        } catch (e) {
            log.err(`Effect error: ${e.message}`);
            await msg.reply(makeEmbed('Error / Hata', e.message, 'error'));
        }

        log.cmd(`${msg.author.tag} used .effect ${effectName}`);
    },

    // ─────────────────────────────────────────────────────────────────────
    // UPLOAD COMMAND / YÜKLEME KOMUTU
    // ─────────────────────────────────────────────────────────────────────
    upload: async (msg) => {
        if (msg.attachments.size === 0) {
            return msg.reply(makeEmbed('No File / Dosya Yok', 'Please attach a file with your message.\nLütfen mesajınıza bir dosya ekleyin.', 'error'));
        }

        await handleAttachment(msg, msg.attachments.first());
        log.cmd(`${msg.author.tag} used .upload`);
    },

    // ─────────────────────────────────────────────────────────────────────
    // FILES LIST / DOSYA LİSTESİ
    // ─────────────────────────────────────────────────────────────────────
    files: async (msg) => {
        const result = await cloud.list(5);

        if (!result.ok) {
            return msg.reply(makeEmbed('Error / Hata', result.err, 'error'));
        }

        if (result.files.length === 0) {
            return msg.reply(makeEmbed('No Files / Dosya Yok', 'No files uploaded yet.\nHenüz dosya yüklenmemiş.', 'info'));
        }

        const emb = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('📁 Recent Uploads / Son Yüklemeler')
            .setDescription(result.files.map((f, i) => `**${i + 1}.** \`${f.format}\` - ${cloud.formatBytes(f.size)}\n[Link](${f.url})`).join('\n\n'))
            .setTimestamp();

        await msg.reply({ embeds: [emb] });
        log.cmd(`${msg.author.tag} used .files`);
    },

    // ─────────────────────────────────────────────────────────────────────
    // INFO COMMAND / BİLGİ KOMUTU
    // ─────────────────────────────────────────────────────────────────────
    info: async (msg) => {
        const emb = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('🤖 Bot Information / Bot Bilgisi')
            .setDescription('A Discord bot that uploads files to Cloudinary with effects.\nEfektlerle dosyaları Cloudinary\'e yükleyen bir Discord botu.')
            .addFields(
                { name: '📛 Name / İsim', value: `\`${cfg.bot.name}\``, inline: true },
                { name: '📦 Version / Sürüm', value: `\`${cfg.bot.version}\``, inline: true },
                { name: '⚡ Prefix / Ön Ek', value: `\`${cfg.prefix}\``, inline: true },
                { name: '☁️ Cloud', value: '`Cloudinary`', inline: true },
                { name: '📚 Node.js', value: `\`${process.version}\``, inline: true },
                { name: '🎨 Effects / Efektler', value: `\`${Object.keys(cloud.transforms).length}\``, inline: true }
            )
            .setFooter({ text: '❤️ Made by Bisam' })
            .setTimestamp();

        await msg.reply({ embeds: [emb] });
        log.cmd(`${msg.author.tag} used .info`);
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// STEP 6: Attachment handler / Dosya eki işleyicisi
// ═══════════════════════════════════════════════════════════════════════════

async function handleAttachment(msg, att) {
    try {
        // Get emoji for file type / Dosya türü için emoji al
        const emoji = cloud.getEmoji(att.name);

        // Log start / Başlangıcı logla
        log.upload(`Processing: ${att.name}`);
        log.debug(`Size: ${cloud.formatBytes(att.size)}`);
        log.debug(`From: ${msg.author.tag}`);

        // Send processing message / İşleniyor mesajı
        const proc = await msg.reply(`${emoji} Uploading to Cloudinary... / Cloudinary'e yükleniyor...`);

        // Download file / Dosyayı indir
        log.api('Downloading file...');
        const res = await fetch(att.url);
        const buf = await res.buffer();

        // Get file type / Dosya türünü al
        const type = cloud.getType(att.name);
        log.debug(`Type: ${type}`);

        // Upload to Cloudinary / Cloudinary'e yükle
        log.api('Uploading to Cloudinary...');
        const up = await cloud.upload(buf, att.name, type);

        // Check result / Sonucu kontrol et
        if (up.ok) {
            log.ok(`Upload success: ${att.name}`);
            log.info(`URL: ${up.url}`);
            stats.uploads++;

            // Create success embed / Başarı embed'i
            const emb = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`${emoji} Upload Success! / Yükleme Başarılı!`)
                .setDescription('File uploaded to Cloudinary successfully.\nDosya Cloudinary\'e başarıyla yüklendi.')
                .addFields(
                    { name: '📁 File / Dosya', value: `\`${att.name}\``, inline: true },
                    { name: '📊 Size / Boyut', value: `\`${cloud.formatBytes(att.size)}\``, inline: true },
                    { name: '📦 Type / Tür', value: `\`${up.type}\``, inline: true }
                )
                .addFields({ name: '🔗 URL', value: up.url })
                .setTimestamp()
                .setFooter({ text: '☁️ Made by Bisam | Cloudinary Bot' });

            // Add thumbnail for images / Resimler için küçük resim
            if (type === 'image') {
                emb.setThumbnail(up.url);
            }

            // Add dimensions for images / Resimler için boyutlar
            if (up.width && up.height) {
                emb.addFields({ name: '📐 Dimensions / Boyutlar', value: `\`${up.width}x${up.height}\``, inline: true });
            }

            await proc.edit({ content: null, embeds: [emb] });

        } else {
            // Upload failed / Yükleme başarısız
            log.err(`Upload failed: ${up.err}`);
            await proc.edit({ content: null, embeds: [makeEmbed('Upload Failed / Yükleme Başarısız', up.err, 'error')] });
        }

        log.line();

    } catch (e) {
        // Error handling / Hata işleme
        log.err(`Error: ${e.message}`);
        log.debug(e.stack);
        await msg.reply(makeEmbed('Error / Hata', e.message, 'error'));
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// STEP 7: Bot ready event / Bot hazır olayı
// ═══════════════════════════════════════════════════════════════════════════

bot.once('ready', async () => {
    // Show banner / Afişi göster
    log.banner();

    // Log bot info / Bot bilgisini logla
    log.ok(`Bot online: ${bot.user.tag}`);
    log.info(`Servers: ${bot.guilds.cache.size}`);
    log.info(`Prefix: ${cfg.prefix}`);
    log.info(`Effects: ${Object.keys(cloud.transforms).length}`);

    // Set activity / Aktivite ayarla
    bot.user.setActivity(`${cfg.prefix}help | ☁️ Upload`, { type: ActivityType.Watching });

    // Test Cloudinary / Cloudinary'i test et
    log.line();
    const ok = await cloud.test();
    if (ok) {
        log.ok('Cloudinary connected!');

        const st = await cloud.stats();
        if (st.ok) {
            log.info(`Storage: ${cloud.formatBytes(st.storage)}`);
            log.info(`Usage: ${st.used.toFixed(2)}%`);
        }
    } else {
        log.err('Cloudinary connection failed!');
        log.warn('Check your API credentials in .env');
    }

    log.line();
    log.info('Made by Bisam ❤️');
    log.info('Waiting for commands... / Komutlar bekleniyor...');
    log.info('Use .upload to upload files / Dosya yüklemek için .upload kullanın');
    log.space();
});

// ═══════════════════════════════════════════════════════════════════════════
// STEP 8: Message event / Mesaj olayı
// ═══════════════════════════════════════════════════════════════════════════

bot.on('messageCreate', async (msg) => {
    // Ignore bot messages / Bot mesajlarını yoksay
    if (msg.author.bot) return;

    // Check for command / Komut kontrolü
    if (msg.content.startsWith(cfg.prefix)) {
        const args = msg.content.slice(cfg.prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        // Execute command if exists / Varsa komutu çalıştır
        if (cmds[cmd]) {
            stats.cmds++;
            try {
                await cmds[cmd](msg, args);
            } catch (e) {
                log.err(`Command error: ${e.message}`);
                log.debug(e.stack);
                await msg.reply(makeEmbed('Error / Hata', e.message, 'error'));
            }
        }
        return;
    }

    // REMOVED: Auto upload disabled / Otomatik yükleme devre dışı
    // Files are only uploaded with .upload command
    // Dosyalar sadece .upload komutuyla yüklenir
});

// ═══════════════════════════════════════════════════════════════════════════
// STEP 9: Error handling / Hata işleme  
// ═══════════════════════════════════════════════════════════════════════════

bot.on('error', (e) => {
    log.err(`Discord Error: ${e.message}`);
});

process.on('unhandledRejection', (e) => {
    log.err(`Unhandled Error: ${e.message}`);
    log.debug(e.stack);
});

// Graceful shutdown / Düzgün kapatma
process.on('SIGINT', () => {
    log.warn('Shutting down... / Kapatılıyor...');
    log.info(`Total uploads: ${stats.uploads}`);
    log.info(`Total commands: ${stats.cmds}`);
    log.info(`Total effects: ${stats.effects}`);
    bot.destroy();
    process.exit(0);
});

// ═══════════════════════════════════════════════════════════════════════════
// STEP 10: Login bot / Botu giriş yap
// ═══════════════════════════════════════════════════════════════════════════

// Check token / Token kontrolü
if (!cfg.token) {
    log.err('No Discord token found! / Discord tokeni bulunamadı!');
    log.warn('Add TOKEN= to your .env file');
    process.exit(1);
}

// Login / Giriş yap
log.info('Starting bot... / Bot başlatılıyor...');
bot.login(cfg.token).catch((e) => {
    log.err(`Login failed: ${e.message}`);
    log.warn('Check your Discord token / Discord tokeninizi kontrol edin');
    process.exit(1);
});
