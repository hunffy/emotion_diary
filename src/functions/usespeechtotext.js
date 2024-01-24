import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const useSpeechToText = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript(); // 음성 인식을 중지할 때 transcript를 초기화
    } else {
      SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
    }
  };

  return { transcript, listening, toggleListening, resetTranscript };
};

export default useSpeechToText;
