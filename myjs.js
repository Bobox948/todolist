



document.addEventListener('DOMContentLoaded', function() { // making sure the doam is loaded first, after that we can locate elements by ID easily


 
    load_default() // load the tasks from localstorage
  


    document.getElementById('add').addEventListener('click', addTask)
  
  
  
    document.getElementById('clear').addEventListener('click', clear)

  
  
  
  
  
  
  
  
  
  
  })
  
  
  
  
  
    


var tasks = [

]



  
function Task(title) {

    this.title = title
    
}


function load_default() {

    var storage = Object.keys(localStorage) // retrieving all the keys from session storage

    for (var i=0; i<storage.length; i++)

    {   
  var content = storage[i]





    var div = document.querySelector('#default')

  var newdiv = document.createElement("div")
  div.appendChild(newdiv);
  newdiv.innerHTML = content
  var str = content.replace(/\s/g, ''); //  deleting the spaces, because if not, the id with space will bug
  newdiv.setAttribute('id', 't'+str) // we place a "t" before the id, in case the user adds a task starting with a number, and which would cause the id to bug

  var deletebtn = document.createElement("input")
  newdiv.appendChild(deletebtn);
  deletebtn.setAttribute('type', 'checkbox')

  deletebtn.setAttribute('class', 't'+str)

  var dltbtn = document.querySelector(`.t${str}`)

  dltbtn.addEventListener('click', function() {


    var content2 = this.parentElement.innerHTML 
    let pattern = /(?<=)(.*?)(?=\<)/
    let result = content2.match(pattern);
    let value = result[0] // retrieving the value with all the steps above in order to have a queryselector on click with the right DIV
    var str = value.replace(/\s/g, '');

    var div = document.querySelector(`#t${str}`)

    div.innerHTML =`<span class="strike">${value}</span>` // here, on click the texte will be striked

    setTimeout(function(){ // first striking the text, then removing


    div.remove() // deleting the div
    
    localStorage.removeItem(value)    // deleting the item from session storage


    }, 2000);






})
}


}





function addTask(event) {
    

  event.preventDefault() // prevent reloading on submit
  var title = document.querySelector('.value').value
  if (title.length > 0) { // if nothing is typed there is no submit
    const task = new Task(title)
    tasks.push(task)

    document.querySelector('.value').value = '' // reseting the input field after submit

    var choice = document.querySelector('#default')
    var newdiv = document.createElement("div")
    choice.appendChild(newdiv);
    newdiv.innerHTML = title
    localStorage.setItem(title, title) // storing into session storage
    var delbtn =  document.createElement("input")
    delbtn.setAttribute('type', 'checkbox')

    var str = title.replace(/\s/g, '');

    delbtn.setAttribute('id', 't'+str)
    newdiv.appendChild(delbtn)

    delbtn.addEventListener('click', function(){

          
        
        var index = tasks.map(function(e) { return e.title; }).indexOf(title);   // locating the index of the title in the tasks array
        if (index !== -1) { // if index is -1 that means the item is not in the array
        tasks.splice(index, 1);} 
      
        localStorage.removeItem(title)  
        newdiv.innerHTML = `<span class="strike">${title}</span>`

        setTimeout(function(){
          newdiv.remove()

    }, 2000);
        

    })

  }


}



  
 
function clear(){
  localStorage.clear() // clearing the session storage
  window.location.reload() // reloading the window to blank everything
}



