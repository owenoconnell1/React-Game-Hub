const colors = ["red", "green", "blue", "yellow"];

export function SimonSaysPage() {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [message, setMessage] = useState("Watch the sequence!");
  const [currentStep, setCurrentStep] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
}