pipeline {

    agent none

    stages {
        stage('Build content') {
            agent {
                docker {
                    image 'node:lts-alpine3.20'
                    label 'linux'
                    args '-v os_web_content:/var/www'
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
                WWWROOT_VOLUME = 'os_wwwroot'
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
                    withCredentials([usernamePassword(
                        credentialsId: 'DockerHubCredentials',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )]) {
                        sh 'printf "%s" "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin'
                        sh '''
                            if ! docker buildx inspect oscript-buildkit-v0.30.0 >/dev/null 2>&1; then
                                docker buildx create \
                                    --name oscript-buildkit-v0.30.0 \
                                    --driver docker-container \
                                    --driver-opt image=moby/buildkit:v0.30.0
                            fi
                            docker buildx inspect oscript-buildkit-v0.30.0 --bootstrap
                            docker buildx build \
                                --builder oscript-buildkit-v0.30.0 \
                                --load \
                                -t oscript/backend \
                                .
                        '''
                    }
                }
            }
        }
    }
}
