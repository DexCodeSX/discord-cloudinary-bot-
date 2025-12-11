/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  CLOUD - Advanced Cloudinary API Helper                      ║
 * ║  CLOUD - Gelişmiş Cloudinary API Yardımcısı                  ║
 * ╚══════════════════════════════════════════════════════════════╝
 * 
 * Features / Özellikler:
 * • Upload files / Dosya yükleme
 * • Transform images / Resim dönüştürme
 * • Generate thumbnails / Küçük resim oluşturma
 * • Get usage stats / Kullanım istatistikleri
 * • Delete files / Dosya silme
 */

const cloudinary = require('cloudinary').v2;
const cfg = require('../config');

// ═══════════════════════════════════════════════════════════════
// SETUP / KURULUM
// ═══════════════════════════════════════════════════════════════

cloudinary.config({
    cloud_name: cfg.cloud.name,
    api_key: cfg.cloud.key,
    api_secret: cfg.cloud.secret
});

// ═══════════════════════════════════════════════════════════════
// CRAZY TRANSFORMATIONS / ÇILGIN DÖNÜŞÜMLER
// ═══════════════════════════════════════════════════════════════

const transforms = {
    // ─────────────────────────────────────────────────────────────
    // IMAGE RESIZE / RESİM BOYUTLANDIRMA
    // ─────────────────────────────────────────────────────────────

    // Thumbnail / Küçük resim
    thumb: { width: 150, height: 150, crop: 'thumb', gravity: 'face' },

    // Square / Kare
    square: { width: 500, height: 500, crop: 'fill' },

    // Circle / Yuvarlak
    circle: { width: 200, height: 200, crop: 'thumb', gravity: 'face', radius: 'max' },

    // Face zoom / Yüze zoom
    face: { crop: 'thumb', gravity: 'face', width: 300, height: 300 },

    // Large / Büyük
    large: { width: 1920, height: 1080, crop: 'fit' },

    // ─────────────────────────────────────────────────────────────
    // FILTERS / FİLTRELER
    // ─────────────────────────────────────────────────────────────

    // Blur effect / Bulanık efekt
    blur: { effect: 'blur:500' },

    // Light blur / Hafif bulanık
    softblur: { effect: 'blur:200' },

    // Grayscale / Gri tonlama
    gray: { effect: 'grayscale' },

    // Sepia effect / Sepya efekti
    sepia: { effect: 'sepia' },

    // Negate / Negatif
    negate: { effect: 'negate' },

    // Sharpen / Keskinleştir
    sharpen: { effect: 'sharpen:100' },

    // Auto enhance / Otomatik iyileştir
    enhance: { effect: 'improve' },

    // ─────────────────────────────────────────────────────────────
    // ARTISTIC / SANATSAL
    // ─────────────────────────────────────────────────────────────

    // Cartoon effect / Karikatür efekti
    cartoon: { effect: 'cartoonify' },

    // Oil paint / Yağlı boya
    oil: { effect: 'oil_paint:70' },

    // Pixelate / Pikselleştir
    pixel: { effect: 'pixelate:20' },

    // Vignette / Vinyetaj
    vignette: { effect: 'vignette:50' },

    // Vintage / Vintage efekti
    vintage: { effect: 'art:incognito' },

    // HDR effect / HDR efekti
    hdr: { effect: 'art:audrey' },

    // Outline / Kenar çizgisi
    outline: { effect: 'style_transfer', transformation: [{ effect: 'cartoonify:50' }, { effect: 'blackwhite' }] },

    // ─────────────────────────────────────────────────────────────
    // COLOR ADJUSTMENTS / RENK AYARLARI
    // ─────────────────────────────────────────────────────────────

    // Brightness up / Parlaklık artır
    bright: { effect: 'brightness:30' },

    // Darkness / Karanlık
    dark: { effect: 'brightness:-30' },

    // High contrast / Yüksek kontrast
    contrast: { effect: 'contrast:50' },

    // Saturation boost / Doygunluk artır
    saturate: { effect: 'saturation:50' },

    // Desaturate / Doygunluk azalt
    desaturate: { effect: 'saturation:-50' },

    // Warm colors / Sıcak renkler
    warm: { effect: 'tint:40:red:yellow' },

    // Cool colors / Soğuk renkler
    cool: { effect: 'tint:40:blue:cyan' },

    // Red tint / Kırmızı ton
    red: { effect: 'colorize:50', color: 'red' },

    // Blue tint / Mavi ton
    blue: { effect: 'colorize:50', color: 'blue' },

    // Green tint / Yeşil ton
    green: { effect: 'colorize:50', color: 'green' },

    // ─────────────────────────────────────────────────────────────
    // SPECIAL EFFECTS / ÖZEL EFEKTLER  
    // ─────────────────────────────────────────────────────────────

    // Remove background - REQUIRES PAID CLOUDINARY
    // Arka planı kaldır - ÜCRETLİ CLOUDINARY GEREKTİRİR
    // removeBg: { effect: 'background_removal' },

    // Rotate 90 / 90 derece döndür
    rotate90: { angle: 90 },

    // Rotate 180 / 180 derece döndür
    rotate180: { angle: 180 },

    // Flip horizontal / Yatay çevir
    flip: { effect: 'hflip' },

    // Mirror vertical / Dikey ayna
    mirror: { effect: 'vflip' },

    // Shadow / Gölge
    shadow: { effect: 'shadow:50' },

    // Gradient fade / Degrade solma
    fade: { effect: 'gradient_fade:symmetric' },

    // Trim edges / Kenarları kes
    trim: { effect: 'trim' }
};

// ═══════════════════════════════════════════════════════════════
// UPLOAD FUNCTIONS / YÜKLEME FONKSİYONLARI
// ═══════════════════════════════════════════════════════════════

/**
 * Upload file to Cloudinary
 * Dosyayı Cloudinary'e yükle
 * 
 * @param {Buffer|string} data - File buffer or URL / Dosya buffer veya URL
 * @param {string} name - File name / Dosya adı
 * @param {string} type - File type / Dosya türü
 * @param {object} opts - Extra options / Ekstra seçenekler
 * @returns {Promise<object>}
 */
const upload = async (data, name, type = 'auto', opts = {}) => {
    try {
        // Create upload options / Yükleme seçenekleri
        const options = {
            public_id: name.split('.')[0] + '_' + Date.now(),
            resource_type: type,
            folder: 'discord_uploads',
            ...opts
        };

        // If buffer, convert to base64 / Buffer ise base64'e çevir
        let src = data;
        if (Buffer.isBuffer(data)) {
            src = `data:application/octet-stream;base64,${data.toString('base64')}`;
        }

        // Upload to Cloudinary / Cloudinary'e yükle
        const res = await cloudinary.uploader.upload(src, options);

        return {
            ok: true,
            url: res.secure_url,
            id: res.public_id,
            size: res.bytes,
            type: res.resource_type,
            format: res.format,
            width: res.width || null,
            height: res.height || null,
            created: res.created_at
        };
    } catch (e) {
        return { ok: false, err: e.message };
    }
};

/**
 * Upload with transformation
 * Dönüşümlü yükleme
 * 
 * @param {Buffer|string} data - File data / Dosya verisi
 * @param {string} name - File name / Dosya adı
 * @param {string} effect - Effect name / Efekt adı
 * @returns {Promise<object>}
 */
const uploadWithEffect = async (data, name, effect) => {
    const transform = transforms[effect];
    if (!transform) {
        return { ok: false, err: `Unknown effect: ${effect}` };
    }

    return upload(data, name, 'image', { transformation: transform });
};

// ═══════════════════════════════════════════════════════════════
// URL GENERATION / URL OLUŞTURMA
// ═══════════════════════════════════════════════════════════════

/**
 * Generate transformed URL
 * Dönüştürülmüş URL oluştur
 * 
 * @param {string} id - Public ID
 * @param {string} effect - Effect name / Efekt adı
 * @returns {string}
 */
const getUrl = (id, effect = null) => {
    const options = { secure: true };

    if (effect && transforms[effect]) {
        options.transformation = transforms[effect];
    }

    return cloudinary.url(id, options);
};

/**
 * Generate multiple effect URLs
 * Birden fazla efekt URL'si oluştur
 * 
 * @param {string} id - Public ID
 * @returns {object}
 */
const getAllEffects = (id) => {
    const urls = { original: cloudinary.url(id, { secure: true }) };

    for (const [name, transform] of Object.entries(transforms)) {
        urls[name] = cloudinary.url(id, { secure: true, transformation: transform });
    }

    return urls;
};

// ═══════════════════════════════════════════════════════════════
// FILE TYPE DETECTION / DOSYA TÜRÜ ALGILAMA
// ═══════════════════════════════════════════════════════════════

/**
 * Get resource type from extension
 * Uzantıdan kaynak türünü al
 * 
 * @param {string} name - File name / Dosya adı
 * @returns {string}
 */
const getType = (name) => {
    const ext = name.split('.').pop().toLowerCase();

    // Image types / Resim türleri
    const img = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'ico', 'tiff'];
    if (img.includes(ext)) return 'image';

    // Video types / Video türleri
    const vid = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'm4v'];
    if (vid.includes(ext)) return 'video';

    // Audio types / Ses türleri (Cloudinary uses video)
    const aud = ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac'];
    if (aud.includes(ext)) return 'video';

    return 'raw';
};

/**
 * Get emoji for file type
 * Dosya türü için emoji al
 * 
 * @param {string} name - File name / Dosya adı
 * @returns {string}
 */
const getEmoji = (name) => {
    const type = getType(name);
    const ext = name.split('.').pop().toLowerCase();

    if (type === 'image') return '🖼️';
    if (type === 'video') {
        if (['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac'].includes(ext)) return '🎵';
        return '🎬';
    }

    // Document types / Belge türleri
    const docs = { pdf: '📕', doc: '📘', docx: '📘', txt: '📝', zip: '📦', rar: '📦' };
    return docs[ext] || '📄';
};

// ═══════════════════════════════════════════════════════════════
// INFO & STATS / BİLGİ VE İSTATİSTİKLER
// ═══════════════════════════════════════════════════════════════

/**
 * Get file info
 * Dosya bilgisi al
 * 
 * @param {string} id - Public ID
 * @returns {Promise<object>}
 */
const getInfo = async (id) => {
    try {
        const res = await cloudinary.api.resource(id);
        return {
            ok: true,
            url: res.secure_url,
            type: res.resource_type,
            format: res.format,
            size: res.bytes,
            width: res.width,
            height: res.height,
            created: res.created_at
        };
    } catch (e) {
        return { ok: false, err: e.message };
    }
};

/**
 * Get account usage stats
 * Hesap kullanım istatistikleri
 * 
 * @returns {Promise<object>}
 */
const stats = async () => {
    try {
        const res = await cloudinary.api.usage();
        return {
            ok: true,
            used: res.credits?.used_percent || 0,
            storage: res.storage?.used_bytes || 0,
            storageLimit: res.storage?.limit || 0,
            bandwidth: res.bandwidth?.used_bytes || 0,
            bandwidthLimit: res.bandwidth?.limit || 0,
            transformations: res.transformations?.usage || 0,
            objects: res.objects?.used || 0
        };
    } catch (e) {
        return { ok: false, err: e.message };
    }
};

/**
 * Format bytes to human readable
 * Baytları okunabilir formata çevir
 * 
 * @param {number} bytes - Bytes / Bayt
 * @returns {string}
 */
const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
};

// ═══════════════════════════════════════════════════════════════
// DELETE & MANAGE / SİLME VE YÖNETME
// ═══════════════════════════════════════════════════════════════

/**
 * Delete file from Cloudinary
 * Cloudinary'den dosya sil
 * 
 * @param {string} id - Public ID
 * @param {string} type - Resource type / Kaynak türü
 * @returns {Promise<object>}
 */
const del = async (id, type = 'image') => {
    try {
        const res = await cloudinary.uploader.destroy(id, { resource_type: type });
        return { ok: res.result === 'ok', result: res.result };
    } catch (e) {
        return { ok: false, err: e.message };
    }
};

/**
 * List recent uploads
 * Son yüklemeleri listele
 * 
 * @param {number} max - Max results / Maksimum sonuç
 * @returns {Promise<object>}
 */
const list = async (max = 10) => {
    try {
        const res = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'discord_uploads',
            max_results: max
        });

        return {
            ok: true,
            files: res.resources.map(f => ({
                id: f.public_id,
                url: f.secure_url,
                format: f.format,
                size: f.bytes,
                created: f.created_at
            }))
        };
    } catch (e) {
        return { ok: false, err: e.message };
    }
};

/**
 * Search files by tag
 * Etikete göre dosya ara
 * 
 * @param {string} tag - Tag name / Etiket adı
 * @returns {Promise<object>}
 */
const search = async (tag) => {
    try {
        const res = await cloudinary.api.resources_by_tag(tag);
        return {
            ok: true,
            files: res.resources.map(f => ({
                id: f.public_id,
                url: f.secure_url
            }))
        };
    } catch (e) {
        return { ok: false, err: e.message };
    }
};

// ═══════════════════════════════════════════════════════════════
// CONNECTION TEST / BAĞLANTI TESTİ
// ═══════════════════════════════════════════════════════════════

/**
 * Test Cloudinary connection
 * Cloudinary bağlantısını test et
 * 
 * @returns {Promise<boolean>}
 */
const test = async () => {
    try {
        await cloudinary.api.ping();
        return true;
    } catch (e) {
        return false;
    }
};

// ═══════════════════════════════════════════════════════════════
// EXPORT / DIŞA AKTARMA
// ═══════════════════════════════════════════════════════════════

module.exports = {
    // Upload / Yükleme
    upload,
    uploadWithEffect,

    // URL / URL
    getUrl,
    getAllEffects,

    // Types / Türler
    getType,
    getEmoji,

    // Info / Bilgi
    getInfo,
    stats,
    formatBytes,

    // Manage / Yönetme
    del,
    list,
    search,

    // Test / Test
    test,

    // Transforms / Dönüşümler
    transforms,

    // Raw API / Ham API
    api: cloudinary
};
