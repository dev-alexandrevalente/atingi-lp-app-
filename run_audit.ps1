Write-Host "=== MISSÃO PERFORMANCE 90+ ==="
Write-Host "1. Buildando a aplicação para carregar novas otimizações SSR na V1..."
npm run build

Write-Host "2. Subindo servidor na porta 3005..."
$process = Start-Process "npx" -ArgumentList "next start -p 3005" -PassThru -NoNewWindow
Start-Sleep -Seconds 8

Write-Host "3. Rodando Lighthouse na Rota V1 (Mobile 4G Simulation)..."
npx --yes lighthouse http://localhost:3005/atingi-fnofd-0001-demo-mads-v1 --chrome-flags="--headless" --output="json" --output-path="v1-lh.json" --form-factor="mobile" --only-categories="performance"

Write-Host "4. Rodando Lighthouse na Landing Page Principal (Mobile 4G Simulation)..."
npx --yes lighthouse http://localhost:3005/ --chrome-flags="--headless" --output="json" --output-path="main-lh.json" --form-factor="mobile" --only-categories="performance"

Write-Host "5. Desligando servidor..."
Stop-Process -Id $process.Id -Force
npx kill-port 3005

Write-Host "=== TESTES CONCLUÍDOS ==="
