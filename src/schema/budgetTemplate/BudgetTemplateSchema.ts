import * as Yup from "yup";

const BudgetTemplateSchema = Yup.object().shape({
  BudgetTemplates: Yup.array().of(
    Yup.object().shape({
      category: Yup.string().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired()),
type: Yup.string(),
amount: Yup.string().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired()),
description: Yup.string().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired())
    })
  ),
});

export default BudgetTemplateSchema;
