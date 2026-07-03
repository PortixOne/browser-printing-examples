# Browser Printing Examples

> Real, runnable examples of printing from web apps — native browser printing and silent local printing via [PortixOne](https://github.com/PortixOne/portixone), across frameworks.

See also: [awesome-web-printing](https://github.com/PortixOne/awesome-web-printing) (ecosystem reference) · [escpos-cheatsheet](https://github.com/PortixOne/escpos-cheatsheet) (thermal printer commands).

## Examples

| Example | Stack | What it shows |
|---|---|---|
| [`vanilla-js/window-print`](vanilla-js/window-print) | Plain HTML/CSS | Native `window.print()`, printing only one element via `@media print` |
| [`vanilla-js/portixone-fetch`](vanilla-js/portixone-fetch) | Plain HTML/JS | Silent printing with a raw `fetch()` call — no SDK, no dialog |
| [`react/print-button`](react/print-button) | React + Vite + TS | Silent printing via a `usePortixPrint` hook |
| [`vue/print-button`](vue/print-button) | Vue 3 + Vite + TS | Silent printing via the Composition API |

## Native printing vs. silent printing

`window.print()` (the `vanilla-js/window-print` example) works everywhere, no setup — but it always shows the OS print dialog and can't pick a printer or print without user interaction.

For **silent** printing (no dialog, specific printer, works from a kiosk/POS), you need a local bridge. The other three examples talk directly to the [PortixOne runtime](https://github.com/PortixOne/portixone) — a small local process that receives print jobs over HTTP and sends them to a real printer.

## Running the PortixOne examples

1. Clone and run the runtime: see [`portixone/runtime/README.md`](https://github.com/PortixOne/portixone/tree/master/runtime).
2. Open `vanilla-js/portixone-fetch/index.html` directly, or `npm install && npm run dev` inside `react/print-button` / `vue/print-button`.

> `@portixone/sdk-js` isn't published to npm yet — every example here uses plain `fetch()` against the runtime's local HTTP API, which is exactly what the SDK does under the hood.

## Contributing

More frameworks (Svelte, Angular, Next.js) and more printing patterns (labels, barcodes, kitchen tickets) are welcome — open a PR.

## License

MIT
