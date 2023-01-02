#!/bin/sh
# 백업. server/instance_backup에 생성된다
sqlite="ntrpplus_flask.sqlite"
bak_filename="back_$(date '+%y%m%d%H%M%S')_${sqlite}"
current_directory=$(pwd)
temp_command=".backup '${current_directory}/instance_backup/${bak_filename}'"
sqlite3 ${current_directory}/instance/${sqlite} "${temp_command}"

# 로테이트. server/instance_backup을 최신 5개로 유지한다

find "${current_directory}/instance_backup" -maxdepth 1 -type f -name '*.sqlite' -print0 \
  | sort -rz \
  | tail -zn+6 \
  | xargs -t0 -n1 rm -f


# 복원. server/instance에 생성된다
# target_filename="${bak_filename}" #이 변수를 복원할 파일로 바꾼다
# echo ${target_filename}
# temp_command2=".restore '${current_directory}/instance_backup/${target_filename}'"
# restored_filename="restored_${bak_filename}"
# sqlite3 ${current_directory}/instance/${restored_filename} "${temp_command2}"
