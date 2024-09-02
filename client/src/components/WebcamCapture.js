import React, { useRef, useEffect, useCallback, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
// import "./WebcamCapture.css";

const MODEL_URL = "/facialjs/models";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const loadModels = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
      console.log("All models loaded");
      setModelsLoaded(true);
    } catch (error) {
      console.error("Error loading models", error);
    }
  };

  const detect = useCallback(async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      modelsLoaded
    ) {
      const video = webcamRef.current.video;

      console.log("Video Dimensions: ", video.videoWidth, video.videoHeight);

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender();

        const canvas = canvasRef.current;
        const displaySize = {
          width: video.videoWidth,
          height: video.videoHeight,
        };

        faceapi.matchDimensions(canvas, displaySize);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canevas avant de dessiner

//         resizedDetections.forEach((detection) => {
//           const landmarks = detection.landmarks;
//           if (landmarks && landmarks.positions) {
//           const leftEar = landmarks.positions[0];
//           const rightEar = landmarks.positions[16];

//           if (leftEar && rightEar) {
//           // Dessiner des boucles d'oreilles virtuelles
//           const drawEarring = (x, y) => {
//             const img = new Image();
//             img.src = "/creole-or-rose.png"; // Chemin vers l'image de la boucle d'oreille
//             img.onload = () => {
//               ctx.drawImage(img, x - img.width / 2, y - img.height / 2);
//             };
//           };

//           drawEarring(leftEar.x, leftEar.y);
//           drawEarring(rightEar.x, rightEar.y);
//       } else {
//         console.error("Ear landmarks not found");
//       }
//     } else {
//       console.error("Landmarks not found");
//     }
//   });
//     } else {
//       console.error("Invalid video dimensions");
//     }
//   }
// }, [webcamRef, modelsLoaded]);

//   useEffect(() => {
//     loadModels();
//   }, []);

//   useEffect(() => {
//     if (modelsLoaded) {
//       const interval = setInterval(() => {
//         detect();
//       }, 100);
//       return () => clearInterval(interval);
//     }
//   }, [detect, modelsLoaded]);

//   return (
//     <div className="flex justify-center items-center w-screen h-screen bg-gray-200 overflow-hidden">
//       <div className="relative w-full max-w-lg aspect-[4/3] bg-light-purple ">
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           className="w-full h-full"
//         />
//         <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
//       </div>
//     </div>
//   );
// };

// export default WebcamCapture;
        resizedDetections.forEach((detection) => {
          const { x, y, width, height } = detection.detection.box;
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);

          const { age, gender, expressions } = detection;
          const drawText = (text, x, y) => {
            ctx.font = "16px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(text, x, y);
          };

          drawText(`Age: ${Math.round(age)}`, x, y - 20);
          drawText(`Gender: ${gender}`, x, y - 40);
          drawText(
            `Expressions: ${Object.keys(expressions)
              .map((e) => `${e}: ${Math.round(expressions[e] * 100) / 100}`)
              .join(", ")}`,
            x,
            y - 60
          );
        });
      } else {
        console.error("Invalid video dimensions");
      }
    }
  }, [webcamRef, modelsLoaded]);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      const interval = setInterval(() => {
        detect();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [detect, modelsLoaded]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-200 overflow-hidden">
      <div className="relative w-full max-w-lg aspect-[4/3] bg-black">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full"
        />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      </div>
    </div>
  );
};

export default WebcamCapture;