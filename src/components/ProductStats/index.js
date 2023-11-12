const ProductStats = (props) => {
  const { initialProductStats, selectedMonth } = props;
  return (
    <div className="container">
      <h1 className="Product-statistics">
        Product statistics - <span className="spanelt">{selectedMonth}</span>
      </h1>
      <div className="stats-card">
        <p className="title">
          {" "}
          Total Sale Amount : {Math.round(initialProductStats.totalSaleAmount)}
        </p>
        <p className="title">
          {" "}
          Total Sold Items : {initialProductStats.totalSoldItems}
        </p>
        <p className="title">
          Total Not Sold Items : {initialProductStats.totalNotSoldItems}
        </p>
      </div>
    </div>
  );
};


export default ProductStats;