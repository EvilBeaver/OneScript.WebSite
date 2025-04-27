import { getVersions } from '../../archive.data.ts'

export default {
    paths() {
        
        const exclusions = [
            'latest',
            'night-build',
            'preview',
            'lts',
            'latest-dev'
        ];
        
        return getVersions()
            .filter((filename) => exclusions.indexOf(filename) === -1)
            .map((version) => {
                return { params: { version }}
            })
    }
}
