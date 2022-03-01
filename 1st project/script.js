
//creating a container for data and search box
var container = document.createElement("div");
container.className = "brewery_api";
container.innerHTML = `<div class="form">
<form  action="#">
    <input type="search" class="search_box" placeholder="Search...">
    <select class="filter_dropdown" required>
        <option value="">None</option>
        <option value="name">Name</option>
        <option value="city">City</option>
        <option value="state">State</option>
        <option value="id">Id</option>
        <option value="brewery_type">Brewery_type</option>
        <option value="street">Street_name</option>
        <option value="postal_code">Postal</option>
        <option value="country">Country</option>
        <option value="phone">phone_no</option>
    </select>
    <input type="submit" onclick="search()" value="🔍">
    <input type="button" onclick="back()" class="back_btn" value="Clear Results">
</form>
</div>
`;


//to fetch the api and display the initial data(i.e 5 per page)
// for address the given address_2 nad address_3 is 'null',so i displayed state,city ,country,postal_code,street


async function fetch_api() {
  let api = await fetch("https://api.openbrewerydb.org/breweries", {
    method: "GET",
  });
  let data = await api.json();
  display(data);
}
fetch_api();


//creating table head for displaying the data that is mention in the question


container.innerHTML += `<table class="table table-bordered cellspacing="5" cellpadding="15">
        </thead class="table_head">
            <tr>
            <th>Name</th>
            <th>Brewery_type</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Postal_code</th>
            <th>Website Url</th>
            <th>Phone</th>
            <th>Other_details</th>
            </tr>
        </thead>
        <tbody class="table_data"></tbody>
    <table>
`;

// creating the variables to display the other details that are displayon the screen

let h4 = document.createElement("h4");
let details = document.createElement("div");

//function for displaying initial data(i.e first 5 on first page)

function display(data) {
  document.querySelector(".table_data").innerHTML = "";
  data.forEach((e, i) => {
    if (i < 5) {
      document.querySelector(".table_data").innerHTML += `
        <tr>
            <td >${e.name}</td>
            <td >${e.brewery_type}</td>
            <td>${e.street}</td>
            <td >${e.city}</td>
            <td >${e.state}</td>
            <td >${e.country}</td>
            <td >${e.postal_code}</td>
            <td >${e.website_url}</td>
            <td >${e.phone}</td>
            <td ><input type="button" class="other_details"   onclick="o_details(${i})" value="Other_details"</td>
        </tr>
        `;
    }
  });
  pagination_btns(data);
}

// function to display other details other than on the screen when pressing the other details button
// toogle_button to show and hide other details  with single button

let toogle_button = false;
async function o_details(index) {
    
    if(!toogle_button)
    {
        toogle_button = true;
    }
    else{
        toogle_button = false;
        h4.innerText = "";
        details.innerHTML = "";
        return
    }
  let api = await fetch("https://api.openbrewerydb.org/breweries", {
    method: "GET",
  });
  let data = await api.json();

  h4.innerText = "";
  h4.innerHTML = `Other details`;
  details.innerHTML = "";
  details.innerHTML = `<table class="details_table cellspacing="2" cellpadding="5"">
        <tr>
        <th>id</th>
        <th>County_province</th>
        <th>Address_2</th>
        <th>Address_3</th>
        <th>Longitude</th>
        <th>Latitude</th>
        <th>Updated_at</th>
        <th>Created_at</th>
        </tr>
        <tr>
        <td>${data[index].id}</td>
        <td>${data[index].address_2}</td>
        <td>${data[index].address_3}</td>
        <td >${data[index].county_province}</td>
        <td>${data[index].longitude}</td>
        <td>${data[index].latitude}</td>
        <td>${new Date(data[index].updated_at).toDateString()}</td>
        <td>${new Date(data[index].created_at).toDateString()}</td>
        </tr>
    </table>`;
  document.body.append();
}

// function to search for the input value given in search box and display the result data.
// we can search using full word/partial word/ case sensitive word also. 
// also created a filter so it will be easy in which section it should search and filter is mandatory to give.

async function search() {
  let search_value = document.querySelector(".search_box").value;
  let api = await fetch("https://api.openbrewerydb.org/breweries", {
    method: "GET",
  });
  let data = await api.json();
  document.querySelector(".back_btn").style.display="inline";
  let drop_value = document.querySelector(".filter_dropdown").value;
  document.querySelector(".table_data").innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    let reg=new RegExp(search_value,"gi")
    if (data[i][drop_value].match(reg)) {
      document.querySelector(".table_data").innerHTML += `
        <tr>
        <td>${data[i].name}</td>
        <td>${data[i].brewery_type}</td>
        <td>${data[i].street}</td>
        <td>${data[i].city}</td>
        <td>${data[i].state}</td>
        <td>${data[i].country}</td>
        <td>${data[i].postal_code}</td>
        <td>${data[i].website_url}</td>
        <td>${data[i].phone}</td>
        <td><input type="button" class="other_details"   onclick="o_details(${i})" value="Other_details"</td>
        </tr>`;
    }
    // Trying to display the alert box when the data is not found and search is case sensitive,
    // it is display but when i click on the okay button it is not closing and continously showing it.
    // thats why i commented it.

    // and the alert box is working fine in remaning tabs of chrome. only this webpage is not working
    else{
      // alert_box()
    }
  }
  
}

// function alert_box(){alert("Data Not Found")}

//to clear the result data 

async function back() {
    let api = await fetch("https://api.openbrewerydb.org/breweries", {
    method: "GET",
  });
  let data = await api.json();
    document.querySelector(".table_data").innerHTML = "";
    data.forEach((e, i) => {
      if (i < 5) {
        document.querySelector(".table_data").innerHTML += `
          <tr>
              <td >${e.name}</td>
              <td >${e.brewery_type}</td>
              <td>${e.street}</td>
              <td >${e.city}</td>
              <td >${e.state}</td>
              <td >${e.country}</td>
              <td >${e.postal_code}</td>
              <td >${e.website_url}</td>
              <td >${e.phone}</td>
              <td ><input type="button" class="other_details"   onclick="o_details(${i})" value="Other_details"</td>
          </tr>
          `;
      }
    });
  document.querySelector(".back_btn").style.display = "none";
  document.querySelector(".search_box").value=""
  document.querySelector(".filter_dropdown").value=""
}
//buttons for pagination for navigation beteween data,because we are displaying 5 data items perpage
//is the api length change then according to it it will create buttons for pagination(i.e only number buttons)
var no_of_pages=""
function pagination_btns(data) {
  let buttons = document.createElement("div");
  buttons.className = "buttons_div";
  no_of_pages = Math.ceil(data.length / 5);
  buttons.innerHTML +=`<input type="button" class="next_btn" onclick="next()" value="Next" />`;
  for (var i = 1; i <= no_of_pages; i++) {
    buttons.innerHTML += `
        <input type="button" class=" btns btn_${i}" onclick="page_data(event)" value="${i}">
        
        `;
  }
  buttons.innerHTML +=`<input type="button" class="prev_btn" onclick="prev()" value="Previous" />`;
  document.body.append(buttons);
}
var data_sliced = "";
// to display particular data based on the button clicking
async function page_data(event,next_val) {
  let value
  if(event=="")
  {
    value = next_val;
  }
  else
  {
    value = event.target.value;
  }
  let api = await fetch("https://api.openbrewerydb.org/breweries", {
    method: "GET",
  });
  let data = await api.json();


  // document.querySelector(".prev_btn").style.display="none"
  if(parseInt(value)>=2){
    document.querySelector(".prev_btn").style.visibility="visible"
  }
  else{document.querySelector(".prev_btn").style.visibility="hidden"}

  if(parseInt(value)==no_of_pages){
    document.querySelector(".next_btn").style.visibility="hidden"
  }
  else{document.querySelector(".next_btn").style.visibility="visible"}

  document.querySelector(".prev_btn").style.display="inline"
  data_sliced = data.slice((value - 1) * 5, value * 5);
  document.querySelector(".table_data").innerHTML = "";
  data_sliced.forEach((e) => {
    document.querySelector(".table_data").innerHTML += `
    <tr>
        <td >${e.name}</td>
        <td >${e.brewery_type}</td>
        <td>${e.street}</td>
        <td >${e.city}</td>
        <td >${e.state}</td>
        <td >${e.country}</td>
        <td >${e.postal_code}</td>
        <td >${e.website_url}</td>
        <td >${e.phone}</td>
        <td ><input type="button" class="other_details"   onclick="o_details(${e})" value="Other_details"</td>
    </tr>
    `;
  });
}
// navigate to next page from current page, if current page is last page then no changes will displayed
//for this function to work first we have to click on any number buttons
async function next() {
  let api = await fetch("https://api.openbrewerydb.org/breweries", {
    method: "GET",
  });
  let data = await api.json();
    let id=""
    data.forEach((e,i)=>{
        if(e.id==data_sliced[data_sliced.length-1].id)
        {
            return id=i
        }
    })
    
    if(id>=data.length-1){
        return
    }
    else{
        page_data("",((id+1)/5)+1)
    }
    
}
//navigate to previous page from current page, if cuurent page is first page then no changes will displayed
//for this function to work first we  have to click on any number buttons
async function prev() {
    let api = await fetch("https://api.openbrewerydb.org/breweries", {
        method: "GET",
      });
      let data = await api.json();
        let id=""
        data.forEach((e,i)=>{
            if(e.id==data_sliced[0].id)
            {
                return id=i
            }
        })
        
        if(id<=1){
            return
        }
        else{
            page_data("",((id)/5))
        }
}
//displaying the created elements 
document.body.append(container, h4, details);
