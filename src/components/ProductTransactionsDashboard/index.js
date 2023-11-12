import React, { Component } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import "./index.css";
import PieChartModule from "../PieChartModule";
import BargraphSection from "../BargraphSection";
import ProductStats from "../ProductStats";
import { MutatingDots } from "react-loader-spinner";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "MMMM dd, yyyy - hh:mm a");
};

const monthsList = [
  { id: 1, month: "JAN" },
  { id: 2, month: "FEB" },
  { id: 3, month: "MAR" },
  { id: 4, month: "APR" },
  { id: 5, month: "MAY" },
  { id: 6, month: "JUN" },
  { id: 7, month: "JUL" },
  { id: 8, month: "AUG" },
  { id: 9, month: "SEP" },
  { id: 10, month: "OCT" },
  { id: 11, month: "NOV" },
  { id: 12, month: "DEC" },
];
const apiConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  pending: "PENDING",
  failed: "FAILED",
  success: "SUCCESS",
};

class ProductTransactionsDashboard extends Component {
  state = {
    apiStatus: apiConstants.initial,
    initialProductTransactions: [],
    initialProductStats: [],
    initialProductBarChart: [],
    searchInputValue: "",
    currentPage: 1,
    perPage: 10,
    selectedMonth: monthsList[2]["month"],
    selectedMonthNum: 3,
  };

  componentDidMount() {
    this.getDataFromAPi();
    this.initializeDd();
  }
  initializeDd = async () => {
    this.setState({ apiStatus: apiConstants.loading });
    const url =
      "https://product-transactions.onrender.com/api/initialize-database";
    const response = await axios.get(url);
    const data = await response.data;
    await this.setState({ apiStatus: apiConstants.success });
    console.log(data.message);
  };

  getDataFromAPi = async () => {
    this.setState({ apiStatus: apiConstants.loading });
    const { selectedMonthNum, searchInputValue, perPage, currentPage } =
      this.state;
    const response = await axios.get(
      `https://product-transactions.onrender.com/api/product-transactions-statistics-barChart-pieChart/${selectedMonthNum}?search=${searchInputValue}&page=${currentPage}&perPage=${perPage}`
    );
    await this.setState({ apiStatus: apiConstants.success });

    const jsonData = await response.data;
    const {
      transactions,
      statistics,
      barChart,
      bar_chart,
      pie_chart,
      pieChart,
    } = jsonData;
    const updatedStats = {
      totalSaleAmount: statistics.total_sale_amount,
      totalSoldItems: statistics.total_sold_items,
      totalNotSoldItems: statistics.total_not_sold_items,
    };
    this.setState({
      initialProductTransactions: transactions,
      initialProductStats: updatedStats,
      initialProductBarChart: barChart || bar_chart,
      initialProductPieChart: pieChart || pie_chart,
    });
  };

  onSelectMonth = (e) => {
    const monthNum = e.target.value;
    this.setState(
      {
        selectedMonth: monthsList[monthNum - 1]["month"],
        selectedMonthNum: monthNum,
      },
      this.getDataFromAPi
    );
  };

  onSearchInput = (e) => {
    this.setState({ searchInputValue: e.target.value }, this.getDataFromAPi);
  };

  renderNoTransView = () => (
    <div className="empty-trans">
      <h1>Empty Transactions !</h1>
    </div>
  );

  renderLoading = () => (
    <div className="empty-trans">
      <MutatingDots
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );

  onClickNextPage = () => {
    const { perPage, currentPage } = this.state;
    if (parseInt(60 / perPage) > currentPage) {
      this.setState(
        (prevState) => ({ currentPage: prevState.currentPage + 1 }),
        this.getDataFromAPi
      );
    }
  };

  onClickPreviousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState(
        (prevState) => ({ currentPage: prevState.currentPage - 1 }),
        this.getDataFromAPi
      );
    }
  };

  renderPagination = () => {
    const { currentPage, perPage } = this.state;

    return (
      <div className="pagination">
        <h3>
          Page No:{" "}
          <input
            className="editable-pageNum"
            onChange={(e) => this.onEditPageNumber(e)}
            type="number"
            value={currentPage}
          />
        </h3>
        <div className="pagination-btns">
          <button
            className="pagination-btn"
            type="button"
            onClick={this.onClickPreviousPage}
          >
            &lt; Previous
          </button>
          <p>-</p>
          <button
            className="pagination-btn"
            type="button"
            onClick={this.onClickNextPage}
          >
            Next &gt;
          </button>
        </div>
        <h3>
          Per Page:
          <input
            className="editable-pageNum"
            onChange={(e) => this.onEditPerPage(e)}
            type="number"
            value={perPage}
          />
        </h3>
      </div>
    );
  };

  onEditPageNumber = (e) => {
    const pageNum = e.target.value;
    const { perPage, initialProductTransactions } = this.state;
    if (parseInt(initialProductTransactions.length / perPage) >= pageNum) {
      this.setState({ currentPage: pageNum }, this.getDataFromAPi);
    }
  };

  onEditPerPage = (e) => {
    const pageNum = e.target.value;

    if (pageNum !== "" && pageNum >= 1) {
      this.setState({ perPage: pageNum }, this.getDataFromAPi);
    }
  };

  renderProductTransactionsAndStats = () => {
    const {
      initialProductTransactions,
      selectedMonth,
      initialProductStats,
      initialProductPieChart,
      initialProductBarChart,
    } = this.state;
    return (
      <div className="result-container">
        {initialProductTransactions.length === 0 ? (
          this.renderNoTransView()
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr id="cstm-tr-td">
                  <th id="cstm-tr-td">S.No</th>
                  <th id="cstm-tr-td">Title</th>
                  <th id="cstm-tr-td">Price</th>
                  <th id="cstm-tr-td">Description</th>
                  <th id="cstm-tr-td">Category</th>
                  <th id="cstm-tr-td">Image</th>
                  <th id="cstm-tr-td">Sold</th>
                  <th id="cstm-tr-td">Date Of Sale</th>
                </tr>
              </thead>
              <tbody>
                {initialProductTransactions.map((eachTrans) => (
                  <tr className="custom-tr" key={eachTrans.id}>
                    <th>{eachTrans.id}</th>
                    <th>{eachTrans.title}</th>
                    <td>{eachTrans.price}</td>
                    <td style={{ padding: "60px" }}>
                      <span>{eachTrans.description}</span>
                    </td>
                    <td>{eachTrans.category}</td>
                    <td>
                      <img
                        className="product-img"
                        alt={eachTrans.title}
                        src={eachTrans.image}
                      />
                    </td>
                    <td style={{ color: eachTrans.sold ? "red" : "green" }}>
                      <h5> {eachTrans.sold ? "Sold Out" : "Not Sold"}</h5>
                    </td>
                    <td>
                      {formatDate(
                        eachTrans.date_of_sale || eachTrans.dateOfSale
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {this.renderPagination()}

        <ProductStats
          initialProductStats={initialProductStats}
          selectedMonth={selectedMonth}
        />

        <BargraphSection
          initialProductBarChart={initialProductBarChart}
          selectedMonth={selectedMonth}
        />

        <div className="container">
          <PieChartModule
            data={
              initialProductPieChart !== undefined ? initialProductPieChart : []
            }
            selectedMonth={selectedMonth}
          />
        </div>
      </div>
    );
  };

  renderResults = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoading();

      case apiConstants.success:
        return this.renderProductTransactionsAndStats();

      default:
        return null;
    }
  };

  render() {
    const {
      selectedMonthNum,

      searchInputValue,
    } = this.state;
    return (
      <div className="Transactions-Dashboard">
        <div className="responsive">
          <h1 className="Transactions-Dashboard-heading ">
            Transactions Dashboard :
          </h1>
          <div className="search-and-select-month">
            <input
              className="search-bar"
              value={searchInputValue}
              onChange={(e) => this.onSearchInput(e)}
              type="search"
              placeholder="Search using title/description/price"
            />
            <select
              className="month-dropdown"
              value={selectedMonthNum}
              onChange={(e) => this.onSelectMonth(e)}
            >
              {monthsList.map((eachItem) => (
                <option
                  value={eachItem.id}
                  // selected={eachItem.month === "MAR"}
                  key={eachItem.id}
                >
                  {eachItem.month}
                </option>
              ))}
            </select>
          </div>
          {this.renderResults()}
        </div>
      </div>
    );
  }
}

export default ProductTransactionsDashboard;
