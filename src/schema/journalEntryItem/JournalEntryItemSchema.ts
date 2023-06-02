import * as Yup from "yup";

const JournalEntryItemSchema = Yup.object().shape({
  JournalEntryItems: Yup.array().of(
    Yup.object().shape({
      journal_entry_id: Yup.number().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired()),
sub_account_title_id: Yup.number().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired()),
debit_amount: Yup.number().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired()),
credit_amount: Yup.number().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired())
    })
  ),
});

export default JournalEntryItemSchema;
