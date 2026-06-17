import pathlib


def main() -> None:
    p = pathlib.Path("index.html")
    s = p.read_text(encoding="utf-8")

    needle = "  const ov3El = document.getElementById('ov3');\n"

    insert = (
        "  const ov3El = document.getElementById('ov3');\n"
        "\n"
        "  if (ov3El && active !== 3) {\n"
        "    ov3El.style.opacity = '';\n"
        "    ov3El.style.pointerEvents = '';\n"
        "  }\n"
    )

    if insert in s:
        print("No changes needed (ov3 reset already present).")
        return

    if needle not in s:
        raise SystemExit("Could not find ov3 element lookup line; index.html may have changed.")

    s = s.replace(needle, insert, 1)
    p.write_text(s, encoding="utf-8")
    print("Inserted ov3 inline-style reset block.")


if __name__ == "__main__":
    main()
