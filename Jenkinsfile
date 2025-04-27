pipeline {
    
    parameters {
        choice(
            name: 'UPDATE_DESCRIPTION',
            choices: ['none', 'latest', 'preview', 'lts'], 
            description: 'Update description for deployed version'
        )
        string(
            name: 'DEPLOYED_VERSION':
            description: 'Deployed version token. i.e. 1_9_3'
        )
    }

    agent { label: 'linux' }

    stages {
        stage ('Prepare files') {
            when {
                expression {
                    return params.UPDATE_DESCRIPTION != 'none'
                }
            }
            steps {
                dir ('frontend/docs/downloads/archive') {
                    sh '''
                    if [ -z "" ]

                    if [ -f "${DEPLOYED_VERSION}.md" ]
                        rm "${UPDATE_DESCRIPTION}.md"
                        cp "${DEPLOYED_VERSION}.md" "${UPDATE_DESCRIPTION}.md"
                    fi
                    '''.stripIndent()
                }
            }
        }
        stage('Build content') {
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
            }
        }
    }
}