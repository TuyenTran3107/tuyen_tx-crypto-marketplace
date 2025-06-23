import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { faL, fas } from '@fortawesome/free-solid-svg-icons';
import { getData } from '../../utils/request';

function TabCategories() {
  const [dataCategories, setDataCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataCategories = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = await getData("coins/categories");
        if (data) {
          setDataCategories(data.slice(0, 20));
        }
      } catch (error) {
        console.error('Error fetching TabCategories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataCategories();
    return () => {
      setDataCategories([]);
      setIsLoading(true);
    };
  }, []);
  return (
    <>
      {isLoading ?
        <div className="spinner" id="coins-list-spinner"><LoadingOutlined /></div>
        :
        <table>
          <thead>
            <tr>
              <th>  Top Coins</th>
              <th>Category</th>
              <th>Market Cap</th>
              <th>24h Market Cap	</th>
              <th>24h Volume</th>

            </tr>
          </thead>
          <tbody>
            {dataCategories.map(item => (
              <tr key={item.id}>
                <td>
                  {item.top_3_coins.map((itemCoin, indexCoin) => (
                    <img src={`${itemCoin}`} key={`${item.id}-top-${indexCoin}`} />
                  ))}
                </td>
                <td className='name-column'>{item.name}</td>
                <td>{item.market_cap ? `$${item.market_cap.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}` : "N/A"}</td>
                <td className={`${item.market_cap_change_24h > 0 ? 'green' : 'red'}`}>{item.market_cap_change_24h ? `${item.market_cap_change_24h.toFixed(3)}%` : "N/A"}</td>
                <td>{item.volume_24h ? `$${item.volume_24h.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}` : "N/A"}</td>

              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  )
}

export default TabCategories;
