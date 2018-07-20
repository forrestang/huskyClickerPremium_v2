
let myId =0;
//--------------------------------------------------------------------------------
//-------------MODEL--------------------------------------------------------------
let model = {
  myHuskies: [
    {
      name: "Alpha",
      myImg: "images/husky1.jpg",
      myClicks: 0
    },
    {
      name: "Bravo",
      myImg: "images/husky2.jpg",
      myClicks: 0
    },
    {
      name: "Charlie",
      myImg: "images/husky3.jpg",
      myClicks: 0
    },
    {
      name: "Delta",
      myImg: "images/husky4.jpg",
      myClicks: 0
    },
    {
      name: "Echo",
      myImg: "images/husky5.jpg",
      myClicks: 0
    }
  ]
};


//--------------------------------------------------------------------------------
//-------------OCTOPUS------------------------------------------------------------
let octopus = {
  init: function () {
    view.initPage();
    view.addListenersList();
    view.addListenersImage();
  },

  getHuskies: function () { //Get array of huskies from MODEL
    return model.myHuskies;
  },

  updateCounter: function() { //Increments counter in model
    model.myHuskies[myId].myClicks++;
    // console.log( model.myHuskies[myId]);
    view.render();  
  },
};



//--------------------------------------------------------------------------------
//-------------VIEW---------------------------------------------------------------
let view = {
  initPage: function () { //Function to display the LIST, NAME and IMAGE
    let index = myId; //Animal to display on init

    //Stuff for displaying LIST
    let elem;
    const huskies = octopus.getHuskies(); //Get huskies array from model VIA octopus
    huskies.forEach(element => { //Loop through huskies array
      elem = document.createElement('li'); //Creat <li>
      elem.textContent = element.name;  //store name from husky array into li
      document.querySelector('.myList').appendChild(elem); //append that name to list
    });

    //Stuff for displaying NAME
    document.querySelector('.dogName').textContent = huskies[index].name;

    //Stuff for displaying image
    document.querySelector('.myImg').src = huskies[index].myImg;

    //Stuff for displaying number of clicks
    document.querySelector('.numClicks').textContent = `Number of clicks for this Husky: ${huskies[index].myClicks}`;
  },

  addListenersList: function () { //Function to add event listeners to list and change image and name
    const huskies = octopus.getHuskies(); //Get huskies array from model VIA octopus
    const myList = document.querySelector('.myList'); //Get <li>s

    const myName = document.querySelector('.dogName');
    const myPicture = document.querySelector('.myImg');

    for (let i = 0; i < 5; i++) {
      myList.children[i].addEventListener('click', (event) => {
        if (event.target.nodeName === "LI") {
          myId = i; //Store ID so click on image can be called

          myPicture.src = huskies[i].myImg; //Change image
          myName.textContent = huskies[i].name; //Change name in HTML
        }
        this.render(); //Call with "this" because function call is inside view model
      });
    }
  },

  addListenersImage: function ()  { //Add event listener to the main image
    const myPic = document.querySelector('.myImg'); //Get current image

    myPic.addEventListener('click', () => { 
      octopus.updateCounter();  //Update counter VIA Octopus
    });
  },

  render: function () {
    const huskies = octopus.getHuskies(); //Get huskies array from model VIA octopus
    const myHeader = document.querySelector('.numClicks');
    myHeader.textContent = `Number of clicks for this Husky: ${huskies[myId].myClicks}`;
  },

};



//--------------------------------------------------------------------------------
//-------------ACTIVATION---------------------------------------------------------
octopus.init(); //make it start