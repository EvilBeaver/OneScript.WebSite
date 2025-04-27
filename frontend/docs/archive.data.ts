import fs from 'fs';

export default {
    load() {
        return getVersions();
    }
}

export function getVersions() {
    var filesDir = process.env.VITEPRESS_FILES_DIR
    if (!filesDir) {
        throw new Error('Build requires site backend directory. Set VITEPRESS_FILES_DIR variable to server\'s files dir');
    }

    return fs.readdirSync(`${filesDir}/markdown/versions`)
        .filter((filename: string) => filename.endsWith('.md'))
        .map((filename: string) => filename.replaceAll('.md', ''));
}