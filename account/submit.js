const submitBtn = document.querySelector(".submit_btn");
const expenseBtn = document.querySelector(".expense_btn");
const historyList = document.querySelector(".history_list");
const selectBox = document.querySelector("#select_box");
const subjectInput = document.querySelector(".subject input");
const priceInput = document.querySelector(".price input");

let historyArr = [];
const HISTORY_KEY = "history";

function saveHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(historyArr));
}

function getHistotyObj(select, subject, price) {
  return {
    id: String(Date.now()),
    select: select,
    subject: subject,
    price: price,
  };
}

function submitAccount(event) {
  event.preventDefault();
  const selectVal = selectBox.options[selectBox.selectedIndex].text;
  const subjectVal = subjectInput.value;
  let priceVal = priceInput.value;

  if (priceVal.trim() === "") {
    alert("가격을 입력하세요");
    return;
  }
  if (expenseBtn.checked === true) {
    if (priceVal > 0) {
      priceVal = priceVal * -1;
    }
  }
  subjectInput.value = "";
  priceInput.value = "";
  const historyObj = getHistotyObj(selectVal, subjectVal, priceVal);
  paintAccount(historyObj);
  historyArr.push(historyObj);
  saveHistory();
  updatePrice();
}

submitBtn.addEventListener("click", submitAccount);

function paintAccount(history) {
  const li = document.createElement("li");
  li.id = history.id;
  const span = document.createElement("span");
  span.innerText = history.select;
  const subject = document.createElement("subject");
  subject.innerText = history.subject;
  const price = document.createElement("price");
  price.innerText = history.price;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteHistory);

  li.appendChild(span);
  li.appendChild(subject);
  li.appendChild(price);
  li.appendChild(button);
  historyList.appendChild(li);
}

const savedHistory = localStorage.getItem(HISTORY_KEY);

if (savedHistory !== null) {
  const parsedHistory = JSON.parse(savedHistory);
  historyArr = parsedHistory;
  parsedHistory.forEach(paintAccount);
}

function deleteHistory(event) {
  const button = event.target;
  const li = button.parentNode;

  li.remove();
  historyArr = historyArr.filter((item) => item.id !== li.id);
  saveHistory();
  updatePrice();
}
