// create a submit event listener for the form

const form = document.querySelector('form');
const fileInput = document.querySelector('input[type="file"]');
form.addEventListener("submit", ev => {
  ev.preventDefault();

  const formData = new FormData();

  formData.append('profile', fileInput.files[0]);
  // formData.append('profile', fileInput.files[0], 'profilePicture.png'); names the file travels ... shouldn't do {

  } while (true);

  fetch('/images/upload', {
    method: 'post',
    body: formData
  })
    .then(res => res.json()) // parses the json to an object !!!
    .then(data => { // data is what comes from the then before... the parsed file
      if(!isImageThere) {
      const imageElement = document.createElement('IMG');
      imageElement.setAttribute('src', 'uploadedImages/' + data.file);
      document.body.append(imageElement);

      isImageThere = true;
      } else {
        const imageFound = document.querySelector('img');
        imageFound.setAttribute('src', 'uploadedImages/' + data.file);
      }
    })
    .catch(err => console.warn(err))
});

// grab the value of the input of type file and make a fetch request




// BOILERPLATE FOR EVENT LISTENER AND FETCH REQUEST:

// const form = document.querySelector('form');
// const fileInput = document.querySelector('input[type="file"]');
// form.addEventListener("submit", ev => {
//   ev.preventDefault();
//
//   fetch()
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.warn(err))
// });
