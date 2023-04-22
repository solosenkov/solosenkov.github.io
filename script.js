const jokeContainer = document.getElementById('joke-container');

fetch('https://api.chucknorris.io/jokes/random')
  .then(response => response.json())
  .then(data => {
    jokeContainer.innerText = data.value;
  })
  .catch(error => {
    jokeContainer.innerText = 'Failed to get joke :(';
    console.error(error);
  });

  const jokeContainer2 = document.getElementById('joke-container-2');

fetch('http://umorili.herokuapp.com/api/get?site=anekdot.ru&name=new&num=1')
  .then(response => response.json())
  .then(data => {
    const joke = data.result[0].elementPureHtml;
    jokeContainer2.innerHTML = joke;
  })
  .catch(error => console.error(error));
