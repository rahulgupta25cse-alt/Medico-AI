@echo off
setlocal

set "ROOT=%~dp0"
pushd "%ROOT%apps\frontend" || (
  echo [ERROR] Could not open apps\frontend
  exit /b 1
)

echo([INFO] Starting frontend from: "%CD%"

if not exist "node_modules\vite\bin\vite.js" (
  echo [INFO] Installing frontend dependencies...
  call npm.cmd install
  if errorlevel 1 (
    echo [ERROR] npm install failed.
    popd
    exit /b 1
  )
)

echo [INFO] Launching Vite on http://localhost:5173
set "VITE_DISABLE_AUTH=true"
set "VITE_DEMO_EMAIL=demo.clinician@hospital.com"
set "VITE_DEMO_PASSWORD=SecurePass123!"
node "node_modules\vite\bin\vite.js" --host 0.0.0.0 --port 5173
set "EXIT_CODE=%ERRORLEVEL%"

popd
exit /b %EXIT_CODE%
