#!/bin/bash

# IMPORTANT: Requires tmux to be installed.

# To install tmux on Ubuntu:
# sudo apt-get update
# sudo apt-get install tmux

# To install tmux on Mac:
# brew install tmux

# This script starts the server, waits for it to be up and running,
# starts Apache Bench to send 10,000 requests with 100 concurrent
# connections, and then stops the server. We can then view the
# server logs to see that the server was able to gracefully stop
# and that all the requests were served.

stop() {
  # find the PID of the server
  server_pid=$(lsof -i :3000 -t)
  # send SIGTERM signal
  kill -15 "$server_pid"
}

# start the server in a new tmux pane
tmux new-session -d -s "server" "yarn nx serve gzipr"

# wait for the server to be up and running
while ! nc -z localhost 3000; do sleep 1; done

# start Apache Bench in a new tmux pane
tmux split-window -v "ab -n 10000 -c 100 http://localhost:3000/status"

# call the function to gracefully stop the server
stop

# attach to the tmux session to view both panes
tmux attach-session -t "server"
