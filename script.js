console.log("hello")
document.querySelector('.cb').addEventListener('change', function(event) {
    if (event.target.checked) {
      document.body.style.background = 'radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)';
      console.log("hello")
    } else {
        document.body.style.background = 'radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(246, 251, 255) 24.5%, rgb(246, 251, 255) 66%)';
    }
});
document.getElementById('submit-button').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the form from submitting normally
  
    // Get the input value
    var inputValue = document.getElementById('input-field').value;
  
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
  
    // Configure it: POST-request for the URL /post
    xhr.open('POST', 'https://api.chatanywhere.com.cn/v1/chat/completions', true);
  
    xhr.setRequestHeader('Authorization', 'Bearer sk-pu4PasDkEf284PIbVr1r5jn9rlvbAJESZGpPbK7OFYYR6m9g');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    // Send the request over the network
    xhr.send(JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                role: 'user',
                content: inputValue
            }
        ]
    }));
  
    xhr.onload = function() {
        if (xhr.status != 200) { 
          alert(`Error ${xhr.status}: ${xhr.statusText}`); 
        } else { 
          var response = JSON.parse(xhr.response);
          document.getElementById('output').textContent = response.choices[0].message.content;
      
          // Creating a new XMLHttpRequest object for the text-to-speech API
          var xhr2 = new XMLHttpRequest();
          var url = 'https://api.elevenlabs.io/v1/text-to-speech/CYw3kZ02Hs0563khs1Fj';
          xhr2.open('POST', url, true);
      
          xhr2.responseType = 'blob'; // Setting the responseType to 'blob'
      
          xhr2.setRequestHeader('accept', 'audio/mpeg');
          xhr2.setRequestHeader('xi-api-key', '08a134b000ccc8017863efc0160ff934');
          xhr2.setRequestHeader('Content-Type', 'application/json');
      
          var data = JSON.stringify({
              "text": response.choices[0].message.content,
              "model_id": "eleven_multilingual_v2",
              "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.5
              }
          });
      
          xhr2.send(data);
      
          // This will be called after the response is received
          xhr2.onload = function() {
            if (xhr2.status != 200) {
              alert(`Error ${xhr2.status}: ${xhr2.statusText}`); 
            } else { 
              var blob = new Blob([xhr2.response], {type: 'audio/mpeg'}); // Creating a blob from the response
              var url = URL.createObjectURL(blob); // Creating a blob URL
              var audio = new Audio(url); // Using the blob URL to create the Audio object
              audio.play();
            }
          };
      
          xhr2.onerror = function() {
            alert("Request failed");
          };
        }
    };
      
    xhr.onerror = function() {
      alert("Request failed");
    };
});
