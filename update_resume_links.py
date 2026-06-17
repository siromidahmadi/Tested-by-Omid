import pathlib


def main() -> None:
    p = pathlib.Path("index.html")
    s = p.read_text(encoding="utf-8")

    replacements = [
        ("Assest/Omid-Ahmadi-Resume.pdf", "Assest/Omid%20Ahmadi.pdf"),
        ("Assest/Omid-Ahmadi-Resume.docx", "Assest/Omid%20Ahmadi.docx"),
    ]

    changed = False
    for old, new in replacements:
        if old in s:
            s = s.replace(old, new)
            changed = True

    if not changed:
        print("No changes needed (resume links already updated or old links not found).")
        return

    p.write_text(s, encoding="utf-8")
    print("Updated resume links in index.html")


if __name__ == "__main__":
    main()
