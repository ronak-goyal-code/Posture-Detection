let capture;
let poseNet;
let singlePose,skeleton;

function setup(){
    createCanvas(800,600);
    capture = createCapture(VIDEO);
    capture.hide();

    poseNet = ml5.poseNet(capture,modelLoaded);
    poseNet.on('pose',recievedPoses);
}

function recievedPoses(poses){
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded(){
    console.log("model loaded");
}

function draw(){
    image(capture,0,0);
    fill(255,0,0);

    if(singlePose){
        for(let i=0; i<singlePose.keypoints.length; i++){
            let position = singlePose.keypoints[i].position;
            ellipse(position.x,position.y,20);
        }
        stroke(255,255,255);
        strokeWeight(5);
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
        }
    }
}