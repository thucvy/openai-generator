import BaseForm from "./BaseForm";
import letterImg from "../lettertemplate.png";

const LetterTemplate = () => {
  return (
    <BaseForm
      imgSrc={letterImg}
      alt="Letter Template"
      header="Formal Letter Template"
      storageKey="letterTemplateResults"
      prompt="Write a short, formal and professional letter template (no more than 70 words) about "
      formLabel="What kind of letter would you like to write today? (Example: looking for an interview opportunity, appreciation for a good opportunity, requesting a day off, etc.)"
      placeHolder="Enter your topic here"
      notice="Please enter your letter topic as specific as possible to get a more accurate letter template."
    />
  );
};

export default LetterTemplate;
