"""Send a one-letter command to the board over USB and print its reply up to the "DONE" line.

Usage: python3 firmware/tools/send_command.py /dev/cu.usbmodem2101 t
"""

import os
import sys
import time

from record_test import open_port

TIMEOUT_SECONDS = 120


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    port, command = sys.argv[1], sys.argv[2]
    fd = open_port(port)
    try:
        os.write(fd, command.encode())
        deadline = time.time() + TIMEOUT_SECONDS
        reply = bytearray()
        while b"DONE" not in reply:
            if time.time() > deadline:
                sys.exit(f"No DONE from the board. It said: {reply.decode(errors='replace')}")
            reply += os.read(fd, 4096)
    finally:
        os.close(fd)
    print(reply.decode(errors="replace").split("DONE")[0].strip())


if __name__ == "__main__":
    main()
