pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Mengambil kode terbaru dari GitHub
                checkout scm
            }
        }

        stage('Build & Deploy with Docker Compose') {
            steps {
                // Mengambil file .env dari Jenkins Credentials dan men-deploy dengan Docker
                withCredentials([file(credentialsId: 'env-file', variable: 'SECRET_ENV')]) {
                    sh 'cp $SECRET_ENV .env'

                    // 1. Bersihkan paksa container lama jika masih nyangkut
                    sh 'docker rm -f mongodb || true'
                    sh 'docker rm -f express-app || true'
                    
                    sh 'docker build -t kada-backend'

                    sh 'docker run -p 3000:3000 --env-file .env kada-backend'
                    

                    sh 'docker ps'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline berhasil! REST API sudah berjalan.'
        }
        failure {
            echo 'Pipeline gagal. Silakan cek log Jenkins.'
        }
        always {
            // Menghapus file .env untuk keamanan
            sh 'rm -f .env'
        }
    }
}