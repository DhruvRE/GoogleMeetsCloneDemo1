let newMeetingBtn = document.querySelector(".my-meets-drop-button");
let hiddenBox = document.querySelector("#hiddenBox");
let JoinMeetingText = document.querySelector("#hideList");
let joiningLoader = document.querySelector("#joiningLoader");
let meetingRoom = document.querySelector("#meetingRoom")
let learnSection = document.querySelector(".learn-section")
let mainHidden = document.querySelector(".hidden");

let videoButton = document.querySelector("#videoButton")
let audioButton = document.querySelector("#audioButton")
let video = document.querySelector("#myVideoStream")
let videoStream = document.querySelector(".video-stream")
let avatarLogo = document.querySelector(".avatar-main")
let videoPlayer = document.querySelector("#streamVideo")

let roomCodeInput = document.querySelector("#roomCodeInput")
document.querySelector("#joinBtn").disabled = true
let audio = new Audio();

roomCodeInput.addEventListener("keydown", function(){
    let keyBvalue = roomCodeInput.value
    if (keyBvalue.value == ""){
        document.querySelector("#joinBtn").disabled = true
    } else {
        document.querySelector("#joinBtn").disabled = false
        document.querySelector("#joinBtn").style.color = "#1A6DDE"
        console.log(keyBvalue)
    }
})

document.querySelector("#joinBtn").addEventListener("click", function(){
    setTimeout(function(){
        joiningLoader.classList.remove("display-loading");
        learnSection.style.disply = "none"
        learnSection.style.display = "none"
    }, 500)

    setTimeout(function(){
        joiningLoader.classList.add("display-loading");
        hiddenBox.classList.toggle("box-hide");
        meetingRoom.classList.add("meeting-room-main");
        meetingRoom.style.display = "block"
        mainHidden.style.display = "none"
    }, 5000)
})

newMeetingBtn.addEventListener("click", function(){
    // console.log("clicked")
    hiddenBox.classList.toggle("box-hide");
})

JoinMeetingText.addEventListener("click", function(){
    setTimeout(function(){
        joiningLoader.classList.remove("display-loading");
        learnSection.style.disply = "none"
        learnSection.style.display = "none"
    }, 500)

    setTimeout(function(){
        joiningLoader.classList.add("display-loading");
        hiddenBox.classList.toggle("box-hide");
        meetingRoom.classList.add("meeting-room-main");
        meetingRoom.style.display = "block"
        mainHidden.style.display = "none"
    }, 5000)
})

// const hide = el => el.style.
// const show = el => el.style.setPtoperty("display", "block")
let camOn = document.querySelector(".cam-on")
let camOff = document.querySelector(".cam-off")
let audioOn = document.querySelector(".audio-on")
let audioOff = document.querySelector(".audio-off")
let interactionIconVideo = document.querySelector(".icon-interaction-video")
let interactionIconAudio = document.querySelector(".icon-interaction-audio")
let iconEnd = document.querySelector("#iconEnd")

let videoSteaming = false;
let videoStreams;
let audioStreaming = false;
let audioStream;

let videoConstraints = {
    video: true,
    audio: false
};
let audioConstraints = {
    audio: true,
    video: false
};

videoButton.addEventListener("click", function(){
    videoPlayer.classList.toggle("toggle-each")
    avatarLogo.classList.toggle("toggle-avatar")
    if (!videoSteaming){
        camOn.style.display="block"
        camOff.style.display="none"
        interactionIconVideo.style.backgroundColor = "#434649"
        interactionIconVideo.style.color = "#fff"
        navigator.mediaDevices.getUserMedia(videoConstraints).then(
        (stream) =>{
            videoStreams = stream
            video.srcObject = stream
            videoSteaming = true
        })
    } else {
        camOn.style.display= "none"
        camOff.style.display= "block"
        interactionIconVideo.style.backgroundColor = "#6D2E2A"
        interactionIconVideo.style.color = "rgb(95,99,104)"
        videoStreams.getTracks().forEach(track => track.stop())
        video.srcObject = null
        videoSteaming = false
    }
    
})

audioButton.addEventListener("click", function() {
    if (!audioStreaming) {
        audioOn.style.display="block"
        audioOff.style.display="none"   
        interactionIconAudio.style.backgroundColor = "#434649"
        interactionIconAudio.style.color = "#fff"
        navigator.mediaDevices.getUserMedia(audioConstraints).then(
            (stream) => {
                audioStream = stream
                audio.srcObject = stream
                audio.play()
                audioStreaming = true
            }
        )
    } else {
        audioOn.style.display="none"
        audioOff.style.display="block"
        interactionIconAudio.style.backgroundColor = "#6D2E2A"
        interactionIconAudio.style.color = "rgb(95,99,104)"
        audioStream.getTracks().forEach(track => track.stop())
        audio.srcObject = null
        audioStreaming = false
    }
});

let isLocked = false;

iconEnd.addEventListener("click", function() {
    if (isLocked === false) {
        isLocked = true;

        if (videoSteaming) {
            videoPlayer.classList.remove("toggle-each")
            avatarLogo.classList.remove("toggle-avatar")
            camOn.style.display = "none"
            camOff.style.display = "block"
            interactionIconVideo.style.backgroundColor = "#6D2E2A"
            interactionIconVideo.style.color = "rgb(95,99,104)"
            videoStreams.getTracks().forEach(track => track.stop())
            video.srcObject = null
            videoSteaming = false
        }
        if (audioStreaming) {
            audioOn.style.display = "none"
            audioOff.style.display = "block"
            interactionIconAudio.style.backgroundColor = "#6D2E2A"
            interactionIconAudio.style.color = "rgb(95,99,104)"
            audioStream.getTracks().forEach(track => track.stop())
            audio.srcObject = null
            audioStreaming = false
        }

        setTimeout(() => {
            meetingRoom.style.display = "none"
            mainHidden.style.display = "block"
            isLocked = false;
        }, 2000)
    }
});
