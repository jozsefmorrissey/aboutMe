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
			echo "<a href="http://$vpnIp:8080">Go</a>" > siteLink.html
		fi
	else
		echo "disconnected"
		purevpn -c
	fi
	sleep 20
done
