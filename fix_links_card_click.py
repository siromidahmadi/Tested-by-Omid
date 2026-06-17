import pathlib


def main() -> None:
    p = pathlib.Path("index.html")
    s = p.read_text(encoding="utf-8")

    old = (
        ".card::before {\n"
        "  content: '';\n"
        "  position: absolute; inset: 0;\n"
        "  background: radial-gradient(ellipse at 50% -10%, rgba(139,0,0,0.16) 0%, transparent 65%);\n"
        "  opacity: 0;\n"
        "  transition: opacity 0.45s;\n"
        "}\n"
    )

    new = (
        ".card::before {\n"
        "  content: '';\n"
        "  position: absolute; inset: 0;\n"
        "  background: radial-gradient(ellipse at 50% -10%, rgba(139,0,0,0.16) 0%, transparent 65%);\n"
        "  pointer-events: none;\n"
        "  opacity: 0;\n"
        "  transition: opacity 0.45s;\n"
        "}\n"
    )

    if new in s:
        print("No changes needed (pointer-events already set).")
        return

    if old not in s:
        raise SystemExit("Could not find exact .card::before block; CSS may have changed.")

    s = s.replace(old, new, 1)
    p.write_text(s, encoding="utf-8")
    print("Updated .card::before to ignore pointer events.")


if __name__ == "__main__":
    main()
