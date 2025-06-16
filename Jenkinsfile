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
                VITEPRESS_BACKEND_HOST="http://site/"
                VITEPRESS_FILES_DIR='/var/www/oscript.io'
            }

            steps {
                dir('frontend') {
                    sh 'npm install && npm run docs:build'
                }
            }
        }
        stage('Create container') {
            agent {
                label 'linux'
            }
            steps {
                dir('backend') {
                    sh 'docker buildx build --load -t oscript/backend .'
                }

                sh 'docker-compose stop site && docker-compose rm -f site && docker-compose up -d site'
            }
        }
    }
}