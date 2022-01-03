#!/bin/bash

rm -f /myapp/tmp/pids/server.pid

exec "$@"