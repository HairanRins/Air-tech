const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sName = document.querySelector('#m-name')
const sDate = document.querySelector('#m-date')
const sPrice = document.querySelector('#m-price')
const btnSave = document.querySelector('#btnSave')
let items
let id

function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
  
    if (edit) {
      sName.value = items[index].name
      sDate.value = items[index].date
      sPrice.value = items[index].price
      id = index
    } else {
      sName.value = ''
      sDate.value = ''
      sPrice.value = ''
    }
}

function editItem(index) {
    openModal(true, index)
}
  
function deleteItem(index) {
    items.splice(index, 1)
    setItemsBD()
    loadItems()
}

function insertItem(item, index) {

    let tr = document.createElement('tr');
    let id1 = Number(index) + 1
    tr.innerHTML = `
      <td>${id1}</td>
      <td>${item.name}</td>
      <td>${item.date}</td>
      <td>$ ${item.price}</td>
      <td class="modif">
        <button onclick="editItem(${index})"><i class='fas fa-pen' style="color:#0375f8;"></i></button>
      </td>
      <td class="modif">
        <button onclick="deleteItem(${index})"><i class='fas fa-trash' style="color:rgba(255, 0, 0, 0.781);"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
}

btnSave.onclick = e => {

    if (sName.value == '' || sDate.value == '' || sPrice.value == '') {
      return;
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      items[id].name = sName.value
      items[id].date = sDate.value
      items[id].price = sPrice.value
    } else {
      items.push({'name': sName.value, 'date': sDate.value, 'price': sPrice.value});
    }
  
    setItemsBD();
  
    modal.classList.remove('active');
    loadItems();
    id = undefined;
}

function loadItems() {
    items = getItemsBD();
    tbody.innerHTML = '';
    items.forEach((item, index) => {
      insertItem(item, index);
    })
  
}

const getItemsBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItemsBD = () => localStorage.setItem('dbfunc', JSON.stringify(items));

loadItems();
  
