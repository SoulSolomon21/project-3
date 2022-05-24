let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//the if statement below checks if the are any leads stored in local storage
//and if so, they are added to the my leads array and then renderred to the screen
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
} 

// this is our function that renders the leads that are in our leads array onto the screen
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li>
                         <a href='${leads[i]}' target='_blank'>
                            ${leads[i]}
                         </a>
                      </li>` 
    }                     
    ulEl.innerHTML = listItems 
}

//this event listener gets the value from our input field and pushes it to the myLeads array
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    inputEl.value = ""
})

//this function is for the delete all button, it clears all the values from the myLeads array and then renders the empty array thus showing a clear screen 
deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// the function interacts with the chrome API to access the url of the currently active tab and then add it to our myLeads array 
tabBtn.addEventListener("click", function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)    
    })
})
























