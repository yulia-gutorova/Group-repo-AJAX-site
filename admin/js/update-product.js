const ROOT_URL = process.env.ROOT_URL;

//Steps to extract information from url
let queryString = location.search;
let urlParams = new URLSearchParams(queryString);
let bookId = urlParams.get('id');

//Function when document loaded
document.addEventListener("DOMContentLoaded", async function(event) {
    //Define form element
    const form = document.getElementById('update-book');

    //Get access token
    checkAccessToken();

    //Get a book withspecific bookId 
    try
    {    
        let res = await fetch(ROOT_URL + '/books/' + bookId, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')          
              }
        })
        const data = await res.json();

        //Set default value to category
        document.querySelector('#category').value = `${data.category}`; 
        //Set values to form elements
        $('#title').val(data.title);
        $('#description').val(data.description);
        $('#price').val(data.price);
        $('#stock').val(data.stock);
        $('#image').val(data.image); 

        //Add listener to form submission
        form.addEventListener('submit', async (event)=>
        {
            event.preventDefault();
            //Define formData and get values from forn elements
            let formData = new FormData(event.target); 
            let cathegory = document.getElementById("category");
            let cathegoryOption = cathegory.options[cathegory.selectedIndex].value;

            let newBook = 
            {
                title: formData.get('title'),
                description: formData.get('description'),
                price: formData.get('price'),
                stock: formData.get('stock'),
                image: formData.get('image'),
                category: cathegoryOption,
            }

            //Update existing book
            try
            {
                const res = await fetch(ROOT_URL + '/books/' + bookId, {
                    method: 'PATCH',
                    body: JSON.stringify(newBook),
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')          
                    }
                  })
                  //Relocate to manage-products page
                  location.replace("manage-products.html");        
            }
            catch(error) 
            {
                console.log(error);
                
            } 
            location.replace("manage-products.html"); 
        }); 
    }
    catch (error) 
    {
        console.log(error);
    }  
})

 