pipeline {

    agent { label: 'linux' }

    stages {
        stage('Build content') {
            environment {
                VITEPRESS_FILES_DIR='/var/www/oscript.io'
            }
            agent {
                docker {
                    image 'node:lts-alpine3.20'
                    reuseNode: true
                }
            }

            steps {
                dir('frontend') {
                    sh 'npm install && npm docs:build'
                }
                dir('backend') {
                    sh 'docker build -t oscript/backend .'
                }
            }
        }
    }
}