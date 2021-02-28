const video = document.getElementById('video')
var modal1 = document.getElementById("myModal1");
 var emotion = "";
 var emo = "";
Promise.all([

  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo())

function startVideo() {
  navigator.getUserMedia (
    { video: {} },
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
    /*faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)*/
    
 
    if(resizedDetections[0].expressions.happy>=0.9)
    {
      
      document.getElementById("emotion").src="happy.jpg";
      document.getElementById("emotion").width="90";
      document.getElementById("moodName").innerHTML = "HAPPY";
      emo="happy";
      localStorage.setItem('emo',"happy");
      modal1.style.display = "block";
      emotion = "Happy";

    }

    else if(resizedDetections[0].expressions.sad>=0.5)
    {
       
      document.getElementById("emotion").src="sad.jpg";
      document.getElementById("emotion").width="100";
      document.getElementById("moodName").innerHTML = "SAD";
      emo="sad";
      localStorage.setItem('emo',"sad");
      modal1.style.display = "block";
      emotion = "Sad";
    }

    else if(resizedDetections[0].expressions.angry>=0.5)
    {
        
      document.getElementById("emotion").src="angry.jpg";
      document.getElementById("emotion").width="100";
      document.getElementById("moodName").innerHTML = "ANGRY";
      emo="angry";
      localStorage.setItem('emo',"angry");
      modal1.style.display = "block";
      emotion = "Angry";

    }

    else if(resizedDetections[0].expressions.fearful>=0.5)
    {
      
      document.getElementById("emotion").src="fear.jpg";
      document.getElementById("emotion").width="100";
      document.getElementById("moodName").innerHTML = "FEARFUL";
      emo="fear";
      localStorage.setItem('emo',"fear");
      modal1.style.display = "block";
      emotion = "Fearful";

    }

    else{
     
      document.getElementById("emotion").src="neut.jpg";
      document.getElementById("emotion").width="100";
      document.getElementById("moodName").innerHTML = "NEUTRAL";
      emo="neutral";
      localStorage.setItem('emo',"neutral");
      modal1.style.display = "block";
      emotion = "Neutral";

    }   
    
    }, 0)
})

function setData(){
  $.post("getMood.php",
  {
     emotion,
  
  },);
  
   window.location.href = "index.html";
}