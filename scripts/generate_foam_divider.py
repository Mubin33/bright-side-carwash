"""Generate a vertical soap-foam divider PNG (transparent background)."""
from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

WIDTH = 14
HEIGHT = 1200
OUT = Path(__file__).resolve().parents[1] / "public" / "foam-divider.png"


def bubble(draw: ImageDraw.ImageDraw, cx: float, cy: float, r: float, alpha: int) -> None:
    """Draw a soft soap bubble with highlight."""
    base = (245, 252, 255, alpha)
    rim = (210, 230, 245, max(0, alpha - 40))
    highlight = (255, 255, 255, min(255, alpha + 30))

    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=base)
    draw.ellipse((cx - r * 0.92, cy - r * 0.92, cx + r * 0.92, cy + r * 0.92), outline=rim, width=1)
    hr = r * 0.28
    draw.ellipse(
        (cx - r * 0.35 - hr, cy - r * 0.42 - hr, cx - r * 0.35 + hr, cy - r * 0.42 + hr),
        fill=highlight,
    )


def main() -> None:
    random.seed(42)
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Dense vertical foam column — overlapping bubbles
    x_center = WIDTH / 2
    y = -8
    while y < HEIGHT + 20:
        r = random.uniform(2.8, 6.5)
        jitter_x = random.uniform(-2.2, 2.2)
        cx = x_center + jitter_x
        cy = y + random.uniform(-1.5, 1.5)
        alpha = random.randint(175, 235)
        bubble(draw, cx, cy, r, alpha)
        y += random.uniform(3.5, 7.5)

    # Extra micro-bubbles for texture
    for _ in range(120):
        cx = x_center + random.uniform(-3.5, 3.5)
        cy = random.uniform(0, HEIGHT)
        r = random.uniform(0.8, 2.2)
        alpha = random.randint(90, 160)
        bubble(draw, cx, cy, r, alpha)

    # Soft core strip (thick foam body)
    core = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    core_draw = ImageDraw.Draw(core)
    core_draw.rectangle(
        (WIDTH / 2 - 2.5, 0, WIDTH / 2 + 2.5, HEIGHT),
        fill=(250, 253, 255, 120),
    )
    core = core.filter(ImageFilter.GaussianBlur(radius=1.2))
    img = Image.alpha_composite(img, core)

    # Edge feather for soft realistic foam
    img = img.filter(ImageFilter.GaussianBlur(radius=0.45))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({WIDTH}x{HEIGHT})")


if __name__ == "__main__":
    main()
