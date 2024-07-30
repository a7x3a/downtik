import React, { useState, useEffect } from "react";
import { FaRegPaste } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";
import { GoLink } from "react-icons/go";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { LuFileAudio2 } from "react-icons/lu";
import axios from "axios";
import { waveform } from "ldrs";
waveform.register();

const Hero = () => {
  const [toastOne, setToastOne] = useState(false);
  const [toastTwo, setToastTwo] = useState(false);
  const [toastThree, setToastThree] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [link, setLink] = useState("");
  //Activating auto toats
  const activateToasts = () => {
    setTimeout(() => {
      setToastOne(true);
    }, 3000);
    setTimeout(() => {
      setToastTwo(true);
    }, 9000);
    setTimeout(() => {
      setToastThree(true);
    }, 14000);
    setTimeout(() => {
      setToastOne(false);
      setToastTwo(false);
      setToastThree(false);
    }, 20000);
  };
  //Fething Data From API
  const fetchVideoAnalysis = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors
    setResult(null); // Clear previous data
    const options = {
      method: "GET",
      url: "https://tiktok-download-without-watermark.p.rapidapi.com/analysis",
      params: {
        url: link,
        hd: "0",
      },
      headers: {
        "x-rapidapi-key": "b6e2feb64fmsh86c70a5d32cb038p1eb829jsna8f1562e25c0",
        "x-rapidapi-host": "tiktok-download-without-watermark.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      setResult(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  //Direct Downloads
  const downloadFile = async (url, filename) => {
    setLoading(true);
    try {
      // Make a GET request to fetch the file
      const response = await axios.get(url, {
        responseType: "blob", // Important to get binary data
      });

      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(response.data);

      // Create a link element and trigger a download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Clean up
      URL.revokeObjectURL(blobUrl); // Revoke the Blob URL
      document.body.removeChild(link); // Remove the link element
    } catch (error) {
      console.error("Error downloading file:", error);
    }
    setLoading(false);
  };
  //Handle Paste fromCLipboard
  const handlePasteClick = (e) => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setLink(text);
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err);
      });
  };
  //ON SM:activate auto Toast
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });

    if (screenSize < 768) {
      setToastOne(false);
      setToastTwo(false);
      setToastThree(false);
    } else if (screenSize > 768) {
      activateToasts(); //on Mobile
    }
    const handleKeyDown = (event) => {
      if (event.key == "p" || event.key == "P") {
        handlePasteClick();
      }
      if (result) {
        if (event.key == "d" || event.key == "D") {
          downloadFile(result.play, "video.mp4");
        } else if (event.key == "a" || event.key == "A") {
          downloadFile(result.music, "audio.mp3");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [screenSize]);

  return (
    <div className="z-[100] max-w-[800px] min-h-fit max-h-fit mt-5  font-poppins mx-auto px-5  rounded-3xl p-5 pb-0">
      <div className="mockup-browser border border-white font-mono">
        <div className="mockup-browser-toolbar flex justify-between ">
          <button
            onClick={handlePasteClick}
            className="btn btn-primary text-white"
          >
            <FaRegPaste />
          </button>
        </div>
        <div className="flex flex-col gap-4 p-5 justify-center min-h-fit bg-white bg-opacity-20">
          <form
            onSubmit={fetchVideoAnalysis}
            className="flex flex-col gap-3 justify-center"
          >
            <label
              htmlFor="link"
              className="w-full flex justify-between relative"
            >
              <input
                type="text"
                id="link"
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                value={link}
                required
                placeholder="paste the video link here"
                className="w-full rounded-lg px-4 py-3 pl-14 !bg-white placeholder:text-gray-600 outline-none placeholder:lowercase placeholder:font-sans placeholder:font-extralight caret-gray-700 text-gray-900 placeholder:tracking-widest"
              />
              <GoLink color="gray" className="absolute  top-4 left-5 " />
            </label>
            <button
              type="submit"
              className="btn btn-info text-white font-poppins tracking-widest font-extrabold bg-opacity-45"
            >
              {loading ? (
                <l-waveform
                  size="25"
                  stroke="3.5"
                  speed="1"
                  color="white"
                ></l-waveform>
              ) : (
                <FaCheckDouble size={30} />
              )}
            </button>
          </form>

          {result && (
            <div className="result p-3 flex flex-col gap-3">
              <video
                width="100%"
                controls
                autoPlay={false}
                className="rounded-md"
              >
                <source src={result.play} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={() => {
                  downloadFile(result.play, "video.mp4");
                }}
                className="btn btn-success text-white tracking-widest font-poppins"
              >
                Download Video <MdOutlineSlowMotionVideo size={25} />
              </button>
              <button
                onClick={() => {
                  downloadFile(result.mp3, "audio.mp3");
                }}
                className="btn btn-info text-white tracking-widest font-poppins"
              >
                Downlaod Audio <LuFileAudio2 size={25} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="toast toast-end">
        {toastOne && (
          <div className="alert bg-white bg-opacity-20  font-extralight text-white font-poppins text-sm">
            Press <kbd className="kbd kbd-sm bg-gray-200 text-black">P</kbd> to
            paste the video link.
          </div>
        )}
        {toastTwo && (
          <div className="alert bg-white bg-opacity-20  font-extralight text-white font-poppins text-sm">
            Press <kbd className="kbd kbd-sm bg-gray-200 text-black">D</kbd> to
            download the video.
          </div>
        )}
        {toastThree && (
          <div className="alert bg-white bg-opacity-20  font-extralight text-white font-poppins text-sm">
            Press <kbd className="kbd kbd-sm bg-gray-200 text-black">A</kbd> to
            download the sound.
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
