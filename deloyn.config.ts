import { defineConfig } from 'deloyn';

// https://www.npmjs.com/package/deloyn

export default defineConfig({
  serverIp: '1.2.3.4',        // Remote server IP
  username: 'ubuntu',         // SSH username
  remotePath: '/var/www/app', // Path on remote server
  sshKey: '~/.ssh/id_rsa',    // SSH private key path
  excluded: [                 // Files or directories to exclude
    '.git',
    'node_modules',
    'dist',
    'README.md',
  ],
  batchSize: 5,               // Concurrent uploads per batch
  localPath: process.cwd(),   // Local root path to upload
  scripts: [                  // The commands are executed sequentially after deploy. It is up to you which package manager you use (pnpm, yarn, npm...).
    "npm install",
    "npm run build"
  ]
});