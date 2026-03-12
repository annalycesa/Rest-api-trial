pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Mengambil kode terbaru dari GitHub
                checkout scm
            }
        }

        stage('Build & Deploy') {
            steps {
                // Use %SECRET_ENV% (Windows syntax) instead of $SECRET_ENV
                withCredentials([file(credentialsId: 'kada-express-env', variable: 'SECRET_ENV')]) {
                    bat '''
                    :: Windows uses 'copy' instead of 'cp'
                    copy "%SECRET_ENV%" .env
                    
                    :: Stop and remove old containers (|| ver > nul prevents crashing if they don't exist)
                    docker rm -f mongodb || ver > nul
                    docker rm -f express-app || ver > nul
                    
                    :: Build (removed the invalid -d flag)
                    docker build -t kada-backend .
                    
                    :: Run in detached mode (-d) so Jenkins can finish the build
                    docker run -d -p 3000:3000 --name express-app --env-file .env kada-backend

                    docker ps
                    '''
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
            // Windows uses 'del' instead of 'rm -f'
            bat 'if exist .env del .env'
        }
    }
}