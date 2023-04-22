const output = document.getElementById('output');
const button = document.getElementById('button');
const input = document.getElementById('input');

const fetchdate = (input)=>{
  fetch("https://sourdualmemorypool.devvrat-singhsi.repl.co/?date="+ input)
  .then((res) => res.json())
  .then((res) => output.innerText =res["output"]);
}

  
button.addEventListener('click', () => {
  fetchdate(input.value);
});
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchdate(input.value);
  }
});
