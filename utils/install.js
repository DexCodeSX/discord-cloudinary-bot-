/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  INSTALL - Auto install packages                             ║
 * ║  INSTALL - Paketleri otomatik yükle                          ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const { execSync } = require('child_process');
const path = require('path');

// Check if package exists / Paketin var olup olmadığını kontrol et
const has = (pkg) => {
    try {
        require.resolve(pkg);
        return true;
    } catch (e) {
        return false;
    }
};

// Install one package / Bir paketi yükle
const add = (pkg) => {
    console.log(`  📦 Installing ${pkg}... / ${pkg} yükleniyor...`);
    try {
        execSync(`npm install ${pkg}`, {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..')
        });
        console.log(`  ✓ ${pkg} installed! / Yüklendi!`);
        return true;
    } catch (e) {
        console.log(`  ✖ Failed to install ${pkg} / Yükleme başarısız`);
        return false;
    }
};

// Check and install if needed / Gerekirse kontrol et ve yükle
const check = (pkg) => {
    if (has(pkg)) return true;
    return add(pkg);
};

// Check all packages / Tüm paketleri kontrol et
const all = () => {
    // Required packages / Gerekli paketler
    const pkgs = [
        'discord.js',
        'cloudinary',
        'dotenv',
        'chalk',
        'node-fetch'
    ];

    console.log('');
    console.log('  ╭─────────────────────────────────────╮');
    console.log('  │  🔍 Checking Packages / Kontrol    │');
    console.log('  ╰─────────────────────────────────────╯');
    console.log('');

    let ok = true;

    for (const pkg of pkgs) {
        if (has(pkg)) {
            console.log(`  ✓ ${pkg} - OK`);
        } else {
            console.log(`  ✖ ${pkg} - Missing, installing...`);
            console.log(`    ${pkg} - Eksik, yükleniyor...`);
            if (!add(pkg)) ok = false;
        }
    }

    console.log('');

    if (ok) {
        console.log('  ✓ All packages ready! / Tüm paketler hazır!');
    } else {
        console.log('  ⚠ Some packages failed / Bazı paketler başarısız');
        console.log('    Try: npm install');
    }

    console.log('');
    return ok;
};

module.exports = { has, add, check, all };
