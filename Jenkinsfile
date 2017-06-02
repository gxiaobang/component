pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        git(url: 'https://github.com/gxiaobang/component.git', branch: '*/dev', changelog: true)
        sh '''yarn install
yarn build'''
      }
    }
  }
}