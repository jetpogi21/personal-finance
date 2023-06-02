import * as Yup from "yup";

const BudgetSchema = Yup.object().shape({
  budget_year: Yup.number().required("This is a required field."),
budget_month: Yup.number().required("This is a required field."),
BudgetItems: Yup.array().of(Yup.object().shape({category: Yup.string().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired()),
type: Yup.string().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired()),
amount: Yup.string().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired()),
description: Yup.string().when("touched", ([touched], schema) => touched ? schema.required("This is a required field.") : schema.notRequired())}))
});

export default BudgetSchema;
