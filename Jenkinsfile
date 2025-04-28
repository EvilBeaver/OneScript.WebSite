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
                    sh 'npm install && npm docs:build'
                }
                dir('backend') {
                    sh 'docker build -t oscript/backend .'
                }
            }
        }
    }
}