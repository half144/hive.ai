import chalk from "chalk";
import { Tool } from "../models";
import { getParams, typ } from "../typeUtils";

const GoogleSearchParams = {
  query: typ.string,
};

const GoogleSearchTool = new Tool({
  description:
    "Search in the web using google. returns a list of results, you still need to handle it.",
  name: "Google",
  executerParams: getParams(GoogleSearchParams),
  executer: async ({ query }) => {
    console.log(
      chalk.bgYellow(chalk.black(`Google - Searching for: ${query}`))
    );

    // const res = await fetch(
    //   `https://serpapi.com/search.json?engine=google&q=${query}&api_key=${apiKey}`
    // ).then((res) =>
    //   res.json().then((res) => {
    //     // only the firsts 5
    //     return res.organic_results.slice(0, 5);
    //   })
    // );

    const res = [
      {
        position: 1,
        title: "Bitcoin price today, BTC to USD live price, marketcap ...",
        link: "https://coinmarketcap.com/currencies/bitcoin/",
        redirect_link:
          "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://coinmarketcap.com/currencies/bitcoin/&ved=2ahUKEwjR2ZezksWJAxVIRDABHZMcLnoQFnoECEQQAQ",
        displayed_link: "https://coinmarketcap.com › currencies › bitcoin",
        favicon:
          "https://serpapi.com/searches/672a08e6b4fe87f14e7b4616/images/9d4d1b4cd7550b6658d6e79dc884b60eb580e3e6998999233fdbfd9bb5f7fa27.png",
        snippet:
          "The live Bitcoin price today is $68731.13 USD with a 24-hour trading volume of $41879281827.29 USD. We update our BTC to USD price in real-time.",
        snippet_highlighted_words: ["Bitcoin price"],
        rich_snippet: {
          top: {
            detected_extensions: { rating: 4.6, reviews: 3 },
            extensions: ["4.6(3)"],
          },
        },
        source: "CoinMarketCap",
      },
      {
        position: 2,
        title: "Bitcoin Price | BTC to USD Converter, Chart and News",
        link: "https://www.binance.com/en/price/bitcoin",
        redirect_link:
          "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.binance.com/en/price/bitcoin&ved=2ahUKEwjR2ZezksWJAxVIRDABHZMcLnoQFnoECEEQAQ",
        displayed_link: "https://www.binance.com › price › bitcoin",
        favicon:
          "https://serpapi.com/searches/672a08e6b4fe87f14e7b4616/images/9d4d1b4cd7550b6658d6e79dc884b60e15777324148ac855addf6a76036d45c6.png",
        snippet:
          "Live price of Bitcoin is $68643.68 with a market cap of $1357.63B USD. Discover current price, trading volume, chart history, and more.",
        snippet_highlighted_words: ["price", "Bitcoin", "price"],
        sitelinks: {
          inline: [
            {
              title: "Bitcoin Price",
              link: "https://www.binance.com/en/price/bitcoin/RUB",
            },
            {
              title: "BTC price",
              link: "https://www.binance.com/en-AU/price/bitcoin",
            },
            {
              title: "BTC to INR",
              link: "https://www.binance.com/en-IN/price/bitcoin/INR",
            },
            {
              title: "1 BTC to EUR",
              link: "https://www.binance.com/en/price/bitcoin/EUR",
            },
          ],
        },
        source: "Binance",
      },
      {
        position: 3,
        title: "Bitcoin Price: BTC Live Price Chart, Market Cap & ...",
        link: "https://www.coingecko.com/en/coins/bitcoin",
        redirect_link:
          "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.coingecko.com/en/coins/bitcoin&ved=2ahUKEwjR2ZezksWJAxVIRDABHZMcLnoQFnoECEIQAQ",
        displayed_link: "https://www.coingecko.com › coins › bitcoin",
        favicon:
          "https://serpapi.com/searches/672a08e6b4fe87f14e7b4616/images/9d4d1b4cd7550b6658d6e79dc884b60ef164d65746e77f65a79ac122b49666e6.png",
        snippet:
          "Track the latest Bitcoin price, market cap, trading volume, news and more with CoinGecko's live BTC price chart and popular ...",
        snippet_highlighted_words: ["Bitcoin price", "BTC price"],
        sitelinks: {
          inline: [
            {
              title: "BTC to USD",
              link: "https://www.coingecko.com/en/coins/bitcoin/usd",
            },
            {
              title: "Bitcoin Halving Countdown",
              link: "https://www.coingecko.com/en/coins/bitcoin/bitcoin-halving",
            },
            {
              title: "Bitcoin Cash (BCH)",
              link: "https://www.coingecko.com/en/coins/bitcoin-cash",
            },
            {
              title: "Bitcoin BTC / EUR",
              link: "https://www.coingecko.com/en/coins/bitcoin/eur",
            },
          ],
        },
        source: "CoinGecko",
      },
      {
        position: 4,
        title: "BTC USD — Bitcoin Price and Chart - TradingView",
        link: "https://www.tradingview.com/symbols/BTCUSD/",
        redirect_link:
          "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.tradingview.com/symbols/BTCUSD/&ved=2ahUKEwjR2ZezksWJAxVIRDABHZMcLnoQFnoECD0QAQ",
        displayed_link: "https://www.tradingview.com › symbols › BTCUSD",
        favicon:
          "https://serpapi.com/searches/672a08e6b4fe87f14e7b4616/images/9d4d1b4cd7550b6658d6e79dc884b60eadde53ca0cc02496a7e9358d2c553942.png",
        snippet:
          "Watch live Bitcoin to Dollar chart, follow BTCUSD prices in real-time and get bitcoin price history. Check the Bitcoin technical analysis and forecasts.",
        snippet_highlighted_words: ["bitcoin price"],
        source: "tradingview.com",
      },
      {
        position: 5,
        title: "Bitcoin Price | BTC to USD Price Index and Live Chart",
        link: "https://www.coindesk.com/price/bitcoin",
        redirect_link:
          "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.coindesk.com/price/bitcoin&ved=2ahUKEwjR2ZezksWJAxVIRDABHZMcLnoQFnoECEUQAQ",
        displayed_link: "https://www.coindesk.com › price › bitcoin",
        favicon:
          "https://serpapi.com/searches/672a08e6b4fe87f14e7b4616/images/9d4d1b4cd7550b6658d6e79dc884b60e4228d5b6694a05eddb56812ad594c177.png",
        snippet:
          "The price of Bitcoin (BTC) is $68905.83 USD today as of Nov 5, 2024, 6:42 am EST, with a 24-hour trading volume of $45.80B USD.",
        snippet_highlighted_words: ["price", "Bitcoin", "BTC"],
        source: "CoinDesk",
      },
    ];

    return res;
  },
});

export { GoogleSearchTool };
