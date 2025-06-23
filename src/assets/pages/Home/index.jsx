import { useEffect, useState } from "react";
import "./Home.css"
import { getData } from "../../utils/request";
import TrendingCoins from "../../components/Trending/TrendingCoins";
import TrendingNFTs from "../../components/Trending/TrendingNFTs";
import { RiApps2Line, RiArrowLeftRightLine, RiBtcLine, RiExchange2Line } from "@remixicon/react";
import TabAssets from "../../components/Tabs/tabAssets";
import TabCategories from "../../components/Tabs/tabCategories";
import TabExchanges from "../../components/Tabs/tabExchanges";
import TabHolders from "../../components/Tabs/tabHolders";
import "../../components/Trending/Trending.css";
import "../../components/Tabs/Tabs.css";
function Home() {
  const [coinsTrending, setCoinsTrending] = useState([]);
  const [nftsTrending, setNftsTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabActive, setTabActive] = useState('Assets');
  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true);
      try {
        const dataTrending = await getData('search/trending');
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (dataTrending) {
          setCoinsTrending(dataTrending.coins.slice(0, 5));
          setNftsTrending(dataTrending.nfts.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching trending:', error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchTrending();
    // setInterval(() => {
    //   fetchTrending();
    // }, 3000);
  }, []);

  const renderTabToDisplay = () => {
    switch (tabActive) {
      case 'Assets':
        return (
          <>
            <TabAssets />
          </>
        )
      case 'Exchanges':
        return (
          <>
            <TabExchanges />
          </>
        )
      case 'Categories':
        return (
          <>
            <TabCategories />
          </>
        )
      case 'Holders':
        return (
          <>
            <TabHolders />
          </>
        )
      default:
        break;
    }
  }


  return (
    <>
      <div className="trending">
        <TrendingCoins coinsTrending={coinsTrending} isLoading={isLoading} />
        <TrendingNFTs nftsTrending={nftsTrending} isLoading={isLoading} />
      </div>

      <div className="tabs">
        <div className="tabs-list ">
          <button
            className={`tab-content ${tabActive === "Assets" ? "tab-active" : ""}`}
            onClick={() => setTabActive("Assets")}
          >
            <RiApps2Line />
            <span>Assets</span>
          </button>

          <button
            className={`tab-content ${tabActive === "Exchanges" ? "tab-active" : ""}`}
            onClick={() => setTabActive("Exchanges")}
          >
            <RiArrowLeftRightLine />
            <span>Exchanges</span>
          </button>

          <button
            className={`tab-content ${tabActive === "Categories" ? "tab-active" : ""}`}
            onClick={() => setTabActive("Categories")}

          >
            <RiExchange2Line />
            <span>Categories</span>
          </button>

          <button
            className={`tab-content ${tabActive === "Holders" ? "tab-active" : ""}`}
            onClick={() => setTabActive("Holders")}

          >
            <RiBtcLine />
            <span>Holders</span>
          </button>
        </div>
        <div className="tab-show">
          {renderTabToDisplay()}
        </div>
      </div>
    </>
  )
}
export default Home;