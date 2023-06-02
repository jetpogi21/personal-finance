import * as Yup from "yup";

const SubAccountTitleSchema = Yup.object().shape({
  SubAccountTitles: Yup.array().of(
    Yup.object().shape({
      sub_account_title: Yup.string().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired()),
account_title_id: Yup.number().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired())
    })
  ),
});

export default SubAccountTitleSchema;
