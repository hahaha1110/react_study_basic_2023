import { useContext, useEffect, useState } from "react";
import Button from "../component/Button";
import Header from "../component/Header";
import { DiaryStateContext } from "../App";
import { getMonthRangedByDate, setPageTitle } from "../util";
import DiaryList from "../component/DiaryList";
const Home = () => {
  useEffect(() => {
    setPageTitle("hahaha의 감정 일기장");
  }, []);
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  const headerTitle = `${pivotDate.getFullYear()}년 ${
    pivotDate.getMonth() + 1
  }월`;
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  useEffect(() => {
    if (Date.length >= 1) {
      const { beginTimeStamp, endTimeStamp } = getMonthRangedByDate(pivotDate);
      setFilteredData(
        data.filter(
          (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [data, pivotDate]);

  return (
    <div>
      <Header
        title={headerTitle}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={filteredData} />
    </div>
  );
};
export default Home;
