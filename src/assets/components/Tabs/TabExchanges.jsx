import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/request';

function TabExchanges() {
  const [dataExchanges, setDataExchanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchDataExchanges = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = await getData("exchanges");
        if (data) {
          setDataExchanges(data.slice(0, 20));
        }
      } catch (error) {
        console.error('Error fetching TabExchanges:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataExchanges();

    return () => {
      setDataExchanges([]);
      setIsLoading(true);
    }
  }, []);
  return (
    <>
      {isLoading ?
        <div className="spinner" id="coins-list-spinner"><LoadingOutlined /></div>
        :
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Exchange</th>
              <th>Trust Score</th>
              <th>24h Trade	</th>
              <th>24h Trade(Normal)	</th>
              <th>Country</th>
              <th>Website</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {dataExchanges.map(item => (
              <tr key={item.id}>
                <td>{item.trust_score_rank}</td>
                <td className='name-column'>
                  <img src={`${item.image}`} alt={`${item.name}`} />
                  {item.name}
                </td>
                <td>{item.trust_score}</td>
                <td>{item.trade_volume_24h_btc.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })} BTC</td>
                <td>{item.trade_volume_24h_btc_normalized ? `${item.trade_volume_24h_btc_normalized.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}BTC` : "N/A"} </td>
                <td className="name-column">{item.country || 'N/A'}</td>
                <td className="name-column">{item.url}</td>
                <td>{item.year_established || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  )
}

export default TabExchanges;
