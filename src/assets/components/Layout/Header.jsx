import { CaretDownOutlined, CaretUpOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/request';
function Header() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [dataGlobal, setDataGlobal] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.setAttribute('id', 'theme-dark');
    } else {
      body.removeAttribute('id');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchGlobal = async () => {
      const data = await getData('global');
      if (data) {
        setDataGlobal(data.data);
      }
    };

    fetchGlobal();
  }, []);
  const handleToggleTheme = () => {
    const body = document.body;
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      body.setAttribute('id', 'theme-dark');
    } else {
      body.removeAttribute('id');
    }
  }

  const onSearch = (e) => {
    const value = e.target.value;
    console.log(value);
    navigate(`search?query=${value}`);
  }


  return (
    <div className='header'>
      <div className="global">
        <p>Coins: <b id="coins-count">{dataGlobal.active_cryptocurrencies || 'N/A'}</b></p>
        <p>Exchanges: <b id="exchanges-count">{dataGlobal.markets || 'N/A'}</b></p>
        <p>Market Cap:
          <span>
            <b id="marketCap"> {dataGlobal.total_market_cap?.usd ? `$${(dataGlobal.total_market_cap.usd / 1e12).toFixed(3)}T` : 'N/A'}</b>

            {dataGlobal.market_cap_change_percentage_24h_usd !== undefined ?
              (
                <span
                  id="marketCapChange"
                  className={dataGlobal.market_cap_change_percentage_24h_usd > 0 ? "green" : "red"}
                >
                  {dataGlobal.market_cap_change_percentage_24h_usd > 0 ?
                    (<>
                      {parseFloat(dataGlobal.market_cap_change_percentage_24h_usd).toFixed(1)}%
                      <CaretUpOutlined style={{ color: 'green' }} />
                    </>)
                    :
                    (<>
                      {parseFloat(dataGlobal.market_cap_change_percentage_24h_usd).toFixed(1)}%
                      <CaretDownOutlined style={{ color: 'red' }} />
                    </>)
                  }
                </span>
              )
              :
              "N/A"
            }
          </span>
        </p>
        <p>24H Vol: <b id="volume">{dataGlobal.total_volume?.usd ? `$${(dataGlobal.total_volume?.usd / 1e9).toFixed(3)}B` : "N/A"}</b></p>
        <p>Dominance: <b id="dominance">
          {`BTC ${dataGlobal.market_cap_percentage?.btc.toFixed(1)}% - ETH ${dataGlobal.market_cap_percentage?.eth.toFixed(1)}%`}
        </b></p>
      </div>
      <div className='header-main'>
        <div className='header-left'>
          {isDarkMode ?
            <img src="/public/logo-white.png" alt="logo" />
            :
            <img src="/public/logo-dark.png" alt="logo" />
          }
          <ul className='header-menu'>
            <li><NavLink to='/' className='text-menu '>Home</NavLink></li>
            <li><NavLink className='text-menu' to='/chart'>Charts</NavLink></li>
            <li><NavLink className='text-menu' to='/search'>Search</NavLink></li>
            <li><NavLink className='text-menu' to='/about'>About us</NavLink></li>
          </ul>
        </div>
        <div className='header-right'>
          <Input
            id='searchInput'
            placeholder="Search for an asset..."
            onPressEnter={onSearch}
            variant
          />
          {isDarkMode ?
            <SunOutlined className='theme-toggle' onClick={handleToggleTheme} />
            :
            <MoonOutlined className='theme-toggle' onClick={handleToggleTheme} />
          }
        </div>
      </div>
    </div>
  )
}

export default Header;
