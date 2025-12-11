/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  LOG - Ultra Modern Console with Crazy Functions                         ║
 * ║  LOG - Çılgın Fonksiyonlarla Ultra Modern Konsol                         ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 * 
 * Features / Özellikler:
 * • Rainbow text / Gökkuşağı yazı
 * • Gradient colors / Degrade renkler  
 * • ASCII art / ASCII sanat
 * • Loading animations / Yükleme animasyonları
 * • Progress bars / İlerleme çubukları
 * • Box designs / Kutu tasarımları
 * • Tables / Tablolar
 */

let chalk;

// Try load chalk / Chalk yüklemeyi dene
try {
    chalk = require('chalk');
} catch (e) {
    // Fallback / Yedek
    chalk = {
        green: (t) => t, red: (t) => t, yellow: (t) => t,
        blue: (t) => t, cyan: (t) => t, magenta: (t) => t,
        gray: (t) => t, white: (t) => t, black: (t) => t,
        bgRed: { white: (t) => t }, bgGreen: { black: (t) => t },
        bgBlue: { white: (t) => t }, bgMagenta: { white: (t) => t },
        bgCyan: { black: (t) => t }, bgYellow: { black: (t) => t },
        bold: {
            green: (t) => t, red: (t) => t, cyan: (t) => t,
            yellow: (t) => t, magenta: (t) => t, white: (t) => t
        },
        rgb: () => ({ bold: (t) => t, bgRgb: () => (t) => t }),
        hex: () => (t) => t
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// CRAZY ANIMATIONS / ÇILGIN ANİMASYONLAR
// ═══════════════════════════════════════════════════════════════════════════

const anim = {
    spinner: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    dots: ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
    stars: ['✶', '✷', '✸', '✹', '✺', '✹', '✸', '✷'],
    arrows: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
    bounce: ['⠁', '⠂', '⠄', '⠂'],
    pulse: ['◐', '◓', '◑', '◒'],
    clock: ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'],
    moon: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'],
    earth: ['🌍', '🌎', '🌏'],
    hearts: ['💛', '💙', '💜', '💚', '❤️'],
    fire: ['🔥', '🔥', '✨', '💫'],
    upload: ['📤', '☁️', '⬆️', '🚀']
};

// ═══════════════════════════════════════════════════════════════════════════
// COLOR FUNCTIONS / RENK FONKSİYONLARI
// ═══════════════════════════════════════════════════════════════════════════

// Get current time / Şu anki zamanı al
const time = () => {
    const d = new Date();
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    return chalk.gray(`[${h}:${m}:${s}]`);
};

// Rainbow text / Gökkuşağı yazı
const rainbow = (txt) => {
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
    let out = '';
    for (let i = 0; i < txt.length; i++) {
        try {
            out += chalk.hex(colors[i % colors.length])(txt[i]);
        } catch {
            out += txt[i];
        }
    }
    return out;
};

// Gradient text / Degrade yazı
const gradient = (txt, from = '#00FFFF', to = '#FF00FF') => {
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    };

    const [r1, g1, b1] = hexToRgb(from);
    const [r2, g2, b2] = hexToRgb(to);

    let out = '';
    for (let i = 0; i < txt.length; i++) {
        const ratio = i / (txt.length - 1 || 1);
        const r = Math.round(r1 + (r2 - r1) * ratio);
        const g = Math.round(g1 + (g2 - g1) * ratio);
        const b = Math.round(b1 + (b2 - b1) * ratio);
        try {
            out += chalk.rgb(r, g, b)(txt[i]);
        } catch {
            out += txt[i];
        }
    }
    return out;
};

// Neon glow effect / Neon ışık efekti
const neon = (txt, color = 'cyan') => {
    return chalk.bold[color](txt);
};

// Sparkle text / Parıltılı yazı
const sparkle = (txt) => {
    const sparkles = ['✨', '⭐', '💫', '🌟', '✦', '✧'];
    let out = sparkles[Math.floor(Math.random() * sparkles.length)] + ' ';
    for (let i = 0; i < txt.length; i++) {
        out += txt[i];
        if (i % 3 === 2) {
            out += sparkles[Math.floor(Math.random() * sparkles.length)];
        }
    }
    return out + ' ' + sparkles[Math.floor(Math.random() * sparkles.length)];
};

// Fire text / Ateşli yazı
const fire = (txt) => {
    const flames = ['🔥', '🔥', '💥', '⚡'];
    let out = flames[0] + ' ';
    for (let i = 0; i < txt.length; i++) {
        try {
            out += chalk.hex('#FF4500')(txt[i]);
        } catch {
            out += txt[i];
        }
    }
    return out + ' ' + flames[0];
};

// Glitch text / Glitch yazı
const glitch = (txt) => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let out = '';
    for (let i = 0; i < txt.length; i++) {
        if (Math.random() < 0.1) {
            out += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
            out += txt[i];
        }
    }
    return out;
};

// Cool text / Havalı yazı
const cool = (txt) => {
    const prefix = '「';
    const suffix = '」';
    return chalk.cyan(prefix) + chalk.bold.white(txt) + chalk.cyan(suffix);
};

// Warning text / Uyarı yazı
const warning = (txt) => {
    return chalk.bgYellow.black(' ⚠ ' + txt + ' ');
};

// Success text / Başarı yazı
const success = (txt) => {
    return chalk.bgGreen.black(' ✓ ' + txt + ' ');
};

// Error text / Hata yazı
const error = (txt) => {
    return chalk.bgRed.white(' ✖ ' + txt + ' ');
};

// ═══════════════════════════════════════════════════════════════════════════
// BOX DESIGNS / KUTU TASARIMLARI
// ═══════════════════════════════════════════════════════════════════════════

const box = {
    round: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
    sharp: { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
    double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
    simple: { tl: '+', tr: '+', bl: '+', br: '+', h: '-', v: '|' }
};

// Draw box around text / Yazının etrafına kutu çiz
const drawBox = (lines, style = 'double', color = 'cyan') => {
    const b = box[style] || box.double;
    const arr = Array.isArray(lines) ? lines : [lines];
    const maxLen = Math.max(...arr.map(l => l.length));

    console.log(chalk[color]('  ' + b.tl + b.h.repeat(maxLen + 4) + b.tr));
    for (const line of arr) {
        const pad = ' '.repeat(maxLen - line.length);
        console.log(chalk[color]('  ' + b.v) + '  ' + line + pad + '  ' + chalk[color](b.v));
    }
    console.log(chalk[color]('  ' + b.bl + b.h.repeat(maxLen + 4) + b.br));
};

// ═══════════════════════════════════════════════════════════════════════════
// ASCII ART / ASCII SANAT
// ═══════════════════════════════════════════════════════════════════════════

const ascii = {
    cloud: `
   ☁️ ☁️ ☁️
  ☁️     ☁️
 ☁️ CLOUD ☁️
  ☁️     ☁️
   ☁️ ☁️ ☁️
`,
    logo: `
╔═══════════════════════════════════════════════════════════════════════╗
║  ██████╗██╗      ██████╗ ██╗   ██╗██████╗ ██╗███╗   ██╗ █████╗ ██████╗║
║ ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██║████╗  ██║██╔══██╗██╔══██╝
║ ██║     ██║     ██║   ██║██║   ██║██║  ██║██║██╔██╗ ██║███████║██████╔╝
║ ██║     ██║     ██║   ██║██║   ██║██║  ██║██║██║╚██╗██║██╔══██║██╔══██╗
║ ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝██║██║ ╚████║██║  ██║██║  ██║
║  ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝
╚═══════════════════════════════════════════════════════════════════════╝
`
};

// ═══════════════════════════════════════════════════════════════════════════
// MEGA BANNER / MEGA AFİŞ
// ═══════════════════════════════════════════════════════════════════════════

const banner = () => {
    console.log('');
    console.log(gradient('  ╔═══════════════════════════════════════════════════════════════╗', '#00FFFF', '#FF00FF'));
    console.log(gradient('  ║', '#00FFFF', '#00FFFF') + rainbow('   ★★★ DISCORD CLOUDINARY BOT v2.0 ★★★            ') + gradient('║', '#FF00FF', '#FF00FF'));
    console.log(gradient('  ╠═══════════════════════════════════════════════════════════════╣', '#00FFFF', '#FF00FF'));
    console.log(chalk.cyan('  ║') + chalk.green(' ✓ ') + chalk.white('Windows / Termux / VPS Support') + '                         ' + chalk.magenta('║'));
    console.log(chalk.cyan('  ║') + chalk.green(' ✓ ') + chalk.white('Upload Files with .upload Command') + '                      ' + chalk.magenta('║'));
    console.log(chalk.cyan('  ║') + chalk.green(' ✓ ') + chalk.white('Image Effects: blur, sepia, cartoon, pixel') + '             ' + chalk.magenta('║'));
    console.log(chalk.cyan('  ║') + chalk.green(' ✓ ') + chalk.white('Modern Design & Crazy Functions') + '                        ' + chalk.magenta('║'));
    console.log(chalk.cyan('  ║') + chalk.yellow(' ⚡') + chalk.white(' Commands: .help .ping .upload .effects .stats') + '          ' + chalk.magenta('║'));
    console.log(gradient('  ╠═══════════════════════════════════════════════════════════════╣', '#00FFFF', '#FF00FF'));
    console.log(chalk.cyan('  ║') + chalk.red(' ❤️ ') + chalk.bold.white('Made by Bisam') + '                                          ' + chalk.magenta('║'));
    console.log(gradient('  ╚═══════════════════════════════════════════════════════════════╝', '#00FFFF', '#FF00FF'));
    console.log('');
};

// Mini banner / Mini afiş
const miniBanner = () => {
    console.log('');
    drawBox([rainbow('🤖 CLOUDINARY BOT v2.0')], 'round', 'cyan');
    console.log('');
};

// ═══════════════════════════════════════════════════════════════════════════
// LOG FUNCTIONS / LOG FONKSİYONLARI
// ═══════════════════════════════════════════════════════════════════════════

const log = {
    // Info log / Bilgi logu
    info: (msg) => console.log(time() + chalk.blue(' ℹ INFO    ') + chalk.white(msg)),

    // Success log / Başarı logu
    ok: (msg) => console.log(time() + chalk.green(' ✓ SUCCESS ') + chalk.white(msg)),

    // Warning log / Uyarı logu
    warn: (msg) => console.log(time() + chalk.yellow(' ⚠ WARNING ') + chalk.white(msg)),

    // Error log / Hata logu
    err: (msg) => console.log(time() + chalk.red(' ✖ ERROR   ') + chalk.white(msg)),

    // Debug log / Hata ayıklama logu
    debug: (msg) => console.log(time() + chalk.magenta(' 🔧 DEBUG  ') + chalk.gray(msg)),

    // Upload log / Yükleme logu
    upload: (msg) => console.log(time() + chalk.cyan(' ☁ UPLOAD  ') + chalk.white(msg)),

    // Command log / Komut logu
    cmd: (msg) => console.log(time() + chalk.yellow(' ⚡ CMD    ') + chalk.white(msg)),

    // API log / API logu
    api: (msg) => console.log(time() + chalk.blue(' 🔌 API    ') + chalk.white(msg)),

    // Effect log / Efekt logu
    effect: (msg) => console.log(time() + chalk.magenta(' ✨ EFFECT ') + chalk.white(msg)),

    // Event log / Olay logu
    event: (msg) => console.log(time() + chalk.magenta(' 📡 EVENT  ') + chalk.white(msg)),

    // Divider line / Ayırıcı çizgi
    line: () => console.log(chalk.gray('  ' + '─'.repeat(55))),

    // Double line / Çift çizgi
    doubleLine: () => console.log(chalk.cyan('  ' + '═'.repeat(55))),

    // Empty line / Boş satır
    space: () => console.log(''),

    // Show banner / Afişi göster
    banner,
    miniBanner,

    // Box / Kutu
    box: drawBox,

    // Colors / Renkler
    rainbow,
    gradient,
    neon,

    // Crazy text / Çılgın yazı
    sparkle,
    fire,
    glitch,
    cool,
    warning,
    success,
    error,

    // ASCII art / ASCII sanat
    ascii
};

// ═══════════════════════════════════════════════════════════════════════════
// LOADING ANIMATIONS / YÜKLEME ANİMASYONLARI
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Loading spinner / Yükleme döndürücü
 * @param {string} msg - Message / Mesaj
 * @param {string} type - Animation type / Animasyon türü
 * @returns {object}
 */
log.loading = (msg, type = 'spinner') => {
    const frames = anim[type] || anim.spinner;
    let i = 0;

    const id = setInterval(() => {
        process.stdout.write(`\r${time()} ${chalk.cyan(frames[i])} ${msg}   `);
        i = (i + 1) % frames.length;
    }, 100);

    return {
        stop: (endMsg) => {
            clearInterval(id);
            process.stdout.write(`\r${time()} ${chalk.green('✓')} ${endMsg}   \n`);
        },
        fail: (endMsg) => {
            clearInterval(id);
            process.stdout.write(`\r${time()} ${chalk.red('✖')} ${endMsg}   \n`);
        },
        update: (newMsg) => {
            msg = newMsg;
        }
    };
};

/**
 * Progress bar / İlerleme çubuğu
 * @param {number} cur - Current / Şu anki
 * @param {number} max - Maximum / Maksimum
 * @param {string} label - Label / Etiket
 */
log.progress = (cur, max, label = '') => {
    const pct = Math.floor((cur / max) * 100);
    const filled = Math.floor(pct / 5);
    const empty = 20 - filled;
    const bar = chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
    process.stdout.write(`\r  ${bar} ${chalk.cyan(pct + '%')} ${label}  `);
    if (cur >= max) console.log('');
};

/**
 * Countdown / Geri sayım
 * @param {number} sec - Seconds / Saniye
 * @param {string} msg - Message / Mesaj
 * @returns {Promise}
 */
log.countdown = async (sec, msg = 'Starting in') => {
    for (let i = sec; i > 0; i--) {
        process.stdout.write(`\r  ${chalk.yellow('⏳')} ${msg} ${chalk.bold.cyan(i)}...   `);
        await new Promise(r => setTimeout(r, 1000));
    }
    process.stdout.write(`\r  ${chalk.green('✓')} ${msg} ${chalk.bold.green('GO!')}   \n`);
};

// ═══════════════════════════════════════════════════════════════════════════
// TABLE DRAWING / TABLO ÇİZİMİ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Draw simple table / Basit tablo çiz
 * @param {Array} rows - Table rows / Tablo satırları
 * @param {Array} headers - Headers / Başlıklar
 */
log.table = (rows, headers = null) => {
    if (headers) {
        console.log(chalk.cyan('  ' + headers.join(' │ ')));
        console.log(chalk.gray('  ' + '─'.repeat(headers.join(' │ ').length)));
    }
    for (const row of rows) {
        console.log('  ' + row.join(' │ '));
    }
};

// Export animations / Animasyonları dışa aktar
log.anim = anim;

module.exports = log;
