const video = document.getElementById('video')
var modal1 = document.getElementById("myModal1");
var emotion="";

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo())

function startVideo() {

  navigator.getUserMedia (
    { video:{} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}


video.addEventListener('play', () => {
  
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    
 
    if(resizedDetections[0].expressions.happy>=0.9)
    {
      document.getElementById("emotion").innerHTML="You Look Happy!! <br>  Let me suggest you a way to increase the happiness";
      reccomend="game";
      localStorage.setItem('reccomend',"game");
      modal1.style.display = "block";
      emotion = "Happy";
    }

    else if(resizedDetections[0].expressions.sad>=0.5)
    {
      document.getElementById("emotion").innerHTML="Why do you look sad ? <br>  Let me suggest you a way to stop feeling sad";
      reccomend="bot";
      localStorage.setItem('reccomend',"bot");
      modal1.style.display = "block";
      emotion = "Sad";

    }

    else if(resizedDetections[0].expressions.angry>=0.5)
    {
      document.getElementById("emotion").innerHTML="You Look Angry. What's wrong ?<br>  Let me suggest you a way to manage your anger";
      reccomend="music";
      localStorage.setItem('reccomend',"music");
      modal1.style.display = "block";
      emotion = "Angry";

    }

    else if(resizedDetections[0].expressions.fearful>=0.5)
    {
      document.getElementById("emotion").innerHTML="You Look Scared ! <br> Let me suggest you a way to stop feeling scared";
      reccomend="bot";
      localStorage.setItem('reccomend',"bot");
      modal1.style.display = "block";
      emotion = "Fearful";

    }

    else{
      document.getElementById("emotion").innerHTML="Looks Neutral ! <br> Let me suggest you a way to boost your energy";
      reccomend="game";
      localStorage.setItem('reccomend',"game");
      modal1.style.display = "block";
      emotion = "Neutral";

    }

    }, 0)
})


function saveData(){
  
  $.post("getMood.php",
    {
        emotion,
        
    },);
   window.location.href = "loading.html";
}
