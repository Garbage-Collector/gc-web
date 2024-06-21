pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // GitHub 레포지토리에서 develop 브랜치를 체크아웃
                git branch: 'develop', url: 'https://github.com/Garbage-Collector/gc-web'
            }
        }

        stage('Install Dependencies') {
            steps {
                // pnpm 설치 확인 및 설치
                sh 'npm install -g pnpm'
                // 프로젝트 의존성 설치
                sh 'pnpm install'
            }
        }

        stage('Build') {
            steps {
                // 빌드 명령어
                sh 'pnpm run build:pwa'
            }
        }

        stage('Deploy') {
            steps {
                // 배포 명령어
                sh 'pnpm run deploy'
            }
        }
    }

    post {
        always {
            // 항상 실행되는 단계 (예: 클린업)
            cleanWs()
        }
        success {
            // 빌드 성공 시 실행되는 단계
            echo 'Build succeeded!'
        }
        failure {
            // 빌드 실패 시 실행되는 단계
            echo 'Build failed!'
        }
    }
}

