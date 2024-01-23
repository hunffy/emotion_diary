import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechToText = () => {
  const { textResult, listening } = useSpeechRecognition();
  const toggleListening = () => {
    if (listening === true) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
    }
  };
  return { textResult, listening, toggleListening };
};

export default SpeechToText;
