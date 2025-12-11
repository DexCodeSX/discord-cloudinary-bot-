# ☁️ Discord Cloudinary Bot

Discord bot for file upload to Cloudinary. Simple and fast!
Discord dosya yükleme botu. Basit ve hızlı!

**Made by Bisam ❤️**

---

## ✨ What it does / Ne yapar

- Upload files to cloud / Dosyaları buluta yükle
- 30+ image effects / 30+ resim efekti
- Works on Windows, Termux, VPS
- Simple commands / Basit komutlar

---

## 🚀 Setup / Kurulum

### 1. Install Node.js

**Windows:** Download from nodejs.org

**Termux:**
```bash
pkg install nodejs
```

**Linux/VPS:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs
```

### 2. Get Bot Token

1. Go to discord.com/developers
2. Create new application
3. Go to Bot tab
4. Copy token

### 3. Configure

Edit `.env` file:
```env
TOKEN=your_discord_token
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

### 4. Run / Çalıştır

```bash
npm install
node bot.js
```

---

## 🎮 Commands / Komutlar

| Command | What it does / Ne yapar |
|---------|-------------------------|
| `.help` | Show commands / Komutları göster |
| `.upload` | Upload file / Dosya yükle |
| `.effects` | Show effects / Efektleri göster |
| `.effect blur` | Apply blur / Bulanık efekt |
| `.ping` | Check speed / Hız kontrol |
| `.stats` | Bot stats / Bot istatistik |
| `.cloud` | Cloud status / Bulut durumu |
| `.info` | Bot info / Bot bilgi |

---

## 🎨 Effects / Efektler

**Resize / Boyut:** `thumb` `square` `circle` `face` `large`

**Filters / Filtreler:** `blur` `softblur` `gray` `sepia` `sharpen`

**Artistic / Sanatsal:** `cartoon` `oil` `pixel` `vignette` `vintage`

**Colors / Renkler:** `bright` `dark` `warm` `cool` `red` `blue` `green`

**Special / Özel:** `rotate90` `flip` `mirror` `shadow` `fade`

---

## 📁 Files / Dosyalar

```
bot/
├── bot.js          # Main bot / Ana bot
├── config.js       # Settings / Ayarlar
├── .env            # Secrets / Gizli bilgiler
├── package.json    # Dependencies
└── utils/
    ├── log.js      # Console colors
    ├── install.js  # Auto install
    └── cloud.js    # Cloudinary API
```

---

## ❓ Problems / Sorunlar

**Bot not starting? / Bot başlamıyor mu?**
- Check TOKEN in .env
- Run `npm install` again

**Upload failed? / Yükleme başarısız mı?**
- Check Cloudinary credentials
- File too big? Max 100MB

**Package error? / Paket hatası mı?**
- Delete node_modules folder
- Run `npm install` again

---

## � License

MIT - Free to use / Ücretsiz kullanım

**Made by Bisam** ❤️
