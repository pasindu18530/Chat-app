var md = window.markdownit();

function chatWithSaman() {
  let userInput = document.getElementById("txtUserInput").value;
  document.getElementById(
    "chatBox"
  ).innerHTML += `<li class="d-flex gap-4 justify-content-end">
                <h5>${userInput}</h5>
                </li>`;

  //fetch

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: userInput,
          },
        ],
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAQ77AFvu4dgBKmr9UWcdiJSlcQ5vIBfuU",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result.candidates[0].content.parts[0].text);
      document.getElementById("chatBox").innerHTML += `
    <li class="d-flex gap-4">
 
                <h5>${md.render(result.candidates[0].content.parts[0].text)}</h5>
              </li>`;
    })
    .catch((error) => console.error(error));
}
