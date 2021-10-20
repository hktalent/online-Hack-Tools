#!/bin/bash

xx=$(netstat -avn|awk '{print $1"\t"$4"\t"$5}'|grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}")
if [[ "f" = $1 ]];
  then
    echo -e "${xx}"|grep -Eo "([0-9]{1,3}\.){3}[0-9]{1,3}"|sort -u|uniq;
else
  echo -e "${xx}";
fi
