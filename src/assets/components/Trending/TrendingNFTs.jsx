import { LoadingOutlined } from '@ant-design/icons';

function TrendingNFTs({ nftsTrending, isLoading }) {
  return (
    <div className="nfts-wrapper">
      <h3>Trending NFTs</h3>

      <div className="container">
        {isLoading ?
          <div className="spinner" id="nfts-list-spinner"><LoadingOutlined /></div>
          :
          <div id="nfts-list">

            <table className="table-trending">
              <thead>
                <tr>
                  <th>NFT</th>
                  <th>Market</th>
                  <th>Price </th>
                  <th>24h Vol</th>
                  <th>24h%</th>
                </tr>
              </thead>
              <tbody>
                {nftsTrending.map(item => (
                  <tr key={item.id}>
                    <td className="name-column">
                      <img src={`${item.thumb}`} alt={`${item.name}`} />
                      {item.name}
                      <span>({item.symbol})</span>
                    </td>
                    <td>{item.native_currency_symbol.toUpperCase()}</td>
                    <td>{item.data.floor_price}</td>
                    <td>{item.data.h24_volume}</td>
                    <td className={`${parseFloat(item.data.floor_price_in_usd_24h_percentage_change) >= 0 ? 'green' : 'red'}`}>${parseFloat(item.data.floor_price_in_usd_24h_percentage_change).toFixed(2)}%</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        }

      </div>
      {/* <div className="error-message" id="nfts-list-error">API limit reached.Please try again later.</div> */}
    </div>
  )
}

export default TrendingNFTs;
