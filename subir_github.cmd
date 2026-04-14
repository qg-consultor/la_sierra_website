@echo off
echo Buscando Git en tu sistema...
set "GIT_PATH=C:\Program Files\Git\cmd\git.exe"

if not exist "%GIT_PATH%" (
    set "GIT_PATH=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
)

if not exist "%GIT_PATH%" (
    echo [ERROR] Git no esta disponible. Por favor instala explícitamente desde git-scm.com
    pause
    exit /b
)

echo Iniciando subida segura a tu repositorio local...
"%GIT_PATH%" push -u origin main
echo.
echo Proceso finalizado. Puedes cerrar esta ventana.
pause
