const MyButton = ({ text, type, onClick }) => {
  //button 생성 시 type이 positive, negative 외에 이상한 type이 전달되었을때 모두 default로 전달.
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    //className은 배열로 전달할수없기때문에 join을통해 합쳐서 문자열로 전달. props로 전달받은 type에따라 className 변경
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
