# Amazon Profit-Safe CPC calculator (embeddable)

A small, dependency-free calculator that works out the highest cost per click an Amazon seller can pay and still keep the profit they want from each order. You can drop it into a blog post, a course page or an agency site with one iframe.

**Live demo and embed page:** https://ceilr.com/embed-amazon-cpc-calculator

It's the same widget that runs on ceilr.com. Three plain files: HTML, CSS and about 50 lines of JavaScript. No build step, no tracking, no cookies and no network requests.

## Embed it (copy and paste)

```html
<iframe
  src="https://ceilr.com/embed/profit-safe-cpc.html"
  title="Amazon Profit-Safe CPC calculator by CEILR"
  width="100%" height="560" loading="lazy"
  style="border:1px solid #dfe6ee;border-radius:12px;max-width:600px"
></iframe>
```

Optional: add this script to the host page so the iframe resizes to fit its content instead of using a fixed height.

```html
<script>
addEventListener("message", (event) => {
  if (event.origin !== "https://ceilr.com") return;
  if (event.data?.type !== "ceilr:embed:height") return;
  for (const frame of document.querySelectorAll('iframe[src^="https://ceilr.com/embed/"]')) {
    if (frame.contentWindow === event.source) frame.style.height = event.data.height + "px";
  }
});
</script>
```

The hosted version is served with `connect-src 'none'`, so the browser itself blocks the widget from sending anything anywhere. You can check that in the response headers rather than taking our word for it.

## Self-host it

Copy the three files in [`widget/`](widget/) to your own site and open `profit-safe-cpc.html`. The MIT licence lets you change them however you like. We'd appreciate it if you kept the small "Profit-Safe CPC calculator by CEILR" link in the footer. That link is the only thing we ask in return.

## What it calculates

All arithmetic runs in the visitor's browser on the numbers they type:

| Output | Formula |
| --- | --- |
| Pre-ad contribution per order | price − landed cost − Amazon & fulfilment fees − other variable cost |
| Break-even CPC | contribution × conversion rate |
| Target ACoS | (contribution − protected profit) ÷ price |
| **Profit-Safe CPC** | **(contribution − protected profit) × conversion rate** |

With the default inputs (US$34.99 price, US$12.50 landed, US$9.00 fees, US$1.25 other, US$4.00 protected profit, 12% conversion) the widget shows US$12.24 contribution, a US$1.47 break-even CPC, a 23.5% target ACoS and a **US$0.99 Profit-Safe CPC**.

It is arithmetic on the figures entered. It isn't a bid recommendation or a forecast, and it doesn't connect to any Amazon account.

## Files

- `widget/profit-safe-cpc.html`: markup and default values
- `widget/widget.css`: styles (system fonts, no external assets)
- `widget/widget.js`: the calculation and the optional height message to the host page

## About

Built by [CEILR](https://ceilr.com), Amazon seller decision software from Arc Techno Pty Ltd in Sydney. The full calculator with explanations is at [ceilr.com/amazon-ppc-bid-calculator](https://ceilr.com/amazon-ppc-bid-calculator). CEILR is independent from Amazon.

Issues and pull requests are welcome.
