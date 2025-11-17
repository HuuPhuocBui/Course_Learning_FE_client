module.exports = {
  apps: [
    {
      name: 'vite-app',
      script: 'npm',
      args: 'run preview',
      watch: false,
      env: {
        NODE_ENV: 'production',
        VITE_API_URL: process.env.VITE_API_URL,
        SSL_CERT: '~/projects/certificate.pem',
        SSL_KEY: '~/projects/private-key.pem'
      }
    }
  ],

  deploy: {
    production: {
      key: '~/projects/private-key.pem',
      user: 'root',
      host: '14.225.192.36',
      ref: 'origin/master',
      repo: 'git@github.com:Albet36/Study-FE.git',
      path: '~/projects/Front-End/Study-FE',
      'pre-deploy-local': '',
     'post-deploy': `
        source ~/.nvm/nvm.sh &&
        echo "Cài đặt dependencies..." &&
        npm install --production &&
        
        echo "Build Docker image..." &&
        docker build -t vite-app . &&
        
        echo "Dừng container cũ..." &&
        docker stop vite-app || true &&
        docker rm vite-app || true &&
        
        echo "Khởi chạy container mới..." &&
        docker run -d \
          --name vite-app \
          -p 4173:4173 \
          -p 443:443 \
          -v /etc/ssl:/etc/ssl \
          -v /var/log/vite-app:/var/log \
          -e NODE_ENV=production \
          -e VITE_API_URL=\${VITE_API_URL} \
          vite-app
      `,
 'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
