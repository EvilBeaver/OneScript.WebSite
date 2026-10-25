pipeline {

    agent none

    stages {
        stage('Build content') {
            agent {
                docker {
                    image 'node:lts-alpine3.20'
                    label 'linux'
                }
            }

            environment {
                VITEPRESS_FILES_DIR='/var/www/oscript.io'
            }

            steps {
                dir('frontend') {
                    sh 'npm install && npm run docs:build'
                }
                stash name: 'wwwroot', includes: 'backend/data/wwwroot/**'
            }
        }
        stage('Publish content') {
            agent {
                label 'linux'
            }
            environment {
                // Имя тома на хосте: <compose_project>_wwwroot (см. deploy/docker-compose.wwwroot-volume.example.yml)
                WWWROOT_VOLUME = 'oscript_wwwroot'
            }
            steps {
                unstash 'wwwroot'
                sh '''
                    tar -cf - -C backend/data/wwwroot . \
                      | docker run --rm -i -v ${WWWROOT_VOLUME}:/dst alpine:3.20 sh -c '
                            apk add --no-cache rsync >/dev/null &&
                            mkdir -p /tmp/new &&
                            tar -xf - -C /tmp/new &&
                            rsync -a --delete-after /tmp/new/ /dst/
                        '
                '''
            }
        }
        stage('Create container') {
            agent {
                label 'linux'
            }
            steps {
                unstash 'wwwroot'
                dir('backend') {
                    sh 'docker buildx build --load -t oscript/backend .'
                }
            }
        }
    }
}
