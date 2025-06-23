import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { getData } from '../../utils/request';

function TabHolders() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataHolders, setDataHolders] = useState([]);

  useEffect(() => {
    const fetchDataHolders = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = await getData("companies/public_treasury/bitcoin");
        if (data) {
          setDataHolders(data.companies);
        };
      } catch (error) {
        console.error('Error fetching TabHolders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataHolders();

    return () => {
      setDataHolders([]);
      setIsLoading(false);
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
              <th> Company</th>
              <th>Total BTC</th>
              <th>Entry Value</th>
              <th>Total Current Value	</th>
              <th>Total %</th>
            </tr>
          </thead>
          <tbody>
            {dataHolders.map(item => (
              <tr key={item.name}>
                <td className='name-column'>{item.name}</td>
                <td>{item.total_holdings}</td>
                <td>${item.total_entry_value_usd.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td>
                <td>${item.total_current_value_usd.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td>
                <td className={`${item.percentage_of_total_supply >= 0 ? 'green' : 'red'}`}>{item.percentage_of_total_supply}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  )
}

export default TabHolders;
