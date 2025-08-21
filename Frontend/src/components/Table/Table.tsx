import './Table.css'

function Table(){
    return(
        <div className="crypto-table-container">
  <table className="crypto-table">
    <thead className="crypto-table-header">
      <tr>
        <th className="header-cell rank">#</th>
        <th className="header-cell name">Name</th>
        <th className="header-cell price">Price</th>
        <th className="header-cell change">24H Change</th>
        <th className="header-cell volume">24H Volume</th>
        <th className="header-cell market-cap">Market Cap</th>
        <th className="header-cell chart">7D Chart</th>
      </tr>
    </thead>
    <tbody className="crypto-table-body">
      <tr className="table-row">
        <td className="body-cell rank">1</td>
        <td className="body-cell name">
          <div className="coin-info">
            <img src="bitcoin-logo.png" alt="Bitcoin" className="coin-logo" />
            <div className="coin-name">
              <div className="coin-name-full">Bitcoin</div>
              <div className="coin-symbol">BTC</div>
            </div>
          </div>
        </td>
        <td className="body-cell price">$30382.81</td>
        <td className="body-cell change negative">-4.06%</td>
        <td className="body-cell volume">$43.43 B</td>
        <td className="body-cell market-cap">$572.34 B</td>
        <td className="body-cell chart"><div className="chart-placeholder"> {/* Aquí iría el gráfico */} </div></td>
      </tr>
      {/* ... más filas para otras criptomonedas ... */}
    </tbody>
  </table>
</div>
    )
}

export default Table