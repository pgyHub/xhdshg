"""
将 Cursor workspaceStorage 导入的 PNG 底部品牌条裁掉，输出到 public/images/。
裁剪比例按画面底部文字区典型占比估算；无字或主体在底部的图 crop 为 0。
"""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

ASSETS = Path(r"C:\Users\gongy\.cursor\projects\d-xhdshg-2\assets")
OUT_ROOT = Path(__file__).resolve().parent.parent / "public" / "images"

# (文件名片段, 输出子目录, 输出文件名, 裁掉底部高度比例 0~0.35)
JOBS: list[tuple[str, str, str, float]] = [
    # 婚纱：夜景双人，无字，保留画幅
    ("20201126174807487", "wedding", "wed-city-romance-01.png", 0.0),
    # 彩妆：局部/创意，文字多在底部或一角
    ("20170417093805385", "makeup", "mk-lily-reflection-01.png", 0.10),
    ("20170417093809389", "makeup", "mk-portrait-soft-02.png", 0.12),
    ("202305091119531953", "makeup", "mk-eye-detail-03.png", 0.14),
    ("202305091347354735", "makeup", "mk-liquid-portrait-04.png", 0.17),
    ("202305091350175017", "makeup", "mk-halter-redlip-05.png", 0.26),
    # 美发：YESIDO + 椰岛造型 大横条，多裁一点
    ("20230509113104314", "hair", "hair-editorial-bob-01.png", 0.0),
    ("201705081022512251", "hair", "hair-salon-table-02.png", 0.26),
    ("201705081024252425", "hair", "hair-salon-wavy-03.png", 0.26),
    ("201705081025152515", "hair", "hair-salon-bob-04.png", 0.26),
    ("201705081025512551", "hair", "hair-salon-wrap-05.png", 0.26),
    ("201705151127392739", "hair", "hair-groom-formal-06.png", 0.26),
    ("201705151127542754", "hair", "hair-groom-blazer-07.png", 0.26),
    ("202305091123212321", "hair", "hair-woman-white-08.png", 0.26),
    ("202305091128512851", "hair", "hair-woman-halter-09.png", 0.26),
    ("20190620164405445", "hair", "hair-promo-studio-10.png", 0.26),
    ("20230509112704274", "hair", "hair-salon-longhair-11.png", 0.26),
]


def resolve_src(partial: str) -> Path:
    for p in ASSETS.iterdir():
        if p.suffix.lower() == ".png" and partial in p.name:
            return p
    raise FileNotFoundError(f"未找到包含 {partial!r} 的 PNG：{ASSETS}")


def crop_bottom(im: Image.Image, frac: float) -> Image.Image:
    frac = max(0.0, min(0.45, frac))
    w, h = im.size
    new_h = max(1, int(h * (1 - frac)))
    return im.crop((0, 0, w, new_h))


def main() -> None:
    if not ASSETS.is_dir():
        raise SystemExit(f"源目录不存在：{ASSETS}")

    for partial, sub, fname, frac in JOBS:
        src = resolve_src(partial)
        out_dir = OUT_ROOT / sub
        out_dir.mkdir(parents=True, exist_ok=True)
        dst = out_dir / fname
        im = Image.open(src).convert("RGB")
        out = crop_bottom(im, frac)
        out.save(dst, "PNG", optimize=True)
        print(f"OK {src.name} -> {dst.relative_to(OUT_ROOT.parent.parent)} crop={frac}")


if __name__ == "__main__":
    main()
