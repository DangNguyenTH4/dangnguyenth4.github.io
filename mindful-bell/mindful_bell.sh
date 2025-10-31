#!/bin/bash
SOUND="./bell-transition-1-305458.wav"   # đổi sang file bạn muốn
INTERVAL=900  # 30 phút

while true; do
  notify-send "🌿 Tỉnh thức" "Dừng lại 3 hơi thở - quay về hiện tại"
  paplay "$SOUND"
  sleep $INTERVAL
done

