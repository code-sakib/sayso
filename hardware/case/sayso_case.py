"""SaySo badge case: three printed parts that stack from the back of the badge to the front.

    base.stl   back + side wall. The battery is taped to its floor. USB-C slot at the bottom,
               button hole on the left, mic holes on the lower right edge, four posts that hold the plate.
    plate.stl  thin separator that sits on the posts, between the battery and the board.
               Corner guides keep the board in place, USB-C end against the slot. A slot open
               to the edge lets the soldered battery wires slide in from the side.
    lid.stl    front face. Red light hole (top centre), a shallow pocket for the
               Wi-Fi antenna sticker, and four tabs that push into the wall.

Coordinates in mm, seen from the front: x right, y up (USB-C points down), z from the back (0) to
the front. Sizes come from measuring the finished badge (docs/hardware.md).

Run:  python hardware/case/sayso_case.py   (needs trimesh and manifold3d)
"""

import math
from pathlib import Path

import numpy as np
import trimesh
from manifold3d import CrossSection, Manifold

OUT = Path(__file__).parent / "out"
SEGMENTS = 128

# ---- Shell ----
OUTER_D = 66.0
WALL = 1.6
FLOOR = 1.6
LID_T = 1.6
BACK_ROUND = 3.0             # soft rim like the website badge
FRONT_ROUND = 1.5
INNER_R = OUTER_D / 2 - WALL

# ---- Stack, back to front ----
BATTERY = (35.0, 51.0, 5.0)  # KP 403450 is 34 × 50 × 4; a little loose
PLATE_T = 1.0
BOARD_STACK = 10.0           # measured 9–10 with the soldered wires
FRONT_GAP = 0.3

PLATE_Z = FLOOR + BATTERY[2]
BOARD_Z = PLATE_Z + PLATE_T
WALL_TOP = BOARD_Z + BOARD_STACK + FRONT_GAP
TOTAL_T = WALL_TOP + LID_T

# ---- Board (measured 23 × 18 including USB-C), sitting low with USB-C at the bottom ----
BOARD_W, BOARD_L = 18.0, 23.0
FIT = 0.3
BOARD_BOTTOM_Y = -math.sqrt(INNER_R**2 - (BOARD_W / 2 + FIT) ** 2) + 0.4
BOARD_CENTER_Y = BOARD_BOTTOM_Y + BOARD_L / 2

# ---- Openings ----
USB_SLOT = (13.0, 8.0)        # cable plug, not just the port
USB_Z = BOARD_Z + 4.8         # port centre above the plate
BUTTON_ANGLE = 163.0          # left wall, a little above centre, as on the website
BUTTON_Z = BOARD_Z + 4.0
BUTTON_HOLE_D = 4.0           # plunger is Ø3.5
BUTTON_POCKET_D = 7.5         # wall thinned to 0.8 mm around it so the plunger reaches through
LED_XY = (0.0, 21.0)          # top centre, as on the website; its socket ends lie along the top
LED_HOLE_D = 3.2
MIC_XY = (6.0, BOARD_CENTER_Y + 2.0)  # the mic on the sound board (next to D11)
MIC_HOLE_D = 1.2
MIC_SIDE_ANGLES = (-36.0, -30.0, -24.0)        # right edge, lower right, level with the mic
MIC_SIDE_Z = (BOARD_Z + 4.0, BOARD_Z + 6.0)    # below the lid tabs, beside the sound board
ANTENNA = (39.0, 19.0)        # measured 38 × 18 sticker, across the middle: below the light, above the board
ANTENNA_XY = (0.0, 4.0)
ANTENNA_DEPTH = 0.4

# ---- Plate supports and lid tabs ----
POSTS = [(24.0, 14.0), (-24.0, 14.0), (24.0, -14.0), (-24.0, -14.0)]
POST_D = 4.0
WIRE_SLOT_W = 11.0  # leaves 3.5 mm of plate under each long edge of the board
TAB_ANGLES = [20.0, 90.0, 215.0, 325.0]  # clear of the board, USB-C, button and antenna
TAB_SPAN = 20.0
TAB_DEPTH = 2.5
TAB_CLEARANCE = 0.2
TAB_THICK = 1.3


def cylinder(h, r, r_top=None):
    return Manifold.cylinder(h, r, r if r_top is None else r_top, SEGMENTS)


def box(sx, sy, sz, cx=0.0, cy=0.0, z0=0.0):
    return Manifold.cube([sx, sy, sz]).translate([cx - sx / 2, cy - sy / 2, z0])


def wedge(a0, a1, r, h):
    steps = 16
    pts = [(0.0, 0.0)] + [
        (r * math.cos(math.radians(a0 + (a1 - a0) * i / steps)), r * math.sin(math.radians(a0 + (a1 - a0) * i / steps)))
        for i in range(steps + 1)
    ]
    return CrossSection([pts]).extrude(h)


def rounded_disc(h, back_r, front_r):
    """Solid Ø OUTER_D disc of height h with rounded back and front rims."""
    r = OUTER_D / 2
    pts = [(0.0, 0.0)]
    for cz, rr, a0, a1 in ((back_r, back_r, -90, 0), (h - front_r, front_r, 0, 90)):
        if rr == 0:
            pts.append((r, cz))
            continue
        pts += [(r - rr + rr * math.cos(math.radians(a0 + (a1 - a0) * i / 12)), cz + rr * math.sin(math.radians(a0 + (a1 - a0) * i / 12))) for i in range(13)]
    pts.append((0.0, h))
    return Manifold.revolve(CrossSection([pts]), SEGMENTS)


def polar(angle, r):
    return r * math.cos(math.radians(angle)), r * math.sin(math.radians(angle))


def base():
    outer = rounded_disc(WALL_TOP, BACK_ROUND, 0)
    shell = outer - cylinder(WALL_TOP, INNER_R).translate([0, 0, FLOOR])
    for x, y in POSTS:
        shell += cylinder(PLATE_Z - FLOOR, POST_D / 2).translate([x, y, FLOOR])
    # USB-C slot through the bottom wall
    shell -= box(USB_SLOT[0], WALL * 3, USB_SLOT[1], 0, -OUTER_D / 2, USB_Z - USB_SLOT[1] / 2)
    # Button: through-hole plus a pocket from inside that thins the wall
    bx, by = polar(BUTTON_ANGLE, OUTER_D / 2)
    hole = cylinder(WALL * 4, BUTTON_HOLE_D / 2).translate([0, 0, -WALL * 2]).rotate([0, 90, 0])
    pocket = cylinder(WALL, BUTTON_POCKET_D / 2).rotate([0, 90, 0]).translate([0.8, 0, 0])
    for cut in (hole, pocket):
        shell -= cut.rotate([0, 0, BUTTON_ANGLE - 180]).translate([bx, by, BUTTON_Z])
    # Mic holes through the right wall; sound reaches the mic through the air inside
    mic_hole = cylinder(WALL * 4, MIC_HOLE_D / 2).translate([0, 0, -WALL * 2]).rotate([0, 90, 0])
    for angle in MIC_SIDE_ANGLES:
        mx, my = polar(angle, OUTER_D / 2)
        for z in MIC_SIDE_Z:
            shell -= mic_hole.rotate([0, 0, angle]).translate([mx, my, z])
    return shell


def plate():
    disc = cylinder(PLATE_T, INNER_R - 0.25)
    # Slot open to the bottom edge, under the BAT pads: the soldered battery wires slide in from the side
    slot_top = BOARD_CENTER_Y + 2
    disc -= box(WIRE_SLOT_W, slot_top + OUTER_D / 2, PLATE_T * 3, 0, (slot_top - OUTER_D / 2) / 2, -PLATE_T)
    # Cradle: two corner guides at the board's top end and side rails; the wall holds the USB-C end
    rail_h, rail_t = 2.5, 1.2
    half = BOARD_W / 2 + FIT
    top = BOARD_BOTTOM_Y + BOARD_L + FIT
    for side in (-1, 1):
        disc += box(rail_t, 8, rail_h, side * (half + rail_t / 2), top - 4, PLATE_T)
        disc += box(5, rail_t, rail_h, side * (half - 2.5 + rail_t), top + rail_t / 2, PLATE_T)
    return disc.translate([0, 0, PLATE_Z])


def lid():
    face = rounded_disc(LID_T, 0, FRONT_ROUND)
    face -= cylinder(LID_T * 3, LED_HOLE_D / 2).translate([LED_XY[0], LED_XY[1], -LID_T])
    face -= box(ANTENNA[0], ANTENNA[1], ANTENNA_DEPTH, ANTENNA_XY[0], ANTENNA_XY[1], 0)
    ring_out, ring_in = INNER_R - TAB_CLEARANCE, INNER_R - TAB_CLEARANCE - TAB_THICK
    ring = cylinder(TAB_DEPTH, ring_out) - cylinder(TAB_DEPTH, ring_in)
    for a in TAB_ANGLES:
        face += (ring ^ wedge(a - TAB_SPAN / 2, a + TAB_SPAN / 2, OUTER_D, TAB_DEPTH)).translate([0, 0, -TAB_DEPTH])
    return face.translate([0, 0, WALL_TOP])


def save(part, name, flip=False):
    mesh = part.to_mesh()
    tm = trimesh.Trimesh(np.asarray(mesh.vert_properties)[:, :3], np.asarray(mesh.tri_verts), process=True)
    if flip:  # print the lid front-face down
        tm.apply_transform(trimesh.transformations.rotation_matrix(math.pi, [1, 0, 0]))
    tm.apply_translation([0, 0, -tm.bounds[0][2]])
    tm.export(OUT / name)
    assert tm.is_watertight, f"{name} is not watertight"
    return tm


def main():
    OUT.mkdir(exist_ok=True)
    parts = {"base.stl": base(), "plate.stl": plate(), "lid.stl": lid()}
    for name, part in parts.items():
        save(part, name, flip=name == "lid.stl")
    # Assembled positions, for the 3D preview page
    for name, part in parts.items():
        mesh = part.to_mesh()
        trimesh.Trimesh(np.asarray(mesh.vert_properties)[:, :3], np.asarray(mesh.tri_verts)).export(OUT / f"assembled-{name}")
    print(f"Ø{OUTER_D:.0f} × {TOTAL_T:.1f} mm; board bottom y {BOARD_BOTTOM_Y:.1f}, centre y {BOARD_CENTER_Y:.1f}")
    for name in parts:
        tm = trimesh.load(OUT / name)
        print(f"{name}: {tm.extents.round(1)} mm, watertight={tm.is_watertight}")


if __name__ == "__main__":
    main()
