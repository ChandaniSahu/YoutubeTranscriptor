import { useEffect, useState } from "react";
import axios from "axios";
import { FaCopy, FaVolumeUp , FaVolumeMute } from "react-icons/fa";
import ResultChart from "./resultChart";


const Transcript = ()=> {
  const apikey = import.meta.env.VITE_API_KEY;
  const rapidapikey = import.meta.env.VITE_RAPIDAPI_KEY;
  const rapidhost = import.meta.env.VITE_RAPIDAPI_HOST;
  const [url, setUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [mcqs, setMcqs] = useState([]);
  const[gmail, setGmail] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState({ total: 0, correct: 0, wrong: 0, unattempted: 0 });
  const [loading, setLoading] = useState("");
  const [copied, setCopied] = useState(false);
const [speaking, setSpeaking] = useState("");
const [copyTarget, setCopyTarget] = useState("");
  const [showRlt, setShowRlt] = useState(false);
  const [checkParagraph, setCheckParagraph] = useState(false);

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: option });
  };



const fetchTranscript = async (inputText) => {
  console.log('entered');
  try {
    const text = inputText.trim();

    let videoId = null;
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = text.match(youtubeRegex);
    if (match && match[1] && match[1].length === 11) {
      videoId = match[1];
    }

    const isYouTubeLike = text.includes("youtube.com") || text.includes("youtu.be");

    if (videoId) {
      // ✅ Valid YouTube URL with valid video ID
      setLoading("transcript");

      const options = {
        method: 'GET',
        url: 'https://youtube-transcript3.p.rapidapi.com/api/transcript',
        params: { videoId },
        headers: {
          'X-RapidAPI-Key': rapidapikey,
          'X-RapidAPI-Host': rapidhost
        }
      };

      const response = await axios.request(options);
      const fullTranscript = response.data.transcript.map(t => t.text).join(' ');
      console.log('Transcript:', fullTranscript);
      setTranscript(fullTranscript);

    } else if (isYouTubeLike) {
      // ❌ It's a malformed YouTube URL (has youtube.com but no valid video ID)
      alert("❌ Invalid YouTube URL. Please enter a correct one.");
    } else {
      // Not a YouTube URL → check if it's a paragraph
      const wordCount = text.split(/\s+/).length;
      const containsWords = /[a-zA-Z]/.test(text);

      if (text && wordCount >= 1 && containsWords) {
        setCheckParagraph(true);
        console.log("Input is a valid paragraph.");
        setTranscript(text);
      } else {
        alert("❌ Invalid input. Please enter a valid YouTube URL or a proper paragraph.");
      }
    }
  } catch (err) {
    console.error("Error:", err.message);
    alert("Something went wrong.");
  } finally {
    setLoading("");
  }
};



  const SummersizeTranscript = async () => {
    setLoading("summary");
    const payload = {
      contents: [{ parts: [{
          text: `If the input is a paragraph, summarize it clearly.  
If the input is a topic, explain it in one paragraph.  
If the input is meaningless, random, or not understandable, respond only with: "failed".  
  
Input: ${transcript}`
        }] }]
    };
    try {
const response = await axios.post(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  payload,
  {
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apikey,
    },
  }
);


      const summary = response.data.candidates[0]?.content?.parts[0]?.text;
       
      if ( summary.includes('failed')) {
        alert("❌ Your given topic or paragraph is invalid");
        setSummary("");
        setUrl("");
        setTranscript("");
        return;
      }
      else{
        setSummary(summary);
        console.log('passed summary')
      }
      
    } catch (error) {
      console.error('Error in summarizing the transcript:', error);
      alert('❌ something went wrong')
    } finally {
      setLoading("");
    }
  };

const speakText = (text, source) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  setSpeaking(source);

  utterance.onend = () => setSpeaking("");
  utterance.onerror = () => setSpeaking("");

  synth.speak(utterance);
};

  const copyText = (text, target) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopyTarget(target);
    setTimeout(() => {
      setCopied(false);
      setCopyTarget("");
    }, 1000);
  };

  const GenerateMCQs = async () => {
    setLoading("mcqs");
    const content = `
Get me MCQ questions from this ${transcript} in the format below. 
The response must be a pure JSON array of objects that can be parsed directly using JSON.parse():
[
  {
    "question": "What is the capital of France?",
    "options": {
      "A": "Berlin",
      "B": "Madrid",
      "C": "Paris",
      "D": "Rome"
    },
    "answer": "C"
  }
]
`;
    const payload = { contents: [{ parts: [{ text: content }] }] };
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apikey}`,
        payload
      );
      const mcqs = response.data.candidates[0]?.content?.parts[0]?.text;

     if (mcqs.includes('"question"')) {
  console.log("✅ Success: Valid content received");
const stringJSON = mcqs.match(/\[.*\]/s)?.[0];
      const jsn = JSON.parse(stringJSON);
      setMcqs(jsn);
} else {
  alert('❌ your input is not valid')
  setUrl("");
        setTranscript("");
        setSummary("");
        setMcqs([]);
  console.log(" Failed: Empty or invalid content");
}
      

    } catch (error) {
      console.error('Error in generating MCQs:', error);
      alert('❌ something went wrong')
    } finally {
      setLoading("");
    }
  };

  const CalculateResult = () => {
    setLoading("result");
    setTimeout(() => {
      let correct = 0, wrong = 0, unattempted = 0;
      const total = mcqs.length;
      mcqs.forEach((item, index) => {
        if (!selectedAnswers[index]) unattempted++;
        else if (selectedAnswers[index] === item.answer) correct++;
        else wrong++;
      });
      setResult({ total, correct, wrong, unattempted });
      setShowRlt(true);
      setLoading("");
    }, 1000);
  };

 

  const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );


  const handleRefresh = () => {
    setTranscript("")
    setSummary("")
    setResult("")
    setMcqs([])
    setShowRlt(false);
    setUrl('')
    setSelectedAnswers({});
    setGmail('');
    setCheckParagraph(false);
  }

 
  const sendRlt = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(gmail)) {
  alert('Please enter a valid email address.');
    return;
  }


    setLoading('rltsending');

    const mcqHtml = mcqs.map((item, index) => {
  const isCorrect = selectedAnswers[index] === item.answer;
  const bgColor = !selectedAnswers[index]
    ? "#6B7280" // gray-500
    : isCorrect
    ? "#4ADE80" // green-400
    : "#F87171"; // red-400

  return `
    <div style="background-color: ${bgColor}; padding: 16px; color:white; border-radius: 12px; margin-bottom: 16px; border: 1px solid #ccc;">
      <h4 style="font-weight: bold;">${index + 1}. ${item.question}</h4>
      <p>✅ <strong>Correct Answer:</strong> ${item.answer}: ${item.options[item.answer]}</p>
      <p>📝 <strong>Your Answer:</strong> ${
        selectedAnswers[index]
          ? `${selectedAnswers[index]}: ${item.options[selectedAnswers[index]]}`
          : "Unattempted"
      }</p>
    </div>
  `;
}).join(""); // Join array into a single HTML string

// Add score section
const scoreHtml = `
  <div style="margin: 10px; background-color: #155dfc; padding: 20px; border-radius: 12px; color:white; margin-bottom:20px;">
    <h2 style="font-size: 20px; font-weight:700; text-align: center;">📊 Your Score</h2>
    <div style='font-weight: 600;'>
      <p style="font-size: 14px;">Total: ${result.total}</p>
      <p style="color: #86efac;">Correct: ${result.correct}</p>
      <p style="color: #fca5a5;">Wrong: ${result.wrong}</p>
      <p style="color: #fde68a;">Unattempted:${result.unattempted}</p>
    </div>
  </div>
`;

// Combine everything
const finalHtml = mcqHtml + scoreHtml;


  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color:#3f4695;padding:10px; border-radius: 12px;color:white; ">
      <h2 style=" font-size:24px; font-weight:900; text-align: center;">YouTube Transcriptor Result</h2><br>
      ${finalHtml}
    </div>
  `;

    try {
      const res = await axios.post('https://youtube-transcriptor-xavh.vercel.app/sendResult', { htmlContent: htmlContent, gmail: gmail })

      console.log('Response:', res.data);
      if (res.data.msg==='success') {
        alert('✅ Result sent successfully!');
        setGmail('');
      } else {
        alert('❌ Failed to send result.');
      }
    } catch (error) {
      alert('❌ Error sending email.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {console.log('url',url)},[url])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white flex flex-col items-center justify-start py-12 px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 max-w-5xl w-full shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
          🚀 YouTube Transcritor
        </h1>

        <div className="flex flex-col items-center gap-4 mb-8">
          <textarea
  value={url}
  onChange={(e) => {
    setUrl(e.target.value);
    setTranscript("");
    setSummary("");
    setMcqs([]);
    setShowRlt(false);
    setSelectedAnswers({});
  }}
  onInput={(e) => {
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = e.target.scrollHeight + "px"; // Set new height
  }}
  placeholder="Enter a 📺 YouTube URL , 📝 topic name , or 📄 paragraph..."
  disabled={transcript !== ""}
  className="inputField w-full h-[53px] max-w-[700px] px-6 py-3 rounded-2xl border-2 border-indigo-400 bg-white/20 focus:ring-4 focus:ring-indigo-500 focus:outline-none placeholder-white/70 text-white text-lg transition-all overflow-hidden"
/>
          {!transcript && (
            <button
              onClick={()=>fetchTranscript(url)}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading === "transcript" ? <Spinner /> : "Get Result"}
            </button>
          )}
        </div>

         {/* ✅ Transcript Section */}
        {transcript && !checkParagraph && (
          <div className="relative bg-white/10 border border-white/20 rounded-xl p-4 mb-6 max-h-60 overflow-y-auto whitespace-pre-wrap text-white text-opacity-90">
           <h2 className=" text-2xl font-bold mb-[8px] mt-[-5px] text-white text-center">📝 Transcript</h2>
            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={() => copyText(transcript, "transcript")} title="Copy">
                {copied && copyTarget === "transcript" ? "✔ copied" : <FaCopy className="text-white hover:text-yellow-400 transition" />}
              </button>
              {speaking === "transcript" ? (
  <FaVolumeMute
    title="Mute"
    onClick={() => {
      window.speechSynthesis.cancel();
      setSpeaking("");
    }}
    className="cursor-pointer text-white hover:text-red-400 transition"
  />
) : (
  <FaVolumeUp
    title="Speak"
    onClick={() => speakText(transcript, "transcript")}
    className="cursor-pointer text-white hover:text-green-400 transition"
  />
)}

            </div>
            {transcript}
          </div>
        )}

 {transcript && !summary && (
          <button
            onClick={SummersizeTranscript}
            disabled={loading}
            className="w-full mb-6 py-3 flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold shadow-md transform hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading === "summary" ? <Spinner /> : "Summarize"}
          </button>
        )}

        {/* ✅ Summary Section with Reused Copy/Speak */}
        {summary && (
          <div className="relative bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 text-yellow-800 p-4 rounded-2xl mb-8 shadow-md whitespace-pre-wrap">
            <h2 className="text-2xl font-bold mb-[8px] text-center text-black">🧾 Summary</h2>
            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={() => copyText(summary, "summary")} title="Copy">
                {copied && copyTarget === "summary" ? (
                  <span className="text-sm font-bold text-yellow-800">✔ Copied</span>
                ) : (
                  <FaCopy className="text-yellow-800 hover:text-yellow-600 transition" />
                )}
              </button>
              {speaking === "summary" ? (
  <FaVolumeMute
    title="Mute"
    onClick={() => {
      window.speechSynthesis.cancel();
      setSpeaking("");
    }}
    className="cursor-pointer text-yellow-800 hover:text-red-400 transition"
  />
) : (
  <FaVolumeUp
    title="Speak"
    onClick={() => speakText(summary, "summary")}
    className="cursor-pointer text-yellow-800 hover:text-green-600 transition"
  />
)}

            </div>
            {summary}
          </div>
        )}



       

        {transcript && mcqs.length === 0 && (
          <button
            onClick={GenerateMCQs}
            disabled={loading}
            className="w-full mb-6 py-3 flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white font-bold shadow-md transform hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading === "mcqs" ? <Spinner /> : "Generate MCQs"}
          </button>
        )}

        {mcqs.length > 0 && (
          <div className="space-y-8  shadow-[0_4px_60px_rgba(186,85,211,0.6)] bg-[transparent] rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-[10px] text-center text-white">📚 Multiple Choice Questions</h2>
            {mcqs.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <h4 className="text-xl font-bold mb-4">{index + 1}. {item.question}</h4>
                <div className="grid grid-cols-2 gap-4 answers">
                  {Object.entries(item.options).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-3 cursor-pointer">
                     <input
                     type="radio"
                     name={`question-${index}`}
                     value={key}
                     onChange={() => {
                     if (!showRlt) handleOptionChange(index, key);
                     }}
                     disabled={showRlt}
                     className={`scale-125 accent-pink-500 disabled:cursor-not-allowed`}
                    />

                      <span>{key}: {value}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {mcqs.length > 0 && !showRlt && (
          <button
            onClick={CalculateResult}
            disabled={loading}
            className="w-full mt-8 py-3 flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading === "result" ? <Spinner /> : "Submit Answers"}
          </button>
        )}

        {showRlt && (
          <div className="mt-[10px] rounded-2xl p-6 mb-8 shadow-[0_4px_60px_rgba(186,85,211,0.6)] " >
           {/* bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600  */}
           <h2 className="text-2xl font-extrabold mb-[10px] text-center text-white">🔍 Result</h2><br/>
              <div className="py-[15px]  m-[auto] w-full h-auto bg-blue-600 rounded-2xl  mb-[20px] shadow-lg">
             <h2 className="text-2xl font-bold text-center">📊 Your Score</h2>
             <div className="flex mt-[10px] justify-around items-center flex-wrap ">
              <div className="font-[600]"> <p className="text-lg ">Total: {result.total}</p>
              <p className="text-green-300 ">Correct: {result.correct}</p>
              <p className="text-red-300 ">Wrong: {result.wrong}</p>
              <p className="text-yellow-300 ">Unattempted: {result.unattempted}</p>
              </div>
              <ResultChart result={result} />
             </div>
             </div>
            

            <div className="space-y-6">
              {mcqs.map((item, index) => {
                const isCorrect = selectedAnswers[index] === item.answer;
                const bgColor = !selectedAnswers[index]
                  ? "bg-gray-500"
                  : isCorrect
                  ? "bg-green-400"
                  : "bg-red-400";

                return (
                  <div key={index} className={`rounded-xl p-4 ${bgColor} border border-white/10`}>
                    <h4 className="font-bold">{index + 1}. {item.question}</h4>
                    <p>✅ Correct Answer: {item.answer}: {item.options[item.answer]}</p>
                    <p>📝 Your Answer: {selectedAnswers[index] ? `${selectedAnswers[index]}: ${item.options[selectedAnswers[index]]}` : "Unattempted"}</p>

                  </div>
                );
              })}
            </div><br/>

            <div className="text-center">
               <button
             className="bg-blue-500 text-white py-2 px-5 rounded-xl hover:bg-blue-600 "
            onClick={handleRefresh}
          >
            Refresh
          </button>
            </div><br/>
           
           <div className="flex-wrap space-y-[10px] flex justify-center items-center space-x-[7px] mx-[auto]">

              <input type='email' placeholder='Enter your email' 
              onChange={(e) => { setGmail(e.target.value) }} value={gmail} 
              className='border-2 border-gray-300 bg-gray rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-[230px] h-10 ' />

                  <button
                    onClick={sendRlt}
                    className=" bg-blue-500 text-white p-[10px] rounded-xl 
                    hover:bg-blue-600" 
                            > {loading === "rltsending" ? <Spinner /> : "Send Result"}</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transcript;


