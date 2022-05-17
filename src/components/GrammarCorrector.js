import BaseForm from "./BaseForm";
import grammarImg from "../grammarcheck.png";

const GrammarCorrector = () => {
  return (
    <BaseForm
      imgSrc={grammarImg}
      alt="Grammar Corrector"
      header="Grammar Corrector"
      storageKey="grammarCorrectorResults"
      prompt="Correct this to standard English: \n"
      formLabel="Please provide your text below for further correction to standard English."
      placeHolder="Enter your text here"
      notice="Please enter your full sentences with no more than 80 words."
    />
  );
};

export default GrammarCorrector;
