#!/usr/bin/env python3
"""Add Hugging Face links to bare model identifiers in HTML."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HF = {
    "zero-universal": "https://huggingface.co/shunyalabs/pingala-v1-universal",
    "pingala-v1-universal": "https://huggingface.co/shunyalabs/pingala-v1-universal",
    "zero-stt-hinglish": "https://huggingface.co/shunyalabs/zero-stt-hinglish",
    "zero-codeswitch": "https://huggingface.co/shunyalabs/zero-stt-hinglish",
    "vak-translate-1.3b-ct2": "https://huggingface.co/shunyalabs/vak-translate-1.3b-ct2",
    "vak-translate-1.3b": "https://huggingface.co/shunyalabs/vak-translate-1.3b-ct2",
    "pingala-v1-en-verbatim": "https://huggingface.co/shunyalabs/pingala-v1-en-verbatim",
    "zero-med": "https://huggingface.co/spaces/shunyalabs/Zero_STT_Med_Shunya_Labs",
}

PRODUCT_NAMES = {
    "Zero STT (Universal)": "https://huggingface.co/shunyalabs/pingala-v1-universal",
    "Zero STT Indic": "https://huggingface.co/spaces/shunyalabs/Zero-STT-Shunya-Labs",
    "Zero STT Med": "https://huggingface.co/spaces/shunyalabs/Zero_STT_Med_Shunya_Labs",
    "Zero TTS": "https://huggingface.co/spaces/shunyalabs/TTS-Indic",
    "Vāķ Translate": "https://huggingface.co/shunyalabs/vak-translate-1.3b-ct2",
}


def link_code(name: str, href: str) -> str:
    return (
        f'<a class="hf-model-link" href="{href}" target="_blank" rel="noopener" '
        f'title="View on Hugging Face (opens in new tab)">'
        f"<code>{name}</code></a>"
    )


def link_strong(name: str, href: str) -> str:
    return (
        f'<a class="hf-model-link" href="{href}" target="_blank" rel="noopener" '
        f'title="View on Hugging Face (opens in new tab)">'
        f"<strong>{name}</strong></a>"
    )


def replace_bare(content: str, old: str, new: str) -> str:
    if new in content:
        return content
    return content.replace(old, new)


def process(content: str, is_tts: bool) -> str:
    for name, href in PRODUCT_NAMES.items():
        wrapped = f'<a href="{href}"'
        if wrapped in content and f">{name}</a>" in content:
            continue
        content = replace_bare(
            content,
            f"<td>{name}</td>",
            f'<td><a class="hf-model-link" href="{href}" target="_blank" rel="noopener" '
            f'title="View on Hugging Face (opens in new tab)">{name}</a></td>',
        )

    for name, href in HF.items():
        linked = link_code(name, href)
        content = replace_bare(content, f"<code>{name}</code>", linked)
        content = replace_bare(content, f"<strong>{name}</strong>", link_strong(name, href))

    z_url = (
        "https://huggingface.co/spaces/shunyalabs/TTS-Indic"
        if is_tts
        else "https://huggingface.co/spaces/shunyalabs/Zero-STT-Shunya-Labs"
    )
    content = replace_bare(content, "<code>zero-indic</code>", link_code("zero-indic", z_url))
    content = replace_bare(content, "<strong>zero-indic</strong>", link_strong("zero-indic", z_url))

    return content


def main():
    seen_inode = set()
    for base in (ROOT, ROOT / "shunya-website-documentation"):
        if not base.is_dir():
            continue
        for path in sorted(base.rglob("*.html")):
            try:
                inode = path.stat().st_ino
            except OSError:
                continue
            if inode in seen_inode:
                continue
            seen_inode.add(inode)
            text = path.read_text(encoding="utf-8")
            is_tts = "/tts/" in str(path)
            new = process(text, is_tts)
            if new != text:
                path.write_text(new, encoding="utf-8")
                print("updated", path)


if __name__ == "__main__":
    main()
