import BaseForm from "./BaseForm";
import essayImg from "../essayoutline.png";

const EssayOutline = () => {
  return (
    <BaseForm
      imgSrc={essayImg}
      alt="Essay Outline"
      header="Essay Outline Template"
      storageKey="essayOutlineResults"
      prompt="Create a generic and comprehensive outline for an essay about "
      formLabel="What topic is your essay about? (Example: personal statement, a favorite friction book, Covid-19 and its impact, Barack Obama and his presidency, etc.)"
      placeHolder="Enter your essay topic here"
      notice="Please enter your essay topic as specific as possible to get a more accurate outline template."
    />
  );
};

export default EssayOutline;
