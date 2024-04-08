let myLeads = [];
const inputEle = document.getElementById("input-ele");
const inputBtn = document.getElementById("input-btn");
let ulEl = document.getElementById("ul-el");
let deleteBtn = document.getElementById("delete-btn");
let leadsfromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
let tabBtn = document.getElementById("tab-btn");

if (leadsfromLocalStorage) {
  myLeads = leadsfromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // console.log(tabs)
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEle.value);
  inputEle.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // listItems += "<li><a target = '_blank' href = '#'>" + myLeads[i] + "</a></li>"?
    listItems += `
      <li>
        <a target = '_blank' href = '${leads[i]}'> 
          ${leads[i]} 
        </a>
      </li>`;
    // console.log(listItems)
  }
  ulEl.innerHTML = listItems;
}
