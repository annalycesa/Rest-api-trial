pipeline {
  agent any

  environment {
    PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" 
  }

  stages {

    stage('Clone Repo') {
      steps {
        git url: 'https://github.com/annalycesa/Rest-api-trial.git',
        branch: 'main'
      }
    }

    stage('Inject ENV') {
      steps {
        withCredentials([file(credentialsId: 'env-file', variable: 'ENVFILE')]) {
          sh '''
          rm -f .env
          cp "$ENVFILE" .env
          chmod 600 .env
          '''
        }
      }
    }

    stage('Build Docker') {
      steps {
        sh 'docker compose build'
      }
    }

    stage('Deploy') {
      steps {
        sh '''
        docker compose down || true
        docker compose up -d --build
        docker ps
        '''
      }
    }

  }
}