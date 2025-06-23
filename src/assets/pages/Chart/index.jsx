import { useEffect, useRef, useState } from "react";

function Chart() {
  const container = useRef();



  const root = getComputedStyle(document.documentElement);
  const backgroundColor = root.getPropertyValue("--chart-bg ").trim();
  const gridColor = root.getPropertyValue(" --chart-border ").trim();
  // const chartTheme = root.getPropertyValue(" --chart-theme ").trim();
  // const isDarkMode=root

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "4H",
        timezone: "Etc/UTC",
        theme: "--chart-theme",
        style: "1",
        locale: "en",
        container_id: "chart-widget",
        backgroundColor: backgroundColor,
        gridColor: gridColor,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        save_image: true,
        details: true,
        calendar: false,
        support_host: "https://www.tradingview.com"
      });
      container.current.appendChild(script);
      // return () => {
      //   container.current.innerHTML = "";
      // }
    }, []);
  return (
    <>
      <div className="chart-container" style={{ height: "80vh" }}>
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
          <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
          <div className="tradingview-widget-copyright">
            <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chart;

// "autosize": true,
// "symbol": "NASDAQ:AAPL",
// "interval": "4H",
// "timezone": "Etc/UTC",
// "theme": "dark",
// "style": "1",
// "locale": "en",
// "allow_symbol_change": true,
// "support_host": "https://www.tradingview.com"