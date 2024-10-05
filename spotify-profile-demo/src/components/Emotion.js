import { useEffect, useRef, useState } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState(null);

  // Access the camera when component mounts
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };
    startCamera();
  }, []);

  // Capture the photo when the button is clicked
  const handleSnap = async () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    // Convert the image to a Blob
    canvasRef.current.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob, "photo.png");

      // Send the image to the backend
      try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });
        const resultData = await response.json();
        setResult(resultData);
        console.log(resultData); // Log result to console immediately
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }, "image/png");
  };

  // Log the result every 30 seconds
  useEffect(() => {
    if (result) {
      const intervalId = setInterval(() => {
        console.log(result);
      }, 30000);

      return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }
  }, [result]);

  return (
    <div>
      <h1>Camera Capture</h1>
      <video ref={videoRef} autoPlay width="400" height="300"></video>
      <canvas
        ref={canvasRef}
        width="400"
        height="300"
        style={{ display: "none" }}
      ></canvas>
      <br />
      <button onClick={handleSnap}>Capture Photo</button>
      <div id="result">
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </div>
  );
};

export default CameraCapture;
