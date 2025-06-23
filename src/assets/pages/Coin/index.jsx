import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getData } from "../../utils/request";
import "./Coin.css";
function Coin() {
  const [params] = useSearchParams();
  const [dataCoinDetail, setDataCoinDetail] = useState();
  const param = params.get('coin');
  const containerTicker = useRef(null);
  const containerMiniChart = useRef(null);
  const root = getComputedStyle(document.documentElement);
  console.log(typeof (root.getPropertyValue('--chart-bg')))


  //   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js" async>
  //     {
  //       "symbol": "CAPITALCOM:BNBUSD",
  //     "width": 350,
  //     "isTransparent": false,
  //     "colorTheme": "dark",
  //     "locale": "en"
  // }
  //   </script>
  useEffect(() => {

    const fetchDataCoinDetail = async () => {
      try {
        const data = await getData(`coins/${param}`);
        if (data) {
          setDataCoinDetail(data);
        }
      } catch (error) {
        console.error('Error fetching Coin:', error);
      } finally {

      }
    };
    fetchDataCoinDetail();

  }, [param]);


  useEffect(() => {
    if (!dataCoinDetail) return;
    const scriptTicker = document.createElement("script");
    scriptTicker.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    scriptTicker.type = "text/javascript";
    scriptTicker.async = true;
    scriptTicker.innerHTML = JSON.stringify({
      "symbol": `MEXC:${dataCoinDetail.symbol.toUpperCase()}USDT`,
      "width": "100%",
      "isTransparent": true,
      "colorTheme": "dark",
      "locale": "en"
    });
    containerTicker.current.appendChild(scriptTicker);
  }, [dataCoinDetail]);

  useEffect(() => {
    if (!dataCoinDetail) return;
    const scriptMiniChart = document.createElement("script");
    scriptMiniChart.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    scriptMiniChart.type = "text/javascript";
    scriptMiniChart.async = true;
    scriptMiniChart.innerHTML = JSON.stringify({
      "symbols": [
        [
          `MEXC:${dataCoinDetail.symbol.toUpperCase()}USDT|1D`
        ]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "dark",
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": true,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "maLineColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "headerFontSize": "medium",
      "backgroundColor": "#000",
      "gridLineColor": "rgba(250, 250, 250, 0.58)",
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "1d|15",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ],
      "dateFormat": "yyyy-MM-dd"
    })
    containerMiniChart.current.appendChild(scriptMiniChart);

  }, [dataCoinDetail]);


  console.log(dataCoinDetail);
  return (
    <>
      {dataCoinDetail && (
        <>
          <div className="coin-detail">
            <div className="left-section">
              <div className="ticker" >
                <div className="tradingview-widget-container" ref={containerTicker} >

                </div>
              </div>
              <h3>Statistics</h3>
              <div className="coin-info">
                <div className="logo">
                  <img src={dataCoinDetail.image.thumb} alt={dataCoinDetail.name} />
                  <h4>{dataCoinDetail.name}<span>({dataCoinDetail.symbol.toUpperCase()})</span></h4>
                  <p># {dataCoinDetail.market_cap_rank}</p>
                </div>

                <div className="status">
                  <div className="item">
                    <p className="str">Market Cap</p>
                    <p className="num">${dataCoinDetail.market_data.market_cap.usd != null ? dataCoinDetail.market_data.market_cap.usd.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : 'N/A'}</p>
                  </div>
                  <div className="item">
                    <p className="str">Current Price</p>
                    <p className="num">${dataCoinDetail.market_data.current_price.usd != null ? dataCoinDetail.market_data.current_price.usd.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : 'N/A'}</p>
                  </div>
                  <div className="item">
                    <p className="str">All Time High</p>
                    <p className="num">${dataCoinDetail.market_data.ath.usd != null ? dataCoinDetail.market_data.ath.usd.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : 'N/A'}</p>
                  </div>
                  <div className="item">
                    <p className="str">All Time Low</p>
                    <p className="num">${dataCoinDetail.market_data.atl.usd != null ? dataCoinDetail.market_data.atl.usd.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : 'N/A'}</p>
                  </div>
                  <div className="item">
                    <p className="str">Total Volume</p>
                    <p className="num">${dataCoinDetail.market_data.total_volume.usd != null ? dataCoinDetail.market_data.total_volume.usd.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : 'N/A'}</p>
                  </div>
                  <div className="item">
                    <p className="str">Total Supply</p>
                    <p className="num">{dataCoinDetail.market_data.total_supply != null ? dataCoinDetail.market_data.total_supply.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : 'N/A'}</p>
                  </div>
                  <div className="item">
                    <p className="str">Max Supply</p>
                    <p className="num">{dataCoinDetail.market_data.max_supply != null ? dataCoinDetail.market_data.max_supply.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : 'N/A'}</p>
                  </div>
                  <div className="item">
                    <p className="str">Circulating Supply</p>
                    <p className="num">{dataCoinDetail.market_data.circulating_supply != null ? dataCoinDetail.market_data.circulating_supply.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-section">
              <div className="mini-chart">
                <div className="tradingview-widget-container" ref={containerMiniChart} ></div>
              </div>
            </div>

            <div className="right-section">
              <div className="status">
                <h3>Historical Info</h3>
                <div className="container">
                  <div className="item">
                    <p className="str">ATH</p>
                    <p className="num">${dataCoinDetail.market_data.ath.usd != null ? dataCoinDetail.market_data.ath.usd.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : "N/A"}</p>
                  </div>
                  <div className="item">
                    <p className="str">ATL</p>
                    <p className="num">${dataCoinDetail.market_data.atl.usd != null ? dataCoinDetail.market_data.atl.usd.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : "N/A"}</p>
                  </div>
                  <div className="item">
                    <p className="str">24h High</p>
                    <p className="num">${dataCoinDetail.market_data.high_24h.usd != null ? dataCoinDetail.market_data.high_24h.usd.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : "N/A"}</p>
                  </div>
                  <div className="item">
                    <p className="str">24h Low</p>
                    <p className="num">${dataCoinDetail.market_data.low_24h.usd != null ? dataCoinDetail.market_data.high_24h.usd.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="status">
                <h3>Markets</h3>
                <div className="container">
                  <div className="item">
                    <p className="str">{dataCoinDetail.tickers[0].market.name.replace('Exchange', '')}</p>
                    <div className="links">
                      <a href={`${dataCoinDetail.tickers[0].trade_url}`}>Trade</a>
                      <p style={{ backgroundColor: `${dataCoinDetail.tickers[0].trust_score}` }}>Trusted: {dataCoinDetail.tickers[0].trust_score}</p>
                    </div>
                  </div>
                  <div className="item">
                    <p className="str">{dataCoinDetail.tickers[1].market.name.replace('Exchange', '')}</p>
                    <div className="links">
                      <a href={`${dataCoinDetail.tickers[1].trade_url}`}>Trade</a>
                      <p style={{ backgroundColor: `${dataCoinDetail.tickers[1].trust_score}` }}>Trusted: {dataCoinDetail.tickers[1].trust_score}</p>
                    </div>
                  </div>
                  <div className="item">
                    <p className="str">{dataCoinDetail.tickers[2].market.name.replace('Exchange', '')}</p>
                    <div className="links">
                      <a href={`${dataCoinDetail.tickers[2].trade_url}`}>Trade</a>
                      <p style={{ backgroundColor: `${dataCoinDetail.tickers[2].trust_score}` }}>Trusted: {dataCoinDetail.tickers[2].trust_score}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="status">
                <h3>Info</h3>
                <div className="container">
                  <div className="item">
                    <p className="str">Website</p>
                    <div className="links">
                      <a target="_blank" href={`${dataCoinDetail.links.homepage}`}>Visit</a>
                      <a target="_blank" href={`${dataCoinDetail.links.whitepaper}`}>Whitepaper</a>
                    </div>
                  </div>
                  <div className="item">
                    <p className="str">Community</p>
                    <div className="links">
                      <a target="_blank" href={`https://x.com/${dataCoinDetail.links.twitter_screen_name}`}>Twitter</a>
                      <a target="_blank" href={`https://facebook.com/${dataCoinDetail.links.facebook_username}`}>Facebook</a>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
          <div className="coin-desc">
            <h3>About Assets</h3>
            <p>{dataCoinDetail.description.en}</p>
          </div>
        </>
      )}
    </>
  )
}

export default Coin;
