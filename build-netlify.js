#!/usr/bin/env node

// Netlify用のビルドスクリプト
// Viteビルドのみ実行（サーバーは不要）

import { execSync } from 'child_process';

try {
  console.log('🏗️  Netlify build starting...');
  
  // Viteでクライアントをビルド
  console.log('📦 Building client...');
  execSync('vite build', { stdio: 'inherit' });
  
  console.log('✅ Netlify build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}