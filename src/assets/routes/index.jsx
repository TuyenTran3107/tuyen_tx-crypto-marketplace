import Layout from "../components/Layout";
import About from "../pages/About";
import Chart from "../pages/Chart";
import Coin from "../pages/Coin";
import Home from "../pages/Home";
import Search from "../pages/Search";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'chart',
        element: <Chart />
      },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'coin',
        element: <Coin />

      }
    ]

  }
];