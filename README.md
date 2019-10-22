PDF Converter by using puppeteer.

```
# Install package
$ npm install puppeteer-pdf-generator
```

# Usage

```
# Display help
$ puppeteer-pdf-generator --help
Usage: cli --path index.html --out index.pdf

Options:
  --out <path>           output path
  --path <path>          input html file
  --url <url>            input url
  --format <format>      Letter,Legal,Tabloid,Ledger,A0,A1,A2,A3,A4,A5,A6
  --user-agent <string>  user agent (default: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36")
  --timeout <number>     time out ms (default: 30000)
  --wait-for <number>    wait for ms (default: 250)
  -h, --help             output usage information

# Generate pdf from html file
$ puppeteer-pdf-generator --path /tmp/index.html --format A4 --out index.pdf

# Generate pdf from url
$ puppeteer-pdf-generator --url https://google.com --format A4 --out google.pdf
```
