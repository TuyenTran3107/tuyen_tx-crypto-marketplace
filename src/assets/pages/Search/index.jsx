import { useSearchParams } from "react-router-dom";
import "./Search.css";
import { useEffect, useState } from "react";
import { getData } from "../../utils/request";
import { LoadingOutlined } from '@ant-design/icons';


function Search() {
  const [params] = useSearchParams();
  const [dataSearch, setDataSearch] = useState([]);
  const [minCount, setMinCount] = useState(0);
  const param = params.get('query');
  console.log(param)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchDataSearch = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = await getData(`search?query=${param}`);
        if (data) {
          const minCount = Math.min(data.coins.length, data.exchanges.length, data.nfts.length);
          setDataSearch(data);
          setMinCount(minCount);
        }
      } catch (error) {
        console.error('Error fetching searching:', error);
      } finally {
        setIsLoading(false);
      }

    };
    fetchDataSearch();
    return () => {
      setDataSearch([]);
      setMinCount(0);
    }
  }, [param]);
  const coinsSearch = dataSearch.coins;
  console.log(coinsSearch)
  const exchangesSearch = dataSearch.exchanges;
  const nftsSearch = dataSearch.nfts;
  console.log(dataSearch)
  return (
    <>
      {param ?
        <>
          <h3 className="title-search"> Search results for "{param}": </h3>
          {isLoading ?
            <div className="spinner" id="coins-list-spinner"><LoadingOutlined /></div>

            :
            <div className="search-container">
              <div className="item">
                <h4>Asset results</h4>
                <div className="coins-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th className="name-column">Coin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coinsSearch.length === 0 ?
                        <>
                          No result found for coins.
                        </>
                        :
                        <>
                          {coinsSearch.slice(0, minCount).map(item => (
                            <tr key={`search-${item.id}`}>
                              <td>{item.market_cap_rank}</td>
                              <td className="name-column">
                                <img src={`${item.thumb}`} alt={`${item.name}`} />
                                {item.name}
                                <span>({item.symbol})</span>
                              </td>
                            </tr>
                          ))}
                        </>
                      }
                    </tbody>
                  </table>

                </div>
                <div className="spinner"></div>
              </div>
              <div className="item">
                <h4>Exchange results</h4>
                <div className="exchanges-list">
                  <table>
                    <thead>
                      <tr>
                        <th className="name-column">Exchange</th>
                        <th>Market</th>
                      </tr>
                    </thead>

                    <tbody>
                      {exchangesSearch.length === 0 ?
                        <>No result found for exchanges.</>
                        :
                        <>
                          {exchangesSearch.slice(0, minCount).map(item => (
                            <tr key={item.id}>
                              <td className="name-column">
                                <img src={`${item.thumb}`} alt={`${item.name}`} />
                                {item.name}
                              </td>
                              <td>{item.market_type
                              }</td>
                            </tr>
                          ))}
                        </>
                      }
                    </tbody>
                  </table>
                </div>
                <div className="spinner"></div>
              </div>
              <div className="item">
                <h4>NFT results</h4>
                <div className="nfts-list">
                  <table>
                    <thead>
                      <tr>
                        <th className="name-column">NFT</th>
                        <th>Symbol</th>
                      </tr>
                    </thead>

                    <tbody>
                      {nftsSearch.length === 0 ?
                        <>No result found for nfts.</>
                        :
                        <>
                          {nftsSearch.slice(0, minCount).map(item => (
                            <tr key={`${item.id}`}>
                              <td className="name-column">
                                <img src={item.thumb} alt={item.name} />
                                {item.name}
                              </td>
                              <td>{item.symbol}</td>
                            </tr>
                          ))}
                        </>
                      }
                    </tbody>
                  </table>
                </div>
                <div className="spinner"></div>
              </div>
            </div>
          }
        </>
        :
        <h3 className="title-search"> Please search somthing... </h3>
      }
    </>
  )
}

export default Search;
