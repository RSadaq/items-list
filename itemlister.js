const submit = document.querySelector("#submitButton");//submit button
submit.addEventListener('click', addItem);//event once submit button clicked

const list = document.querySelector('#list');//ul of items
list.addEventListener('click', removeItem);//event once remove btn clicked

submit.disabled = true;//submit btn disabled

const userInput = document.getElementById('userInput');//box for items to be inputted
userInput.addEventListener('keyup', enableSubmit);//event enables submit btn if item entered

const itemSearch = document.querySelector("#search").addEventListener('keyup', searchItem);//search box

let listForLocalStorage = localStorage.getItem('listOfItems')
? JSON.parse(localStorage.getItem('listOfItems')) : []//checks if 'listOfItems' can be found in localStorage
//if present, parse it. Otherwise, set variable to empty array

localStorage.setItem('listOfItems', JSON.stringify(listForLocalStorage));

const data = JSON.parse(localStorage.getItem('listOfItems'));

function enableSubmit(e)//submit button disabled if user inputs white space
{
   
if(e.target.value.trim() === "")
{    
    submit.disabled = true; 
}
else
{
    submit.disabled = false;
}
}

const liMaker = (text) => //creates the list item on UI with a delete btn

{
    var newItem = document.createElement('li');
    var textNode = document.createTextNode(text);
    newItem.style.fontSize='30px';
    newItem.style.fontFamily="Gill Sans,Gill Sans MT,Calibri,Trebuchet MS, sans-serif";

    newItem.appendChild(textNode);
    list.appendChild(newItem);

    localStorage.setItem(text, text);//saves the item inputted by the user in localStorage

    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('X'));
    deleteBtn.className='delete';
    deleteBtn.style.float='right';
    deleteBtn.style.marginRight='100px';
    deleteBtn.style.backgroundColor='red';
    newItem.appendChild(deleteBtn);
}

data.forEach((item)=>//go through array in localStorage and call liMaker for each item so items previously added are displayed on UI
{
liMaker(item);
})

function addItem()//add item inputted by user to UI by creating a new 'li' element & a delete button
{
   listForLocalStorage.push(userInput.value);//add item to array for local storage
   localStorage.setItem('listOfItems', JSON.stringify(listForLocalStorage));//push array to local storage
   liMaker(userInput.value);
   
   userInput.value = '';//Clear 'userInput' box so inputted item not added more than once
   submit.disabled = true;//disable 'submit' button until user inputs next item.
}

function removeItem(e)//remove item from list
{
    if(e.target.classList.contains('delete'))//ensures correct item is deleted
    {
        if(confirm('Delete item?'))
        {
            const item = e.target.parentElement;
            list.removeChild(item);//removes item from UI

            const ItemInStorage = e.target.parentElement.textContent.split('X')[0];//name of item without 'X' text for delete button
            const index = listForLocalStorage.indexOf(ItemInStorage);//gets index of item
            if (index > -1) //checks item exists in list
            {
               var x = listForLocalStorage.splice(index, 1);//1 item to be deleted from list in localStorage
               localStorage.removeItem(x);
               localStorage.setItem('listOfItems', JSON.stringify(listForLocalStorage));
            }          
        }
    }
}

function searchItem(e)//Searches to check if item already exists in list
{
const item = e.target.value.toLowerCase();
const items = list.getElementsByTagName('li');
Array.from(items).forEach(function(i)//Convert html collection to array
{
    const itemName = i.firstChild.textContent;
    if(itemName.toLowerCase().indexOf(item) != -1)//only display item if it matches user input in Search box.
    {
       i.style.display='block';
    }
    else
    {
        i.style.display='none';
    }
})
}
