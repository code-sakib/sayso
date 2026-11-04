# SaySo badge hardware

The badge is a Seeed XIAO ESP32S3 Sense in a round black case (Ø56 × 13.5 mm on the website design,
growing to about Ø66 mm so the battery fits; see Known issues), with a red recording light on the
front, a button and power switch on the left edge, USB-C on top and a magnet on the back.

## Parts ordered

One order, ₹2,833.92 total (₹2,351.63 + 18% IGST ₹423.29 + ₹59 shipping).

| Part | Model | Qty | Price | Total | Used for |
|---|---|---|---|---|---|
| KP 403450 3.7 V 1000 mAh LiPo battery | 07923 | 2 | ₹178.00 | ₹356.00 | Powers the badge for a shift (second one is a spare) |
| Seeed XIAO ESP32-S3 Sense (113991115) | 05338 | 1 | ₹2,249.00 | ₹2,249.00 | The badge: chip, Wi-Fi, microphone, microSD slot |
| Red LED, 3 mm, diffused, 150–200 mcd | 04727 | 5 | ₹2.00 | ₹10.00 | Recording light on the front |
| Male-to-male jumper wires, 20 cm, set of 40 | 01881 | 1 | ₹57.82 | ₹57.82 | Breadboard testing; can be cut up as hook-up wire |
| 220 Ω 1/4 W resistors, pack of 10 | 02879 | 1 | ₹17.70 | ₹17.70 | In series with the LED (about 6 mA at 3.3 V) |
| Male break-away header, 1×40, 2.54 mm | 01221 | 2 | ₹7.08 | ₹14.16 | Breadboard testing only; not in the finished badge |
| 400-point solderless breadboard | 01830 | 1 | ₹49.00 | ₹49.00 | Testing the LED and button before soldering |
| 6×6 mm tactile button, pack of 10 | 01010 | 1 | ₹21.24 | ₹21.24 | Start/stop recording |

The Sense kit also came with a 2.4 GHz antenna (fitted), the OV3660 camera (not used by the badge),
a heatsink with thermal pad (not needed for audio only) and two 7-pin headers.

## Still to get

| Part | Why | Rough cost |
|---|---|---|
| Small neodymium disc magnet + thin steel plate | Holds the badge on a shirt | ₹50–150 |
| Thin silicone wire (28–30 AWG) and heat-shrink | Neater than jumper wire inside the case | ₹20–50 |
| Kapton tape | Keeps the battery off the board | ₹50 |
| 3D-printed case | The body; designed to fit the parts below | ₹300–800 |

## Wiring plan

| From | To | Notes |
|---|---|---|
| Battery red | Slide switch → **BAT+** pad (back of the XIAO) | Never let the battery wires touch each other |
| Battery black | **BAT−** pad | The board charges the battery over USB-C |
| Button (opposite corners) | **D0** (GPIO1) and **3V3** | Read with the internal pull-down; GND's hole already holds the LED wire |
| **D1** (GPIO2) | 220 Ω → LED long leg; LED short leg → **GND** | Lit while recording |

The light and button use jumper wires cut to about 5 cm: the board end is stripped and soldered flat into
its hole, the other end keeps its socket, with the part's leg pushed in. Every bare leg is taped on its
own. The camera is unplugged (not used; the mic is on the Sense board).

The button replaces a power switch: holding it for 2 s puts the badge into deep sleep (light off), one
press wakes it. The battery is soldered to the BAT pads (black −, red +) and charges over USB-C.

## Known issues

- **Battery vs case size.** The 403450 cell is 4.0 × 34 × 50 mm. Its diagonal is about 60.5 mm, so it
  does not fit inside a Ø56 mm round case. **Decided (2 Nov 2026): keep the round look and grow the
  case to about Ø66 mm** so the 1000 mAh cell fits (a smaller cell would not last a shift).
- **microSD slot.** Two cards (SanDisk 16 GB, and a 32 GB card holding data) both get no reply from
  the board in SPI or SD mode (`GO_IDLE_STATE failed`), with pins as in Seeed's docs (CS GPIO21, SCK 7,
  MISO 8, MOSI 9). Since two working cards fail the same way, the slot or how the card seats in it is
  the problem, not the card. Skipped for now: the badge keeps audio in its
  8 MB PSRAM and uploads over Wi-Fi.

## Status

| Step | State |
|---|---|
| Antenna fitted | Done |
| Microphone test (`firmware/mic-test`) | Done, records speech clearly |
| SD card test (`firmware/sd-test`) | Two cards not detected, skipped |
| Wi-Fi badge program (`firmware/badge`) | Done, uploads each minute to the server |
| Red light and button (soldered to board, sockets on parts) | Done, light on while recording, long press sleeps, press wakes |
| Battery soldering | Done, runs on battery, charges over USB |
| Case design and print | Not started |
