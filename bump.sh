#!/bin/sh
# Met à jour le numéro de version affiché sur la page d'accueil (à lancer avant chaque commit)
cd "$(dirname "$0")"
N=$(( $(cat .build 2>/dev/null || echo 0) + 1 )); echo $N > .build
D=$(TZ=Europe/Paris date '+%d/%m %H:%M')
V="n°$N · $D"
printf '{"v":"%s"}\n' "$V" > version.json
sed -i "s|const VERSION='[^']*'|const VERSION='$V'|" index.html
echo "Version $V"
