#!/bin/bash

counter=1
myIp="10.0.0.171"
while [ $counter -le 10 ]
do
	ip=$(ip route get 8.8.8.8 | awk '{print $NF; exit}')
	echo \"$ip\" == \"$myIp\"
	if [ "$ip" \> "$myIp" ] || [ "$ip" \< "$myIp" ]; then
		echo "connected"
		serverNotRunning=$(nping -c 1 -p 8080 $ip | grep "Successful connections: 0")
		echo $serverNotRunning: here : $vpnIp
		if [ "$serverNotRunning" ]; then
			vpnIp=$(ip route get 8.8.8.8 | awk '{print $NF; exit}')
			gnome-terminal -e "npm run start $vpnIp"
			echo "# aboutMe\n<a href='http://$vpnIp:8080' target='_blank'>Go To Application</a>\n<br>\n" > ./readme/1_header.md
			cat ./readme/* > README.md
			sleep 5
			git add ./README.md
			git commit -m "Automated Project Url Update"
			git push origin master
		fi
	else
		echo "disconnected"
		sudo kill $(sudo lsof -t -i:8080)
		purevpn -c
	fi
	sleep 20
done
