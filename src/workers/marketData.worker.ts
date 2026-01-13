// src/workers/marketData.worker.ts

// Define the type for market data
interface MarketData {
  symbol: string;
  price: number;
  timestamp: number;
}

// Function to generate random market data
function generateMarketData(symbol: string): MarketData {
  const priceChange = (Math.random() - 0.5) * 10; // Random change between -5 and 5
  const newPrice = Math.max(1, parseFloat((Math.random() * 100 + priceChange).toFixed(2))); // Ensure price is positive
  const timestamp = Date.now();

  return {
    symbol,
    price: newPrice,
    timestamp,
  };
}

// Function to simulate a market data stream
function simulateMarketDataStream(symbol: string, interval: number) {
  setInterval(() => {
    const marketData = generateMarketData(symbol);
    // Post the message back to the main thread
    postMessage(marketData);
  }, interval);
}

// Listen for messages from the main thread
addEventListener("message", (event) => {
  const { symbol, interval } = event.data;

  if (symbol && interval) {
    simulateMarketDataStream(symbol, interval);
  } else {
    console.error("Invalid data received by worker:", event.data);
  }
});

console.log("Market data worker started.");