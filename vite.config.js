import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        temperaturas: 'temperaturas.html',
        diabetes: 'diabetes.html',
        ros2: 'ros2.html',
        vot: 'vot.html',
        bonsaido: 'bonsaido.html'
      }
    }
  }
})