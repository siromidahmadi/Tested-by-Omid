import pathlib


def main() -> None:
    p = pathlib.Path("index.html")
    s = p.read_text(encoding="utf-8")

    # 1) CSS: add a small style block right before .card-price (keeps it scoped/near card styles)
    css_needle = ".card-price {\n"
    css_insert = (
        ".card-more {\n"
        "  font-size: 0.58rem;\n"
        "  letter-spacing: 0.22em;\n"
        "  text-transform: uppercase;\n"
        "  color: rgba(245,241,232,0.45);\n"
        "  margin: 0 0 0.85rem;\n"
        "}\n\n"
        ".card-price {\n"
    )

    if ".card-more {" not in s:
        if css_needle not in s:
            raise SystemExit("Could not find .card-price CSS block")
        s = s.replace(css_needle, css_insert, 1)

    # 2) HTML: insert the label above the location line for the four Selected Roles cards only.
    labels = [
        (
            '        <p class="card-price" data-en="Los Angeles · Hybrid" data-fa="لس‌آنجلس · هیبرید">Los Angeles · Hybrid</p>',
            '        <p class="card-more" data-en="More details" data-fa="جزئیات بیشتر">More details</p>\n'
            '        <p class="card-price" data-en="Los Angeles · Hybrid" data-fa="لس‌آنجلس · هیبرید">Los Angeles · Hybrid</p>',
            2,  # AT&T + Universal Bank share same card-price line; apply twice.
        ),
        (
            '        <p class="card-price" data-en="Washington · Remote" data-fa="واشینگتن · ریموت">Washington · Remote</p>',
            '        <p class="card-more" data-en="More details" data-fa="جزئیات بیشتر">More details</p>\n'
            '        <p class="card-price" data-en="Washington · Remote" data-fa="واشینگتن · ریموت">Washington · Remote</p>',
            1,
        ),
        (
            '        <p class="card-price" data-en="Chevy Chase, Maryland, United States · Remote" data-fa="مریلند، ایالات متحده · ریموت">Chevy Chase, Maryland, United States · Remote</p>',
            '        <p class="card-more" data-en="More details" data-fa="جزئیات بیشتر">More details</p>\n'
            '        <p class="card-price" data-en="Chevy Chase, Maryland, United States · Remote" data-fa="مریلند، ایالات متحده · ریموت">Chevy Chase, Maryland, United States · Remote</p>',
            1,
        ),
    ]

    for needle, repl, times in labels:
        if needle not in s:
            raise SystemExit(f"Missing expected card-price line: {needle}")

        # Insert only if not already present immediately above
        for _ in range(times):
            if repl in s:
                # If it's already inserted for this specific card-price line, skip one occurrence.
                pass
            if "<p class=\"card-more\"" in s.split(needle)[0].splitlines()[-1]:
                continue
            s = s.replace(needle, repl, 1)

    p.write_text(s, encoding="utf-8")
    print("Added 'More details' labels to Selected Roles cards.")


if __name__ == "__main__":
    main()
