#!/bin/sh

# To run with the keyboard input package, the python
# script must be run with sudo.

exec sudo su -c "source ./.venv/bin/activate && python3 ."
