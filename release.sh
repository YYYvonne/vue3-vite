#!/bin/bash.exe

version=${2:-""}
srcpath=$(pwd)
distpath=${DKWEB_DIST_PATH:-"D:/novel/dkweb_dist"}
compilerpath=${COMPILER_PATH:-"/root/projects/share/s23"}
verpath=$srcpath/dist/version.txt
qfile=Q-lite-develop-HEAD

print_exit() { echo "$1" >&2 && exit 1; }
# 打印错误的消息并终止脚本的执行，确保错误得到适当的处理

# check_path() {
#   if [[ -d $distpath && -d $compilerpath && $distpath == *"dkweb_dist" ]]; then return; fi
#   print_exit "path $distpath or $compilerpath is not valid"
# }

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
# 1. 首先，它检查变量 `$version` 是否为空 (`-z` 表示为空)。
# 2. 如果 `$version` 为空，则执行以下操作：
#    - 切换到 `$srcpath` 目录（当前工作目录）。
#    - 使用 `git rev-parse --abbrev-ref HEAD` 命令获取当前 Git 仓库的分支名称，并将结果赋值给变量 `branch`。
#    - 使用 `git rev-parse --short HEAD` 命令获取当前 Git 仓库最新提交的短 SHA-1 值，并将结果赋值给变量 `id`。
#    - 使用 `git rev-list HEAD | wc -l | awk '{print $1}'` 命令获取当前 Git 仓库的提交数量，并将结果赋值给变量 `rev`。
#    - 使用 `git log -n 1 --format=%ai` 命令获取最新提交的日期和时间，并将结果赋值给变量 `date`。
#    - 使用上述获取的信息构建一个版本字符串，格式为 `分支名称 (r提交数量 短SHA-1值) 日期时间`，并将结果赋值给变量 `version`。
# 3. 最后，使用 `echo` 命令将生成的版本信息写入到文件 `$verpath` 中。
# 这段代码的目的是根据 Git 仓库的信息生成一个版本字符串，并将其写入到指定的文件中，以便记录构建时的版本和时间信息。

do_build() { cd $srcpath && pnpm run build && du -hd 0 dist/; }
do_replace() { cd $distpath && rm -rf * && cp -a $srcpath/dist/* ./; }
do_git() { git add . && git commit -m "fix: new publish $version by script" && git pull --rebase && git push; }
# do_compile() { cd $compilerpath && ls -l && touch cmds/$qfile && echo "a compile task started on $compilerpath"; } # add ls to try to fix garbled problem
do_pack() {
  outpath=$srcpath/output
  rm -rf $outpath && mkdir -p $outpath

  cp -a $srcpath/dist $outpath/tmp && cd $outpath/tmp || exit 1
  tar -cf ../dkweb.tar *
  cp -a $srcpath/doc/logo/* ./ && tar -cf ../dkweb_logo.tar *
  cp -a $srcpath/doc/lt/* ./ && tar -cf ../dkweb_lt.tar *
  cd .. && ls -lh *.tar

  mkdir -p $outpath/rootfs_tmp
  cp -a $srcpath/dist $outpath/rootfs_tmp/www && cd $outpath/rootfs_tmp || exit 1
  cp -a $srcpath/doc/DEBIAN ./ || exit 1
  chmod -R 755 DEBIAN
  nversion=$(echo $version | sed 's/.*\/\([0-9\.]\+\).*/\1/')
  [[ -z $nversion || $nversion == $version ]] && nversion="0.0.1"
  sed -i "s/1.0.0/$nversion/" DEBIAN/control
  sed -i "s/DETAIL/$version/" DEBIAN/control
  cd $outpath && dpkg -b $outpath/rootfs_tmp dkweb.deb
}

cwd=$(pwd)
# check_path

case "$1" in
# compile) do_compile ;;
bpack) do_build && do_vgen && do_pack ;;
pack) do_vgen && do_pack ;;
*) echo "\$1=$1" && do_build && do_vgen && do_pack && do_replace && do_git;;
esac

cd $cwd