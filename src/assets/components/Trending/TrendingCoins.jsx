import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function TrendingCoins({ coinsTrending, isLoading }) {

  const navigate = useNavigate();
  const handleCoin = (id) => {
    navigate(`coin?coin=${id}`);
  }
  return (
    <div className="coins-wrapper">
      <h3>Trending Coins</h3>

      <div className="container">
        {isLoading ?
          <div className="spinner" id="coins-list-spinner"><LoadingOutlined /></div>
          :
          <div id="coins-list">
            <table className="table-trending">
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  <th>Volume</th>
                  <th>24h%</th>
                </tr>
              </thead>
              <tbody>
                {coinsTrending.map(item => {
                  const coinItem = item.item;
                  return (
                    <tr key={coinItem.id} onClick={() => handleCoin(coinItem.id)}>
                      <td className="name-column">
                        <img src={`${coinItem.thumb}`} alt={`${coinItem.name}`} />
                        {coinItem.name}
                        <span>({`${coinItem.symbol}`})</span>
                      </td>
                      <td>{parseFloat(coinItem.price_btc).toFixed(6)}</td>
                      <td>{coinItem.data.market_cap}</td>
                      <td>{coinItem.data.total_volume}</td>
                      <td className={`${coinItem.data.price_change_percentage_24h.usd > 0 ? 'green' : 'red'}`}>{coinItem.data.price_change_percentage_24h.usd.toFixed(2)}%</td>
                    </tr>
                  )
                })}

              </tbody>
            </table>
          </div>
        }
        {/* <div className="error-message" id="coins-list-error">API limit reached.Please try again later.</div> */}
      </div>
    </div>
  )
}

export default TrendingCoins;
