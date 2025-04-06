import fs from 'fs'

export default {
    paths() {
        
        const exclusions = [
            'latest',
            'night-build',
            'preview',
            'lts',
            'latest-dev'
        ];
        
        return fs.readdirSync('../backend/files/markdown/versions')
            .map((filename) => filename.replaceAll('.md', ''))
            .filter((filename) => exclusions.indexOf(filename) === -1)
            .map((version) => {
                return { params: { version }}
            })
    }
}
