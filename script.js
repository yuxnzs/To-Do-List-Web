const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");
const button = document.querySelector("button");
const bottom = document.querySelector(".bottom");

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});

// 檢查 Task 數量
function checkTasks() {
  if (listContainer.children.length === 0) {
    // 如果沒有 Task，隱藏 .bottom
    bottom.style.display = "none";
  } else {
    // 如果有 Task，顯示 .bottom
    bottom.style.display = "block";
  }
}

button.addEventListener("click", () => {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerText = "\u00d7";
    li.appendChild(span);
    checkTasks(); // 檢查 Task
  }
  inputBox.value = "";
  saveData();
});

listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
    checkTasks(); // 檢查 Task
    saveData();
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
  checkTasks(); // 保存資料後再次檢查
}

function showTasks() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
  checkTasks(); // 加載 Task 後檢查
}

showTasks();
