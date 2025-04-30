import { useState } from "react";
import axios from "axios";
import { FaCopy, FaVolumeUp } from "react-icons/fa";
import ResultChart from "./resultChart";


const Transcript = ()=> {
  const apikey = import.meta.env.VITE_API_KEY;
  const [url, setUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [mcqs, setMcqs] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState({ total: 0, correct: 0, wrong: 0, unattempted: 0 });
  const [loading, setLoading] = useState("");
  const [showRlt, setShowRlt] = useState(false);

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: option });
  };

  const fetchTranscript = async () => {
    setLoading("transcript");
    try {
      const res = await axios.post("http://localhost:3000/get-transcript", { url });
      setTranscript(res.data.transcript);
    } catch (err) {
      setTranscript("Error fetching transcript.");
    } finally {
      setLoading("");
    }
  };

  const SummersizeTranscript = async () => {
    setLoading("summary");
    const payload = {
      contents: [{ parts: [{ text: `Summarize the following paragraph:\n\n${transcript}` }] }]
    };
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apikey}`,
        payload
      );
      const summary = response.data.candidates[0]?.content?.parts[0]?.text;
      setSummary(summary);
    } catch (error) {
      console.error('Error in summarizing the transcript:', error);
    } finally {
      setLoading("");
    }
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };
  
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
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
      const stringJSON = mcqs.match(/\[.*\]/s)?.[0];
      const jsn = JSON.parse(stringJSON);
      setMcqs(jsn);
    } catch (error) {
      console.error('Error in generating MCQs:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white flex flex-col items-center justify-start py-12 px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 max-w-5xl w-full shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
          🚀 YouTube Transcritor
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setTranscript("");
              setSummary("");
              setMcqs([]);
              setShowRlt(false);
              setSelectedAnswers({});
            }}
            placeholder="Paste YouTube URL..."
            className="flex-1 px-6 py-3 rounded-2xl border-2 border-indigo-400 bg-white/20 focus:ring-4 focus:ring-indigo-500 focus:outline-none placeholder-white/70 text-white text-lg transition-all"
          />
          {!transcript && (
            <button
              onClick={fetchTranscript}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading === "transcript" ? <Spinner /> : "Get Transcript"}
            </button>
          )}
        </div>

       {/* 📝 Transcript Section */}
{transcript && (
  <>
    
    <div className="relative bg-white/10 border border-white/20 rounded-xl p-4 mb-6 max-h-60 overflow-y-auto whitespace-pre-wrap text-white text-opacity-90">
      <h2 className="text-2xl font-bold mb-[8px] text-white text-center">📝 Transcript</h2>
      <div className="absolute top-2 right-2 flex gap-2">
        <button onClick={() => copyText(transcript)} title="Copy">
          <FaCopy className="text-white hover:text-yellow-400 transition" />
        </button>
        <button onClick={() => speakText(transcript)} title="Speak">
          <FaVolumeUp className="text-white hover:text-green-400 transition" />
        </button>
      </div>
      {transcript}
    </div>
  </>
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

{summary && (
  <div className="relative bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 text-yellow-800 p-4 rounded-2xl mb-8 shadow-md whitespace-pre-wrap">
    <h2 className="text-2xl font-bold mb-[8px] text-center text-black">🧾 Summary</h2>
    <div className="absolute top-2 right-2 flex gap-2">
      <button onClick={() => copyText(summary)} title="Copy">
        <FaCopy className="text-yellow-800 hover:text-yellow-600 transition" />
      </button>
      <button onClick={() => speakText(summary)} title="Speak">
        <FaVolumeUp className="text-yellow-800 hover:text-green-600 transition" />
      </button>
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
                <h4 className="text-2xl font-bold mb-4">{index + 1}. {item.question}</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(item.options).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={key}
                        onChange={() => handleOptionChange(index, key)}
                        className="accent-pink-500 scale-125"
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
              <div className=" m-[auto] w-full h-[380px] bg-blue-600 rounded-2xl p-[5px]  mb-[20px] shadow-lg">
             <h2 className="text-2xl font-bold text-center">📊 Your Score</h2>
             <div className="flex justify-around items-center">
              <div > <p className="text-lg">Total: {result.total}</p>
              <p className="text-green-300">Correct: {result.correct}</p>
              <p className="text-red-300">Wrong: {result.wrong}</p>
              <p className="text-yellow-300">Unattempted: {result.unattempted}</p>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transcript;
