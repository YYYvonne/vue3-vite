#!/bin/bash

version=${2:-""}
srcpath=$(pwd)
distpath=${DKWEB_DIST_PATH:-"D:\novel\dist"}
verpath=$srcpath/dist/version.txt
dist_path=$srcpath/dist
compilerpath=${COMPILER_PATH:-"//192.168.1.23/compile/cmds"}
qfile=Q-lite-develop-HEAD
 
print_exit() { echo "$1" >&2 && exit 1; }
# check current path

# check_path() {
#   if [[ -d $distpath && -d $compilerpath && $distpath == *"dkweb_dist" ]]; then return; fi
#   print_exit "path $distpath or $compilerpath is not valid"
# }

do_build() { cd $srcpath && pnpm run build && du -hd 0 dist/; }
do_replace() { cd $distpath && rm -rf * && cp -a $srcpath/dist/* ./; }
# do_compile() { cd $compilerpath && ls -l && touch $qfile && echo "starting compile in  $compilerpath"; } # add ls to try to fix garbled problem

do_vgen() {
  if [[ -z $version ]]; then
  cd $srcpath || exit 1
  branch=$(git rev-parse --abbrev-ref HEAD)
  id=$(git rev-parse --short HEAD)
  rev=$(git rev-list HEAD | wc -l | awk '{print $1}')
  date="$(git log -n 1 --format=%ai)"
  version="$branch (r$rev $id) $date"
  fi
  echo "dkweb: $version, build time $(date)" >$verpath
}
do_git() { git add . && git commit -m "fix: new publish $version by script" && git pull --rebase && git push; }



cwd=$(pwd)
# check_path

case "$1" in
# compile) do_compile ;;
bpack) do_build && do_vgen ;;
pack) do_vgen ;;
*) echo "\$1=$1" && do_build && do_vgen &&  do_replace && do_git ;;
esac

echo "Successfully ,file exists in $dist_path "

