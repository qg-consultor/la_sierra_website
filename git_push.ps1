$git = "C:\Program Files\Git\cmd\git.exe"
if (Test-Path $git) {
    & $git init
    & $git config user.name "Q.Quetzalcoatl"
    & $git config user.email "qg-consultor@users.noreply.github.com"
    & $git add .
    & $git commit -m "Site release integration"
    & $git branch -M main
    & $git remote rm origin 2>$null
    & $git remote add origin https://github.com/qg-consultor/la_sierra_website.git
    & $git push -u origin main
} else {
    $gitLocal = "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
    if (Test-Path $gitLocal) {
        & $gitLocal init
        & $gitLocal config user.name "Q.Quetzalcoatl"
        & $gitLocal config user.email "qg-consultor@users.noreply.github.com"
        & $gitLocal add .
        & $gitLocal commit -m "Site release integration"
        & $gitLocal branch -M main
        & $gitLocal remote rm origin 2>$null
        & $gitLocal remote add origin https://github.com/qg-consultor/la_sierra_website.git
        & $gitLocal push -u origin main
    } else {
        Write-Output "GIT_NOT_FOUND" 
    }
}
