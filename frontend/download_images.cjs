const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

const dir = path.join(__dirname, 'src', 'assets', 'images');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const images = {
    'web-dev.jpg': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    'mobile-app.jpg': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    'backend.jpg': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'cloud.jpg': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    'marketing.jpg': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'data.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'fullstack.jpg': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    'portfolio-default.jpg': 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80',
    'custom-dev-bg.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    'team-meeting.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
};

async function downloadFiles() {
    for (const [filename, url] of Object.entries(images)) {
        const dest = path.join(dir, filename);
        try {
            const res = await fetch(url);
            const fileStream = fs.createWriteStream(dest, { flags: 'wx' });
            await finished(Readable.fromWeb(res.body).pipe(fileStream));
            console.log(`Downloaded ${filename}`);
        } catch (e) {
            console.error(`Error downloading ${filename}: ${e.message}`);
        }
    }
}

downloadFiles();
