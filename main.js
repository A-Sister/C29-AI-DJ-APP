song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}


function setup() {
    canvas = createCanvas(500, 500);
    canvas.position(700,300);

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is Initialized!");
}


function gotPoses(results) {
    if(results.length > 0)  {
        console.log(results);
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score: "+ score_leftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("leftWrist X - "+leftWristX+" leftWrist Y - "+leftWristY+" rightWrist X - "+rightWristX+" rightWrist Y - "+rightWristY);
    }
}

function draw() {
    image(video, 0,0, 500, 500);

    fill("#990000");
    stroke("#990000");
    
    if(score_leftWrist>0.2) {
    circle(leftWristX, leftWristY, 20);
    number_leftY = Number(leftWristY);
    round_lefty = floor(number_leftY);
    volume = round_lefty/500;
    document.getElementById("volume").innerHTML = "Volume: "+volume;
    sound.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function pause() {
    song.pause();
}