const form = document.querySelector('form');
const result = document.querySelector('.container');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getWordinfo(e.target.children[0].value);
})

const getWordinfo = async (word) => {
  try{
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const data = await response.json();
  const definitions = data[0].meanings[0].definitions[0];

  result.innerHTML = `
  <h2><strong>${data[0].word.charAt(0).toUpperCase()+ data[0].word.slice(1)}</strong></h2>
  <p>${data[0].phonetic===undefined ? "" : data[0].phonetic }</p>
  <p>${data[0].meanings[0].partOfSpeech}</p>
  <p><strong>Meaning: </strong>${definitions.definition}</p>
  <p><strong>Example: </strong>"${definitions.example?definitions.example:"Sorry, no example available"}"</p>
  <p><strong>Synonym: </strong>${definitions.synonyms.length===0?"Unavailable":definitions.synonyms}</p>
  `;
  }catch(exception){
    result.innerHTML='<p>Sorry, your word could not be found</p>'
  }
}