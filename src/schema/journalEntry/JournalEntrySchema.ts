import * as Yup from "yup";

const JournalEntrySchema = Yup.object().shape({
  date: Yup.string().required("This is a required field."),
note: Yup.string()
});

export default JournalEntrySchema;
