import pathlib


def main() -> None:
    p = pathlib.Path("index.html")
    s = p.read_text(encoding="utf-8")

    reps = [
        (
            '        <span class="card-glyph">Universal Bank</span>',
            '        <img class="role-logo" src="Assest/Universal_Bank.svg.png" alt="Universal Bank" onerror="this.style.display=\'none\'">\n'
            '        <span class="card-glyph">Universal Bank</span>',
        ),
        (
            '        <span class="card-glyph">Cigna Insurance</span>',
            '        <img class="role-logo" src="Assest/Cigna.png" alt="Cigna" onerror="this.style.display=\'none\'">\n'
            '        <span class="card-glyph">Cigna Insurance</span>',
        ),
        (
            '        <span class="card-glyph">State Farm </span>',
            '        <img class="role-logo" src="Assest/State Farm.png" alt="State Farm" onerror="this.style.display=\'none\'">\n'
            '        <span class="card-glyph">State Farm </span>',
        ),
    ]

    changed = False
    for needle, repl in reps:
        if repl in s:
            continue
        if needle not in s:
            raise SystemExit(f"Missing marker: {needle}")
        s = s.replace(needle, repl, 1)
        changed = True

    if changed:
        p.write_text(s, encoding="utf-8")
        print("Inserted logos into experience cards.")
    else:
        print("No changes needed (logos already present).")


if __name__ == "__main__":
    main()
