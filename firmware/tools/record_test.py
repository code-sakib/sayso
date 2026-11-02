"""Ask the mic-test firmware for a recording over USB and save it as a WAV.

Usage: python3 firmware/tools/record_test.py /dev/cu.usbmodem2101 out.wav
Uses only the standard library (termios), so no pyserial is needed.
"""

import os
import sys
import termios
import time
import wave

SAMPLE_RATE = 16000
TIMEOUT_SECONDS = 30


def open_port(path: str) -> int:
    fd = os.open(path, os.O_RDWR | os.O_NOCTTY)
    attrs = termios.tcgetattr(fd)
    attrs[0] = 0  # iflag: no input translation
    attrs[1] = 0  # oflag: raw output
    attrs[2] = termios.CS8 | termios.CREAD | termios.CLOCAL
    attrs[3] = 0  # lflag: no echo, not line-buffered
    attrs[4] = attrs[5] = termios.B115200
    attrs[6][termios.VMIN] = 0
    attrs[6][termios.VTIME] = 1  # reads return after 0.1 s of quiet
    termios.tcsetattr(fd, termios.TCSANOW, attrs)
    termios.tcflush(fd, termios.TCIOFLUSH)
    return fd


def read_until(fd: int, buffer: bytearray, marker: bytes, deadline: float) -> int:
    while marker not in buffer:
        if time.time() > deadline:
            raise TimeoutError(f"no {marker!r} from the board; got {bytes(buffer[-200:])!r}")
        buffer += os.read(fd, 65536)
    return buffer.index(marker)


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    port, out_path = sys.argv[1], sys.argv[2]
    fd = open_port(port)
    try:
        os.write(fd, b"r")
        print("Recording… talk near the board now.")
        deadline = time.time() + TIMEOUT_SECONDS
        buffer = bytearray()
        start = read_until(fd, buffer, b"BEGIN ", deadline)
        line_end = read_until(fd, buffer, b"\n", deadline)
        size = int(buffer[start + 6 : line_end])
        payload_start = line_end + 1
        while len(buffer) < payload_start + size:
            if time.time() > deadline:
                raise TimeoutError(f"only got {len(buffer) - payload_start} of {size} bytes")
            buffer += os.read(fd, 65536)
        audio = bytes(buffer[payload_start : payload_start + size])
    finally:
        os.close(fd)

    with wave.open(out_path, "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(SAMPLE_RATE)
        wav.writeframes(audio)
    print(f"Saved {size / (SAMPLE_RATE * 2):.1f} s to {out_path}")


if __name__ == "__main__":
    main()
