import Graph from "./Graph";
import './Graphs.css'
interface GraphsProps {} // Por ahora Graphs no recibe props

const Graphs: React.FC<GraphsProps> = () => {
  // Datos para el gráfico de Liquidity
  const liquidityData = {
    name: "LIQUIDITY",
    date: "June 9, 2021",
    value: "721.5M",
  };

  // Datos para el gráfico de Volumen 24H
  const volumeData = {
    name: "VOLUME 24H",
    date: "June 18, 2021",
    value: "510.4M",
  };

  return (
    <div className="GraphsContainer">
      <Graph
        graphName={liquidityData.name}
        graphDate={liquidityData.date}
        graphValue={liquidityData.value}
      />
      <Graph
        graphName={volumeData.name}
        graphDate={volumeData.date}
        graphValue={volumeData.value}
      />
    </div>
  );
};

export default Graphs;