import fs from 'fs';
import axios from 'axios'
import { IVersionInfo } from '../../shared/Archive';

/*
    
    Способы сборки:

    1. При работающем бэкенде, через REST получить номера опубликованных версий. Задать переменную VITEPRESS_BACKEND_HOST
    2. Напрямую из каталога с MD-файлами бэка. Задать переменную VITEPRESS_FILES_DIR

*/

export default {
    async paths() {
        
        const exclusions = [
            'latest',
            'night-build',
            'preview',
            'lts',
            'latest-dev'
        ];
        
        return (await getVersions())
            .filter((info) => exclusions.indexOf(info.token) === -1)
            .map((info) => {
                return { params: { version: info.token }}
            });
    }
}

async function getVersions(): Promise<IVersionInfo[]> {
    var host = process.env.VITEPRESS_BACKEND_HOST;
    if (host) {
        return await getVersionsFromBackend(host);
    }

    var filesDir = process.env.VITEPRESS_FILES_DIR;
    if (filesDir) {
        return Promise.resolve(getVersionsFromFiles(filesDir));
    }

    return Promise.resolve([]);
}

async function getVersionsFromBackend(host: string): Promise<IVersionInfo[]> {
    var host = process.env.VITEPRESS_BACKEND_HOST
    var response = await axios.get(host + '/api/archive');
    if (response.status != 200)
        throw new Error(response.data);

    return response.data;
}

function getVersionsFromFiles(filesDir: string): IVersionInfo[] {
    return fs.readdirSync(`${filesDir}/markdown/versions`)
        .filter((filename: string) => filename.endsWith('.md'))
        .map((filename: string) => filename.replaceAll('.md', ''))
        .map((token: string) => {
            return {
                token,
                presentation: versionPresentation(token)
            };
        });
}

function versionPresentation(token: string): string {
    return token.replaceAll('_', '.');
}