# Medical Assistant - AI Service Startup
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Medical Assistant - AI Service" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

$projectRoot = "c:\Users\hp\Desktop\AI-Powered Smart Medical Assistant for Patient Records, Report Analysis & Clinical"
Set-Location "$projectRoot\apps\ai-service"

Write-Host ""
Write-Host "Checking Python installation..." -ForegroundColor Yellow
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Found: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Python not found. Please install Python 3.8+." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing AI service dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray

pip install -r requirements.txt

Write-Host ""
Write-Host "Starting AI Service..." -ForegroundColor Yellow
Write-Host "Service will be available at http://localhost:8000" -ForegroundColor Green

python -m uvicorn app.main:app --host 0.0.0.0 --port 8000