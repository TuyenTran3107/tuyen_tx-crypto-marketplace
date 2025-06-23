import { useEffect, useState } from "react";
import { getData } from "../../utils/request";
import { LoadingOutlined } from '@ant-design/icons';
import { Line, Tiny } from "@ant-design/charts";


function TabAssets() {
  const [dataAssets, setDataAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataAssets = async () => {
      setIsLoading(true)
      try {
        const data = await getData('coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true');
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (data) {
          setDataAssets(data);
        }
      } catch (error) {
        console.error('Error fetching TabAssets:', error);

      } finally {
        setIsLoading(false);
      }
    };
    fetchDataAssets();
    return () => {
      setDataAssets([]);
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
              <th>Coin</th>
              <th>Price</th>
              <th>24h Price	</th>
              <th>24h Price %	</th>
              <th>Total Vol</th>
              <th>Market Cap</th>
              <th>Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {dataAssets.map(item => {

              const data = [
                ...item.sparkline_in_7d.price
              ].map((value, index) => ({ value, index, color: item.sparkline_in_7d.price[0] <= item.sparkline_in_7d.price[item.sparkline_in_7d.price.length - 1] ? 'green' : 'red' }));

              const config = {
                data,
                width: 100,
                height: 50,
                smooth: true,
                xField: 'index',
                yField: 'value',
                style: {
                  lineWidth: 1,
                  stroke: item.sparkline_in_7d.price[0] <= item.sparkline_in_7d.price[item.sparkline_in_7d.price.length - 1] ? 'green' : 'red',
                },
              };

              return (
                <tr key={item.id}>
                  <td>{item.market_cap_rank}</td>
                  <td className="name-column">
                    <img src={`${item.image}`} alt={`${item.name}`} />
                    {item.name}
                    <span>({item.symbol.toUpperCase()})</span>
                  </td>
                  <td>${item.current_price.toFixed(2)}</td>
                  <td className={`${item.price_change_percentage_24h >= 0 ? 'green' : 'red'}`}>${item.price_change_24h.toFixed(2)}</td>
                  <td className={`${item.price_change_percentage_24h >= 0 ? 'green' : 'red'}`}>${item.price_change_percentage_24h.toFixed(2)}%</td>
                  <td>${item.total_volume.toLocaleString()}</td>
                  <td>${item.market_cap.toLocaleString()}</td>
                  <td >
                    <Tiny.Line {...config} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </>
  )
}

export default TabAssets;
