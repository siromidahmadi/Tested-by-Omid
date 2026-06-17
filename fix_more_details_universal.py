import pathlib


def main() -> None:
    p = pathlib.Path("index.html")
    s = p.read_text(encoding="utf-8")

    needle = '        <p class="card-price" data-en="Los Angeles · Hybrid" data-fa="لس‌آنجلس · هیبرید">Los Angeles · Hybrid</p>'
    insert = (
        '        <p class="card-more" data-en="More details" data-fa="جزئیات بیشتر">More details</p>\n'
        '        <p class="card-price" data-en="Los Angeles · Hybrid" data-fa="لس‌آنجلس · هیبرید">Los Angeles · Hybrid</p>'
    )

    # We already inserted once for AT&T. Universal Bank is the 2nd occurrence of the same card-price line.
    if s.count(insert) >= 2:
        print("No changes needed (Universal Bank already has More details).")
        return

    first = s.find(needle)
    if first == -1:
        raise SystemExit("Could not find Los Angeles · Hybrid card-price line")

    second = s.find(needle, first + len(needle))
    if second == -1:
        raise SystemExit("Could not find second Los Angeles · Hybrid card-price line (Universal Bank)")

    # Ensure we don't double-insert if somehow present
    window_start = max(0, second - 200)
    window = s[window_start:second]
    if "card-more" in window:
        print("Universal Bank already appears to have More details near the card-price line.")
        return

    s = s[:second] + insert + s[second + len(needle):]
    p.write_text(s, encoding="utf-8")
    print("Inserted More details for Universal Bank card.")


if __name__ == "__main__":
    main()
